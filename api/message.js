import { put, list, del } from '@vercel/blob';

export default async function handler(req, res) {
    const BLOB_URL = 'messages.json';

    // 1. POST: Save a new message to the Blob
    if (req.method === 'POST') {
        const { from, to, message } = req.body;
        const newMessage = { from, to, message, time: Date.now() };

        try {
            // Get existing messages first
            let currentMessages = [];
            const { blobs } = await list();
            const existingBlob = blobs.find(b => b.pathname === BLOB_URL);

            if (existingBlob) {
                const response = await fetch(existingBlob.url);
                currentMessages = await response.json();
            }

            // Add new message and upload back to Blob
            currentMessages.push(newMessage);
            await put(BLOB_URL, JSON.stringify(currentMessages), {
                access: 'public',
                addRandomSuffix: false, // Keeps the filename consistent
            });

            return res.status(200).json({ success: true });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // 2. GET: Retrieve messages for a specific 6-digit ID
    if (req.method === 'GET') {
        const { id } = req.query;
        try {
            const { blobs } = await list();
            const existingBlob = blobs.find(b => b.pathname === BLOB_URL);

            if (!existingBlob) return res.status(200).json([]);

            const response = await fetch(existingBlob.url);
            const allMessages = await response.json();

            // Filter for messages where user is sender or receiver
            const filtered = allMessages.filter(m => m.to === id || m.from === id);
            return res.status(200).json(filtered);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    res.status(405).send('Method Not Allowed');
}
