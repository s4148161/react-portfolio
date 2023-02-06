import { getSession } from 'next-auth/react';
import prisma from '../../prisma'

async function editPost(req, res) {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({unauthorized: true})
    }

    if (!req.body) {
        return res.status(500).json({error:'validation error'});
    }

    var data = {}
    data.values = req.body
    console.log(data)


    const updatePost = await prisma.post.update({
        where: {
            id: data.values.id //req.body.id
        },
        data: {
            itemsData: data,
        },
    });

    if (updatePost) {
        res.status(200).json(updatePost)
    }
}

export default function handler(req, res) {
    if (req.method === 'POST') {
        return editPost(req, res)
    }
}