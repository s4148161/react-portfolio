import { getSession } from 'next-auth/react';
import prisma from '../../prisma'

async function deletePost(req, res) {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({unauthorized: true})
    }

    if (!req.body) {
        return res.status(500).json({error:'validation error'});
    }

    const deletePost = await prisma.post.delete({
        where: {
            id: req.body,
        },
    });

    if (deletePost) {
        res.status(200).json(deletePost)
    } else {
        return res.status(500).json({error:'something went wrong or item is not in database'});
    }
}

export default function handler(req, res) {
    if (req.method === 'POST') {
        return deletePost(req, res)
    }
}