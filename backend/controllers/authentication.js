const router = require('express').Router()
const db = require("../models")
const jwt=require('jwt')
const bcrypt=require('bcrypt')
  


router.post('/', async (req, res) => {
    
    let user = await user.findOne({
        where: { email: req.body.email }
    })

    if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
        res.status(404).json({ 
            message: `Could not find a user with the provided username and password` 
        })
    } else {
        const result=await jwt.encode(process.env.JWT_SECRET,{id:user.userId})

        res.json({user:user,token:result.value })                                       
    }
})

router.get('/profile', async (req, res) => {
    try {
        const [authenticationMethods,token]=req.headers.authorization.split('');
        if(authenticationMethods==='Bearer'){
            const result=await jwt.decode(process.env.JWT_SECRET,token);
            const {id}=result.value
        }
        let user = await User.findOne({
            where: {
                userId:id                      
            }
        })
        res.json(user)
    
    } catch {
        res.json(null)
    }
})


