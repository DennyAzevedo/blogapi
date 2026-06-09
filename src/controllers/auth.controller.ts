import { RequestHandler, Response } from 'express'
import { z } from 'zod'
import { createUser, verifyUser } from '../services/user.service'
import { createToken } from '../services/auth.service'
import { ExtendedRequest } from '../types/extended-request'

export const signIn: RequestHandler = async (req, res) => {
	const schema = z.object({
		email: z.string().email(),
		password: z.string()
	})
	const data = schema.safeParse(req.body)
	if (!data.success) {
		return res.status(400).json({ error: data.error.flatten().fieldErrors })
	}

	const user = await verifyUser(data.data)
	if (!user) {
		return res.status(400).json({ error: 'Invalid email or password' })
	}

	const token = createToken(user)
	res.json({
		message: 'User signed in successfully',
		user: {
			id: user.id,
			name: user.name,
			email: user.email
		},
		token
	})
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

	const token = createToken(newUser)
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

export const validate = async (req: ExtendedRequest, res: Response) => {
	res.json({user: req.user})
}
