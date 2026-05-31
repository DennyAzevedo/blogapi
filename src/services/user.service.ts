import { prisma } from '../libs/prisma'
import bcrypt from 'bcryptjs'

type CreateUserProps = {
	name: string;
	email: string;
	password: string;
}

export const createUser = async ({ name, email, password }: CreateUserProps) => {
	email = email.toLowerCase()

	const user = await prisma.user.findFirst({
		where: { email }
	})
	if (user) return false

	const passwordHash = await bcrypt.hashSync(password, 10)

	return await prisma.user.create({
		data: {
			name,
			email,
			password: passwordHash
		}
	})
}