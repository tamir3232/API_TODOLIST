const { PrismaClient } = require('@prisma/client')
const express = require('express')
const prisma = new PrismaClient()
const cors = require('cors')
const app = express()
const userRouter = require('./routes/users.js')
const TodoRouter = require('./routes/Todo.js')
const port = 9090


app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', async (req, res) => {
    res.send({
        message: prisma.user.findMany()
    })
})

app.use('/auth', userRouter)
app.use('/Todo', TodoRouter)


app.use((err, req, res, next) => {
    return res.status(err.code || 500).json({
        message: err.message || 'internal server eror'
    })
})
app.listen(port, () => {
    console.log(`SERVER RUNING ATT PORT ${port}`)
})