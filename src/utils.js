import { client } from './index.js'

//Utility functions
async function getAllMovies(filter) {
	return await client.db('myDB').collection('movies').find(filter).toArray()
}
async function getMovieByID(id) {
	return await client.db('myDB').collection('movies').findOne({ id: id })
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

export {
	addMultipleMovies,
	addMovie,
	getAllMovies,
	getMovieByID,
	updateMovieByID,
	deleteMovieByID,
}
