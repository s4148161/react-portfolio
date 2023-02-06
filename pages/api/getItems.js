import prisma from '../../prisma'

export default async function getItems() {

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    const items = await prisma.post.findMany({
        where: { userId: user.id },
    });

    return items
}