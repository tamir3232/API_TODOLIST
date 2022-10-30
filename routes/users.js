const router = require('express').Router()
const { register, login, get, del, update } = require('../controller/users')

router.get('/', get)
router.post('/register', register)
router.post('/login', login)
router.delete('/:id', del)
router.patch('/:id', update)



module.exports = router