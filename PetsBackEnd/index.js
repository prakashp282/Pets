import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {getRandomEvent} from './Controller/event.js';


const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json({ extended: false }));
const PORT = process.env.PORT || 8080;

//Single api to get random event.
app.get('/event', getRandomEvent);
app.listen(PORT, () =>  console.log(`Server running on Port: http://localhost:${PORT}`))