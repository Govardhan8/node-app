import express from 'express'
import { addUser, userExists, hashPassword } from '../utils.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.route('/').get((request, response) => {
	response.send({
		message: 'Users api up & running',
	})
})

router.post('/signup', async (request, response) => {
	const body = request.body
	const name = request.body.username
	const user = await userExists(name)
	if (body.password.length < 8) {
		response.status(400).send({
			message: 'Password is should be 8 characters or more!',
		})
	} else if (
		!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#!$%^&*]).{8,}/g.test(
			body.password
		)
	) {
		response.status(400).send({
			message: 'Password does not match the pattern!',
		})
	} else if (!user[0]) {
		body.password = await hashPassword(body.password)
		const result = await addUser(body)
		response.send({
			message: 'User added successfully!',
		})
	} else {
		response.status(400).send({
			message: 'Username already exists',
		})
	}
})

router.post('/login', async (request, response) => {
	const { username, password } = request.body
	const token = jwt.sign({ id: request.body._id }, process.env.SECRET_KEY)
	const user = await userExists(username)

	if (user[0]) {
		const passwordMatch = await bcrypt.compare(password, user[0].password)
		if (passwordMatch) {
			response.send({
				message: 'Successful Login',
				token: token,
			})
		} else {
			response.status(401).send({
				message: 'Invalid credentials',
			})
		}
	} else {
		response.status(401).send({
			message: 'Invalid credentials',
		})
	}
})

router.route('/exists').get(auth, (request, response) => {
	response.send('Yes you can!')
})
export default router
