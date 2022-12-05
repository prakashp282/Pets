import express from 'express';
import bodyParser from 'body-parser';
import {getRandomEvent} from './Controller/event.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

//Single api to get random event.
app.get('/event', getRandomEvent);

app.listen(PORT, () =>  console.log(`Server running on Port: http://localhost:${PORT}`))