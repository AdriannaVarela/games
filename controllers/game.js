const gameRouter = require("express").Router();
const axios = require('axios');



gameRouter.get('/', async (req, res) => {

    const apiUrl = 'https://www.freetogame.com/api/games';
console.log(req);

    try {
        // Fetch 
        //  const response = await fetch(apiUrl);

        // Axios
        const response = await axios.get(apiUrl);

        const data = await response;
        console.log(data);
        return res.json(data);
    // res.json(data);

    

        // const data = await response.json();
        // console.log(data);
        // res.json(data);

    } catch (error) {
        console.error('Error fetching data from FreeToGame API:', error);
        res.status(500).json({ error: 'Failed to fetch data from the external API' });
    }
});


module.exports = gameRouter;
