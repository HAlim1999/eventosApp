const jwt = require('jsonwebtoken')
require('dotenv').config();


const generarJWT = (uid, name) =>{

    return new Promise((resolve, reject) =>{
        const payload = {uid, name}

        jwt.sign(payload, process.env.SECRET_JWT_SEED,{
            expiresIn:'2h'
        },(err, token)=>{
            if(err){
                console.log(err)
                reject('el token no se genero')
            }

            resolve(token)
        })
    }
    )



}


module.exports = {
    generarJWT
}