import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const server = express()
server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(express.static('public'))

server.get('/api/teste', (req, res) => {
	res.json({ testes: true })
})

server.listen(4000, () => {
	console.log('BlogAPI BackEnd running...')
})