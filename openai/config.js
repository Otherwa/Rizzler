require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OpenAIApi,
});
// const openai = new OpenAIApi(configuration);


module.exports = { configuration, OpenAIApi }