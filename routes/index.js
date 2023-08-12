require('dotenv').config()
var express = require('express');
var router = express.Router();
var { OpenAIApi, configuration } = require('../openai/config');

/* GET home page. */

// Config
const openai = new OpenAIApi(configuration);

router.route('/')
  .get(async (req, res, next) => {
    res.status(200).render('index', { 'title': 'Hero' });
  })

router.route('/faq')
  .get(async (req, res, next) => {
    res.status(200).render('faq', { 'title': 'FAQ' });
  })

router.route('/query')
  .post(async (req, res, next) => {
    const search = req.body.query;
    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "system",
            "content": search
          },
          {
            "role": "assistant",
            "content": "How can I help you today?"
          },
          {
            "role": "assistant",
            "content": "If your ex wants you back, it's important to take some time to think about what you truly want. Consider the reasons why you broke up initially and if those issues have been resolved or can be addressed. Ask yourself if you still have feelings for your ex and if you're willing to give the relationship another chance.\n\nCommunicate with your ex and have an open and honest conversation about where you both stand. Discuss your expectations and concerns, and listen to what they have to say as well. If you decide to give the relationship another try, take it slow and make sure both parties are committed to making it work.\n\nRemember, it's important to prioritize your own happiness and well-being. If getting back together with your ex doesn't feel right or brings up negative emotions, it might be best to continue moving forward in your own life."
          }
        ],
        temperature: 1,
        max_tokens: 326,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      const ans = completion.data.choices[0].message.content;
      res.status(200).render('search', { 'title': search, 'prompt': ans });
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  })

router.route('*')
  .get((req, res, next) => {
    res.redirect('/');
  })

module.exports = router;
