import { readFile } from 'fs/promises';

//Reads the json file containing an array of events
let events = JSON.parse(await readFile("events.json", "utf8"));

export const getRandomEvent = (req, res) => {
    //Gets a random value from events array.
    res.send(events[Math.floor(Math.random() * events.length)]);
}