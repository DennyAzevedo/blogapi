import { RequestHandler } from 'express'
import { z } from 'zod'
import { createUser } from '../services/user.service'

export const signIn: RequestHandler = async (req, res) => {
	// Implementation for user sign-in
}

export const signUp: RequestHandler = async (req, res) => {
	const schema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string()
	})
	const data = schema.safeParse(req.body)
	if (!data.success) {
		return res.status(400).json({ error: data.error.flatten().fieldErrors })
	}

	const newUser = await createUser(data.data)
	if (!newUser) {
		return res.status(400).json({ error: 'Email already in use' })
	}

	const token = '123'
	res.status(201).json({
		message: 'User created successfully',
		user: {
			id: newUser.id,
			name: newUser.name,
			email: newUser.email
		},
		token
	})
}

export const validate: RequestHandler = async (req, res) => {
	// Implementation for validating user token
}