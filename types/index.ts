import { User } from '@prisma/client'

export type SafeUser = Omit<
    User,
    "CreateAt" | "updatedAt" | "emailVerified"
> & {
    createAt: string;
    updatedAt: string;
    emailVerified: string
}