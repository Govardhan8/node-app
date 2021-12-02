import express from 'express'
import { addUser, userExists } from '../utils.js'

const router = express.Router()

router
	.route('/')
	.get((request, response) => {
		response.send('Users api up & running')
	})
	.post(async (request, response) => {
		const body = request.body
		const name = request.body.username
		const user = await userExists(name)
		if (!user[0]) {
			const result = await addUser(body)
			response.send({
				message: 'User added successfully!',
			})
		} else {
			response.send({
				message: 'User already exists',
			})
		}
	})

export default router
