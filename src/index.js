import express from 'express'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())
app.get('/', (request, response) => {
	response.send('Hello yall')
})

const PORT = 5000
app.listen(PORT, () => {
	console.log('App running on port', PORT)
})

// To connect to local mongoDB
// const MONGO_URL = 'mongodb://localhost'

// To connect to atlas mongoDB
const MONGO_URL = process.env.MONGO_URL
const message = {
	message: 'no matching movie found',
}

const createConnection = async () => {
	const client = new MongoClient(MONGO_URL)
	await client.connect()
	console.log('Mongo connected')
	return client
}

//Creating a new connection to mongodb
const client = await createConnection()

//To add movies data
app.post('/movies', async (request, response) => {
	const body = request.body
	const result = await addMultipleMovies(body)
	response.send(result)
})

//To add one movie data
app.post('/movies/add', async (request, response) => {
	const body = request.body
	const result = await addMovie(body)
	response.send(result)
})

//To get all movies/based on query params
app.get('/movies', async (request, response) => {
	const filter = request.query
	filter.rating ? (filter.rating = +filter.rating) : ''
	let filterMovies = await getAllMovies(filter)
	response.send(filterMovies)
})

//To get movies based on id
app.get('/movies/:id', async (request, response) => {
	const { id } = request.params
	const movie = await getMovieByID(id)
	response.status(movie ? 200 : 404).send(movie ? movie : message)
})

//To edit movies data based on id
app.put('/movies/:id', async (request, response) => {
	const { id } = request.params
	const body = request.body
	const updatedMovie = await updateMovieByID(id, body)
	const result = await getMovieByID(id)
	response.send(result)
})

//To delete movies based on id
app.delete('/movies/:id', async (request, response) => {
	const { id } = request.params
	const result = await deleteMovieByID(id)
	response.status(200).send(result.deleteCount > 0 ? result : message)
})

//Utils
async function getAllMovies(filter) {
	return await client.db('myDB').collection('movies').find(filter).toArray()
}

async function addMultipleMovies(body) {
	return await client.db('myDB').collection('movies').insertMany(body)
}

async function addMovie(body) {
	return await client.db('myDB').collection('movies').insertOne(body)
}

async function updateMovieByID(id, body) {
	return await client
		.db('myDB')
		.collection('movies')
		.updateOne({ id: id }, { $set: body })
}

async function deleteMovieByID(id) {
	return await client.db('myDB').collection('movies').deleteOne({ id: id })
}

async function getMovieByID(id) {
	return await client.db('myDB').collection('movies').findOne({ id: id })
}
