import express from 'express'

const app = express()
const port = 3000

let numRequestsToValidateUsername = 0
let numRequestsToCreateCustomer = 0
const RequestCountTilSuccess = 3;

const getRandomInt = ():number => {
	return Math.floor(Math.random() * 2147483647)
}

app.get('/', (req, res) => {
	res.status(200).json({'hello': 'world'})
})

app.get('/v1/validate/availability-check/usernames/:username', (req, res) => {
	const params = req.params
	numRequestsToValidateUsername++

	if (numRequestsToValidateUsername < RequestCountTilSuccess) {
		res.status(500).end()
	}
	else {
		res.status(200).send('true')
	}
})

app.post('/v1/customers/', (req, res) => {
	const params = req.params
	numRequestsToCreateCustomer++

	if (numRequestsToCreateCustomer < RequestCountTilSuccess) {
		res.status(500).end()
	}
	else {
		const associateId = getRandomInt().toString()
		res.status(201).send(associateId)
	}
})

app.get('/reset', (req, res) => {
	numRequestsToValidateUsername = 0
	numRequestsToCreateCustomer = 0
	res.status(200).send('reset done.')
})

app.listen(port, () => {
	console.log(`running on port ${port}`)
})