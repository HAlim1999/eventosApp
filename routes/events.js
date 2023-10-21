const {Router} = require('express');
const router = Router();
const {getEventos, crearEvento, actualizarEvento,eliminarEvento } = require('../controllers/events.js')
const {validarJWT} = require('../middlewares/validar-jwt.js')
const {validarCampos} = require('../middlewares/validar-campos.js')
const {check} = require('express-validator')
const {isDate} = require('../helpers/isDate.js')

router.use(validarJWT) //se aplica el middleware en todas las rutas

router.get('/', getEventos)
router.post('/',[
    check('title', 'titulo obligatorio').not().isEmpty(),
    check('start', 'fecha inicio obligatoria').custom(isDate),
    check('end', 'fecha fin obligatoria').custom(isDate),
    validarCampos


], crearEvento)
router.put('/:id', actualizarEvento)
router.delete('/:id', eliminarEvento)


module.exports = router