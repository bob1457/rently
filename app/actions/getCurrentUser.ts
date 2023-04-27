import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from '@/app/libs/prismadb'
import { getServerSession } from "next-auth";
// import { getSession } from "next-auth/react";

// export const  getSession = async () => {
//     return await getServerSession(authOptions);
// }

export default async function getCurrentUser() {
    try {
        const session = await getServerSession(authOptions); // getSession();

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string,
            }
        });

        if (!currentUser) {
            return null;
        }

        return {
            ...currentUser,            
            createAt: currentUser.createAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null
        };

    } catch (error: any) {
        return null;
    }
}

// export default getCurrentUser;