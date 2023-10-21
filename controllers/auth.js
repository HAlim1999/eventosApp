const Usuario = require('../models/Usuario.js')
const bcrypt = require('bcryptjs')
const {generarJWT} = require('../helpers/jwt.js')


const createUsuario = async (req, res) => {
    const {email, password} = req.body;

    try{
        let usuario = await Usuario.findOne({email})

        console.log(usuario)
        if(usuario) {
           return  res.status(400).json({
                ok:false,
                msg: 'Usuario ya existe'
            })
        } 

        usuario = new Usuario(req.body)
        const salt = bcrypt.genSaltSync()

        usuario.password = bcrypt.hashSync(password, salt)

        await usuario.save();
        const token = await generarJWT(usuario._id, usuario.name)
    
    
        res.status(200).json({
            ok:true,
            uid: usuario._id,
            email: usuario.email,
            token
        })
    }catch(error){
        res.status(500).json({
            ok:false,
            msg:'Comuniquese con el Administrador'
        })
    }

}

const loginUsuario = async(req, res) => {
    const {email, password} = req.body;

    try{

        const usuario = await Usuario.findOne({email})

        if(!usuario) {
           return  res.status(400).json({
                ok:false,
                msg: 'Usuario ya no existe'
            })
        } 

        const validPassword = bcrypt.compareSync(password, usuario.password)
        if(!validPassword) {
            return  res.status(400).json({
                ok:false,
                msg: 'Credenciales invalidas'
            })
        }

        const token = await generarJWT(usuario.id, usuario.name)


        res.status(200).json({
            ok:true,
            uid: usuario._id,
            email: usuario.email,
            token
        })
    }
    catch(error){
        res.status(500).json({
            ok:false,
            msg:'Comuniquese con el Administrador'
        })
    }
}



const revalidarToken = async (req, res) => {

    const uid = req.uid;
    const name = req.name;

    const token = await generarJWT(uid, name)



    res.json({
        ok: true,
        msg:'renew',
        uid,
        name,
        token
    })
}


module.exports = {
    createUsuario,
    loginUsuario,
    revalidarToken
}