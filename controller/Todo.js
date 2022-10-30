
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { default: jwtDecode } = require('jwt-decode')
const { Authorization } = require('../prisma/middlewares/authorization.middleware')

const getTodo = async (req, res, next) => {
    try {
        console.log(req.id)
        const findAll = await prisma.Todo.findMany({
            where: {
                userId: req.id
            }
        })

        if (findAll == null) {
            throw {
                code: 400,
                message: 'tidak ada TodoList yang tersedia'
            }
        }

        return res.status(200).json({
            code: 200,
            message: 'Your activity',
            data: findAll
        })

    } catch (error) {
        next(error)

    }
}

const AddTodo = async (req, res, next) => {
    try {

        const bodies = req.body
        // const Todo = await prisma.todo.findMany()
        // // return res.status(200).json({
        // //     code: 200,
        // //     message: 'SEMUA AKUN YANG TELAH TERDAFTAR : ',
        // //     data: Todo
        // // })
        const createTodo = await prisma.todo.create({
            data: {
                description: bodies.description,
                userId: req.id
            },
        })


        return res.status(200).json({
            code: 200,
            message: "kegiatan berhasil di buat"
        })
    } catch (error) {
        next(error)
    }
}
const updateTodo = async (req, res, next) => {
    try {
        const bodies = req.body

        const updateTodo = await prisma.todo.updateMany({
            where: {
                userId: req.id,
                id: Number(bodies.id),

            },
            data: {
                description: bodies.description
            }
        })
        return res.status(200).json({
            code: 200,
            message: "Activity sudah di update"
        })

    } catch (error) {
        next(error)
    }
}

const deleteTodo = async (req, res, next) => {
    try {
        const bodies = req.body
        const deleteActivity = await prisma.todo.deleteMany({
            where: {

                userId: req.id,
                id: Number(bodies.id),


            }
        })
        return res.status(200).json({
            code: 200,
            message: "Activity sudah di Delete"
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { getTodo, AddTodo, updateTodo, deleteTodo }