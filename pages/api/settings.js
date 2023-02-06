import { getSession } from 'next-auth/react';
import prisma from '../../prisma'
import { v4 as uuidv4 } from 'uuid';

async function createSettings(req, res) {
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

    console.log(req.body)

    
    const settings = await prisma.settings.upsert({
        where: {
            userId: user.id
        },
        update: {
            settingsData: req.body,
        },
        create: {
            userId: user.id,
            settingsData: req.body,
        }
    });

    if (settings.id) {
        res.status(200).json(post)
    } else {
        return res.status(500).json({error:'something went wrong'});
    }
}

export default function handler(req, res) {
    if (req.method === 'POST') {
        return createSettings(req, res)
    }
}