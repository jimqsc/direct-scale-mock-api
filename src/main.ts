import express from 'express'

const app = express()
const port = 3000

let numRequestToValidateUsername = 0

const getRandomInt = ():number => {
	return Math.floor(Math.random() * 2147483647)
}

app.get('/', (req, res) => {
	res.status(200).json({'hello': 'world'})
})

app.get('/v1/validate/availability-check/usernames/:username', (req, res) => {
	const params = req.params
	numRequestToValidateUsername++

	if (numRequestToValidateUsername < 2) {
		res.status(500).end();
	}
	else {
		res.status(200).send('true')
	}
})

app.post('/v1/customers/', (req, res) => {
	const params = req.params
	const associateId = getRandomInt().toString()
	res.status(201).send(associateId)
})

app.listen(port, () => {
	console.log(`running on port ${port}`)
})