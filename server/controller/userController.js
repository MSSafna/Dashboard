const userModals = require('../models/Users')
const bcrypt = require('bcrypt')

module.exports={
    registerUser : async(req, res) =>{
        
        try{
            const {username,password,email} = req.body
            const user=await userModals.findOne({$or:[{username},{ email }]}) 
            if(user){   
                if(user.username == username){
                    res.json({name : true})
                }else{
                    res.json({email:true})
               }
            }
            else{
                 const hashedPassword = await bcrypt.hash(password, 10)
                 const newUser  = new userModals({
                    username,
                    password :hashedPassword,
                    email
                 })

                 console.log(newUser,'bdug');
                 const user= await newUser.save()
                 res.status(200).json({user:true})
            }
        }catch(err){
            res.send(err)
        }
        
    },

    login: async(req, res) =>{
        const {email, password} = req.body;
        const user = await userModals.findOne({email});
        if(!user){
            res.json({error : ' invalid email'})
        }else{
        const validPassword = await bcrypt.compare(password,user.password)
        if(!validPassword){
            res.json({error : 'inavlid password'})
        }else{
            res.json({user:true})
        }
        }

    }
}