import express from 'express'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import moviesRouter from './routes/movies.js'
import usersRouter from './routes/users.js'
import cors from 'cors'
import { addRecipes, getAllRecipes } from './utils.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log('App running on port', PORT)
})
app.use('/movies', moviesRouter)
app.use('/users', usersRouter)
app.get('/recipes', async (request, response) => {
	const recipe_data = await getAllRecipes()
	response.send(recipe_data)
})

app.post('/recipes/add', async (request, response) => {
	const result = await addRecipes(request.body)
	response.send(result)
})
// To connect to local mongoDB
// const MONGO_URL = 'mongodb://localhost'

// To connect to atlas mongoDB
const MONGO_URL = process.env.MONGO_URL

const createConnection = async () => {
	const client = new MongoClient(MONGO_URL)
	await client.connect()
	console.log('Mongo connected')
	return client
}

//Creating a new connection to mongodb
export const client = await createConnection()

//Initial check up
app.get('/', function (req, res) {
	res.send('App is up and running!!')
})
