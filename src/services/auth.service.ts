import { User } from "@prisma/client"
import { createJWT, verifyJWT } from "../libs/jwt"
import { Request } from "express";
import { TokenPayload } from "../types/token-payload"
import { getUserById } from "../services/user.service"

export const createToken = (user: User) => {
	return createJWT({ id: user.id })
}

export const verifyRequest = async (req: Request) => { 
	const { authorization } = req.headers
	if (authorization) {
		const authSplit = authorization.split('Bearer ')
		if (authSplit[1]) {
			const payload = verifyJWT(authSplit[1])
			if (payload) { 
				const user_id = (payload as TokenPayload).user_id
				const user = await getUserById(Number(user_id))
				if (user) return user
			}
		}
	}

	return false
}