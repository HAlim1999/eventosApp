const Evento = require('../models/Evento.js')

const getEventos = async (req, res) => {

    try{
        const eventos = await Evento.find().populate('user', 'name')
        res.json({
            ok:true,
            msg:'getEventos',
            eventos
        })

    }catch(error){
        console.log(error)
        res.statos(500).json({
            ok:false,
            msg:'Hable con el Admin'
        })
    }

}

//----------------------------------------------------------------
const crearEvento = async (req, res) => {
    const uid = req.uid;
    const evento = new Evento(req.body)
    evento.user = uid

    try{
        
        await evento.save()
        res.json({
            ok:true,
            msg:'crearEvento',
            evento
        })   

    }catch(error){
        console.log(error)
        res.statos(500).json({
            ok:false,
            msg:'Hable con el Admin'
        })
    }
}


//----------------------------------------------------------------


const actualizarEvento = async (req, res) => {
    const id = req.params.id

    try{
        const uid =req.uid;

        const evento = await Evento.findById(id)
        if(!evento){
            return res.status(404).json({
                ok:false,
                msg:"Evento not found"
            })
        }
        if(evento.user.toString() !== uid){
            return res.status(404).json({
                ok:false,
                msg:"User no utorizado"
            })
        }
        const newEvento ={
            ...req.body,
            user: uid
        }
    
        const eventoActualizado = await Evento.findByIdAndUpdate(id, newEvento, {new:true})
        //el tercer argumento de new:true es para que retorne el nuevo elemento actualizado


        res.json({
            ok:true,
            msg:'crearEvento',
            eventoActualizado
        })



    }catch(error){
        console.log(error)
        res.statos(500).json({
            ok:false,
            msg:'Hable con el Admin'
        })
        
    }
}


//----------------------------------------------------------------
const eliminarEvento = async (req, res) => {
    const id = req.params.id

    try{
        const uid =req.uid;
        const evento = await Evento.findById(id)

        if(!evento){
            return res.status(404).json({
                ok:false,
                msg:"Evento not found"
            })
        }
        if(evento.user.toString() !== uid){
            return res.status(404).json({
                ok:false,
                msg:"User no utorizado"
            })
        }
    
        await Evento.findByIdAndDelete(id)

        res.json({
            ok:true,
            msg:'EventoEliminado'
        })



    }catch(error){
        console.log(error)
        res.statos(500).json({
            ok:false,
            msg:'Hable con el Admin'
        })
        
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}