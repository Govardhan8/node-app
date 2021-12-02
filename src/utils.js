import { client } from './index.js'
import { ObjectId } from 'mongodb'

//Utility functions
async function getAllMovies(filter) {
	return await client.db('myDB').collection('movies').find(filter).toArray()
}
async function getMovieByID(id) {
	return await client
		.db('myDB')
		.collection('movies')
		.findOne({ _id: ObjectId(id) })
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
		.updateOne({ _id: ObjectId(id) }, { $set: body })
}
async function deleteMovieByID(id) {
	return await client
		.db('myDB')
		.collection('movies')
		.deleteOne({ _id: ObjectId(id) })
}

async function addUser(body) {
	return await client.db('myDB').collection('users').insertOne(body)
}

async function userExists(name) {
	const result = await client
		.db('myDB')
		.collection('users')
		.find({ username: name })
		.toArray()
	return result ? result : null
}
export {
	addMultipleMovies,
	addMovie,
	getAllMovies,
	getMovieByID,
	updateMovieByID,
	deleteMovieByID,
	addUser,
	userExists,
}
