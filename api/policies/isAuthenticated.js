const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    // let token;
    // if (req.headers && req.headers.token) {
    //   token = req.headers.token;
    //   if (token.length <= 0) return res.json(401, {err: 'Format is Authorization: Bearer [token]'});
  
    // } else if (req.param('token')) {
    //   token = req.param('token');
    //   delete req.query.token;
    // } else {
    //   return res.json(401, {err: 'No Authorization header was found'});
    // }
  
    // jwToken.verify(token, function (err, token) {
    //   if (err) return res.json(401, {err: 'Invalid Token!'});
    //   req.token = token; // This is the decrypted token or the payload you provided
    //   next();
    // });

    // jwt.verify(
    //     token, 
    //     tokenSecret, 
    //     {},
    //     callback 
    // );
    // console.log("=========================================================")
    // console.log("=========> request headers",req.headers);
    const bearerHeader = req.headers.authorization
    // console.log("=========> bearee",bearerHeader);
    if(bearerHeader !== undefined){
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        // req.token = token;
        // next()
        jwt.verify(token,'secret',(err,authData)=>{
         if(err){
             return res.status(401).json({success:false,msg:"something went wrong!"});
         }else{
            //  console.log(authData)
             req.id = authData.user.id;
            // console.log(req.id)
            //  res.status(200).json({success:true,msg:"Token is verified!",data:authData});
            // res.data = authData
            next()
         }
     })
    }else{       
        return res.status(401).json({sucess:false,msg:'Token is not pristine'})
    }

    // jwt.verify(req.token,'secret',(err,authData)=>{
    //     if(err){
    //         res.status(401).json({success:false,err:"something went wrong!"});
    //     }else{
    //         console.log(authData)
    //         // req.id = authData.user._id;
    //         // res.status(200).json({success:true,msg:"Token is verified!",data:authData});
    //         next()
    //     }
    // })


  };