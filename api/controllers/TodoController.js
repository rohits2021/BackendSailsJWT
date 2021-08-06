

module.exports = { 
    create : async (req,res)=>{
        const title    = req.body.title;
        const finishDate = req.body.finishDate;
        const userId =  req.body.userId;     
        let sameTitle = await Todo.find({title});
        let sameUser = await Todo.find({userId});
        if(sameTitle.length != 0 && sameUser.length != 0){
            return res.status(403).json({message:"Todo Title or User already exists,cannot be created again"})
        } else {
                Todo.create({title,finishDate,userId})
                    .then(()=>{
                        res.status(200).json({success:true,msg:`Successfully Cretaed`})                
                    })
                    .catch((err)=>{
                        res.status(500).send(`Something went wrong:${err}`);
                    })
        }
    },
    userTodo: async (req,res)=>{
        let userId = req.param('userId');
        let todo = await Todo.find({userId});
        res.status(200).json({todo});
    },
    updateTodo: async (req,res)=>{
        let todoId = req.param('todoId');
        let title  = req.body.title;
        console.log(todoId,title);
        let finishDate = req.body.finishDate;
        await Todo.update({id:todoId},{title:title,finishDate:finishDate});
        res.status(200).json({success:true,msg:'Successfully Updated!'});
    },
    deleteTodo: async (req,res)=>{
        let todoId = req.param('todoId');
        await Todo.destroy(todoId);
        res.status(200).json({success:true,msg:'Successfully Deleted!'});
    }
};

