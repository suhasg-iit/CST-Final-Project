const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAKs1xAEAAAAAz3oxsONxDhA9sMNQg6lxvsEn%2FQY%3DGkC6JBBYFxT4SXGUeqZBkPFRli6giLUeDX9IFfNwR8t9nzjSGK';

app.get('/api/twitter/:username', async (req, res) => {
    const username = req.params.username;
    try {
        const response = await fetch(
            `https://api.twitter.com/2/users/by/username/${username}?user.fields=created_at,description,profile_image_url,public_metrics`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${BEARER_TOKEN}`,
                },
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json(errorData);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
