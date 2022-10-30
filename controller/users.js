
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res, next) => {
    try {

        const bodies = req.body
        const isUserExist = await prisma.user.findUnique({
            where: {
                email: bodies.email
            },
        })

        if (isUserExist) {

            throw {

                code: 400,
                message: 'Email Yang Di masukan sudah terpakai',


            }
        }
        const hassedpassword = bcrypt.hashSync(bodies.password, 12)

        const user = await prisma.user.create({
            data: {
                name: bodies.name,
                email: bodies.email,
                password: hassedpassword
            },

        })
        return res.status(200).json({
            code: 200,
            message: 'akun anda telah dibuat',

        })


    } catch (error) {
        next(error)


    }
}

const login = async (req, res, next) => {
    try {
        console.log(req.id)
        const bodies = req.body
        const isUserExist = await prisma.user.findUnique({
            where: {
                email: bodies.email
            },
        })

        if (!isUserExist) {
            throw {
                code: 400,
                message: 'AKUN TIDAK TERSEDIA'
            }
        }
        const passcompare = await bcrypt.compare(bodies.password, isUserExist.password)
        if (!passcompare) {
            throw {
                code: 404,
                message: 'PASSWORD SALAH'
            }
        }
        const token = jwt.sign({ id: isUserExist.id }, "tamir", {
            expiresIn: '120m',
        })
        // res.header(token).json({
        //     token: token
        // })

        return res.status(200).json({
            code: 200,
            message: 'anda berhasil login',
            data: token
        })



    } catch (error) {
        next(error)
    }
}

const get = async (req, res, next) => {
    try {

        const users = await prisma.user.findMany()

        if (users < 0) {
            throw {
                code: 400,
                message: 'anda tidak mempunyai akun'
            }
        }
        return res.status(200).json({
            code: 200,
            message: 'SEMUA AKUN YANG TELAH TERDAFTAR : ',
            data: users
        })

    } catch (error) {
        next(error)
    }
}

const del = async (req, res, next) => {
    try {
        const id = req.params.id


        const dell = await prisma.user.delete({
            where: {
                id: Number(id)
            },
        })

        return res.status(200).json({
            code: 200,
            message: 'Akun Berhasil Di delete'
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {

    try {
        const id = req.params.id
        const bodies = req.body

        const hassedpassword = bcrypt.hashSync(bodies.password, 12)
        const isUserExist = await prisma.user.findUnique({
            where: {
                email: bodies.email
            },
        })
        if (isUserExist) {
            throw {
                code: 400,
                message: 'Email sudah di pakai '
            }
        }



        const update = await prisma.user.update({
            where: {
                id: Number(id)
            },


            data: {
                name: bodies.name,
                email: bodies.email,
                password: hassedpassword
            }

        })

        return res.status(200).json({
            code: 200,
            message: 'Akun Berhasil Di Update'
        })
    } catch (error) {
        next(error)
    }

}

module.exports = { register, login, get, del, update }