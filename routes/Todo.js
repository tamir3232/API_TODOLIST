const router = require('express').Router()
const { getTodo, AddTodo, updateTodo, deleteTodo } = require('../controller/Todo')
const { Authorization } = require('../prisma/middlewares/authorization.middleware')

router.get('/', Authorization, getTodo)
router.post('/add', Authorization, AddTodo)
router.patch('/update', Authorization, updateTodo)
router.delete('/del', Authorization, deleteTodo)
// router.post('/login', login)
// router.delete('/:id', del)
// router.patch('/:id', update)



module.exports = router