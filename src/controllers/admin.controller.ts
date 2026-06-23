import { RequestHandler, Response } from 'express'
import { ExtendedRequest } from '../types/extended-request'
import z from 'zod'
import { title } from 'node:process'
import { createPost, createPostSlug, handleCover } from '../services/post.service'
import { getUserById } from '../services/user.service'
import { create } from 'node:domain'
import { coverToUrl } from '../utils/cover-to-url';

export const addPost = async (req: ExtendedRequest, res: Response) => {
	if (!req.user) return
	
	const schema = z.object({
		title: z.string(),
		tags: z.string(),
		body: z.string()
	})
	const data = schema.safeParse(req.body)
	if (!data.success) {
		return res.status(400).json({ error: data.error.flatten().fieldErrors })
	}

	if(!req.file) {
		return res.status(400).json({ error: 'Cover image is required' })
	}
	
	const coverName = await handleCover(req.file)
	if(!coverName) {
		return res.status(400).json({ error: 'Invalid cover image' })
	}

	const slug = await createPostSlug(data.data.title)

	const newPost = await createPost({
		authorId: req.user.id,
		slug,
		title: data.data.title,
		tags: data.data.tags,
		body: data.data.body,
		cover: coverName
	})

	const author = await getUserById(newPost.authorId)

	res.status(201).json({
		post: {
			id: newPost.id,
			slug: newPost.slug,
			title: newPost.title,
			createdAt: newPost.createdAt,
			cover: coverToUrl(newPost.cover),
			tags: newPost.tags,
			authorName: author?.name || 'Unknown'
		}
	})
}

export const editPost = async (req: ExtendedRequest, res: Response) => {
	// Implementation for editing an existing post
}

export const deletePost = async (req: ExtendedRequest, res: Response) => {
	// Implementation for deleting a post
}

export const getAllPosts = async (req: ExtendedRequest, res: Response) => {
	// Implementation for getting all posts (admin view)
}

export const getPost = async (req: ExtendedRequest, res: Response) => {
	// Implementation for getting a single post (admin view)
}