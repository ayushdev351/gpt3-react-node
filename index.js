import {Configuration, OpenAIApi} from "openai";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const config = new Configuration({
    organisation : process.env.ORG_KEY,
    apiKey : process.env.API_KEY,
})

const openai = new OpenAIApi(config);

const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(cors());

app.post("/", async(req, res) => {

    const {message} = req.body;

    const completion = await openai.createChatCompletion({
        model : "gpt-3.5-turbo",
        messages:[
            {role: "user", content: `${message}`},
        ] 
    })
    res.json({result : completion.data.choices[0].message.content});
})

app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
})
