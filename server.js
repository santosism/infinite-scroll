const express = require('express');
const axios = require('axios').default;
require('dotenv').config();

const app = express();
const port = 3000;


app.get('/getRandomPhotos', async (req, res) => {
    try {
        const response = await axios.get('https://api.unsplash.com/photos/random', {
            params: {
                client_id: process.env.API_KEY,
                count: 30, // Fetch thirty random photos
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error('Axios Error:', error.message);
        res.status(error.response?.status || 500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
