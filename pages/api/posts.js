import { getSession } from 'next-auth/react';
import prisma from '../../prisma'

async function createPost(req, res) {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({unauthorized: true})
    }
    
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!req.body) {
        return res.status(500).json({error:'validation error'});
    }

    const post = await prisma.post.create({
        data: {
            id: req.body.values.id,
            userId: user.id,
            itemsData: req.body,
        },
    });

    if (post.id) {
        res.status(200).json(post)
    } else {
        return res.status(500).json({error:'something went wrong'});
    }
}

export default function handler(req, res) {
    if (req.method === 'POST') {
        return createPost(req, res)
    }
}