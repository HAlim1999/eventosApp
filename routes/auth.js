const {Router} = require('express');
const {check} = require('express-validator')
const router = Router();
const {createUsuario, loginUsuario, revalidarToken} = require('../controllers/auth.js')
const {validarCampos} = require('../middlewares/validar-campos.js')
const {validarJWT} = require('../middlewares/validar-jwt.js')


router.post('/new',
[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','El email no es valido').isEmail(),
    check('password','El password debe de ser de 6 caracteres').isLength({min:6}),
    validarCampos

]
, createUsuario)

router.post('/',
[
    check('email','El email no es valido').isEmail(),
    check('password','El password debe de ser de 6 caracteres').isLength({min:6}),
    validarCampos

]
, loginUsuario)
router.get('/renew',validarJWT, revalidarToken)



module.exports = router;