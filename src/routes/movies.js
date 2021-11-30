import {
	addMultipleMovies,
	addMovie,
	getAllMovies,
	getMovieByID,
	updateMovieByID,
	deleteMovieByID,
} from '../utils.js'
import express from 'express'
const router = express.Router()
const message = {
	message: 'no matching movie found',
}

//To add movies data
router.post('/', async (request, response) => {
	const body = request.body
	const result = await addMultipleMovies(body)
	response.send(result)
})

//To add one movie data
router.post('/add', async (request, response) => {
	const body = request.body
	const result = await addMovie(body)
	response.send(result)
})

//To get all movies/based on query params
router.get('/', async (request, response) => {
	const filter = request.query
	filter.rating ? (filter.rating = +filter.rating) : ''
	let filterMovies = await getAllMovies(filter)
	response.send(filterMovies)
})

//To get movies based on id
router.get('/:id', async (request, response) => {
	const { id } = request.params
	const movie = await getMovieByID(id)
	response.status(movie ? 200 : 404).send(movie ? movie : message)
})

//To edit movies data based on id
router.put('/:id', async (request, response) => {
	const { id } = request.params
	const body = request.body
	const updatedMovie = await updateMovieByID(id, body)
	const result = await getMovieByID(id)
	response.send(result)
})

//To delete movies based on id
router.delete('/:id', async (request, response) => {
	const { id } = request.params
	const result = await deleteMovieByID(id)
	response.status(200).send(result.deleteCount > 0 ? result : message)
})

export default router
