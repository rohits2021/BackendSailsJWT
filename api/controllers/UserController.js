const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');

module.exports = {
  
    
    register : async (req,res) => {
        const email    = req.body.email;
        // const name     = req.body.name;
        // const number   = req.body.number;
        const password = req.body.password;
        let   salt;
        let   hashedPassword;
        let alreadyExists = await User.find({email});
        if(alreadyExists.length != 0){
            return res.status(403).json({message:"User already exists,cannot be created again"})
        } else {
            bcrypt.genSalt(12, function(err, salt) {
                salt = salt;
                bcrypt.hash(password, salt, function(err, hashedPassword) {
                hashedPassword = hashedPassword; 
                User.create({email,salt,hashedPassword})
                    .then(()=>{
                    res.status(200).json({success:true,msg:`Successfully Cretaed`})                
                    })
                    .catch((err)=>{
                    res.serverError(`Something went wrong:${err}`);
                    })
                });
            })         
        }
    },
    login : async (req,res) => {
        const email    = req.body.email;
        const password = req.body.password;
        User.findOne({ email: email })
            .then((user) => {
                if (!user) {
                    return res.status(400).json({success:false,msg:"Email is registered!"});
                } else {
                    bcrypt.compare(password, user.hashedPassword, function(err, result) {
                        if (result) {                        
                            jwt.sign({user},'secret',{expiresIn:'180s'},(err,token)=>{
                                // req.headers.authorization = `Bearer ${token}`
                                res.status(200).json({token:token});
                            })
                        }else{
                            res.status(400).json({success:false,msg:"you have entered a wrong password"});
                        }
                    });
                };               
            })
            .catch((err) => {
                sails.log.error(err);
                return res.serverError();
            });    
    },
    // getHome : async (req,res)=>{
    //     let userdata = res.data
    //     res.render('home',userdata)
    // },
    getAllUser: async (req, res) => { 
        const id = req.id;
        console.log(id); 
        let user = await User.findOne({id:id});
        res.status(200).json({user});          
    }, 
    // userCreatesTodo: async(req,res)=>{
        // const userId = req.params.userId;
        // const anyvariable   = req.body.anyvariable;

        // console.log(userId,anyvariable);

        // const userId = req.params.userId;        
        // const todo     = new Todo({title:req.body.title}); 
        // console.log(todo);       
        // const user    = await User.findById(userId);    
        // console.log(user);
        // todo.user = user;
        // await todo.save();
        // user.todos.push(todo); 
        // await user.save();
        // res.status(200).json(user);
        
    // },

    // const email = req.body.email;
    //         const password = req.body.password;
    //         //check if user exists with same email
    //         const isAlreadyExists = await Users.findOne({email});
    //         if(isAlreadyExists){
    //             //403 Forbidden
    //             return res.status(403).json({message:"User already exists,cannot be created again"})
    //         }else{
    //             //create a user
    //             const saltHash = hashsed.genPassword(password);
    //             const salt =  saltHash.salt;
    //             const hash =  saltHash.hash;
    //             const newUser = new Users({email,salt,hash});
    //             await newUser.save();
    //             return res.status(200).json({success:true,msg:'User created Successfully'})
    //         }

    // const bearerHeader = req.headers['authorization']
    // if(typeof bearerHeader !== undefined){
    //     const bearer = bearerHeader.split(' ');
    //     const token = bearer[1];
    //     req.token = token
    //     // next()
    //     jwt.verify(req.token,JWT_SECRET.jwtSecret,(err,authData)=>{
    //      if(err){
    //          res.status(401).json({success:false,msg:"something went wrong!"});
    //      }else{
    //          console.log(authData)
    //          // req.id = authData.user._id;
    //          // res.status(200).json({success:true,msg:"Token is verified!",data:authData});
    //          next()
    //      }
    //  })
    // }else{
    //     res.status(401).json({sucess:false,msg:'Token is not pristine'})
    // }
};

