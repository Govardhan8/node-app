import express from 'express'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import moviesRouter from './routes/movies.js'

dotenv.config()

const app = express()
app.use(express.json())
const PORT = 5000
app.listen(PORT, () => {
	console.log('App running on port', PORT)
})
app.use('/movies', moviesRouter)
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
