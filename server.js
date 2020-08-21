const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res) => {
    const randomQuote = getRandomElement(quotes);
    const response = {
        quote: randomQuote
    }
    res.status(200).send(response);
})

app.get('/api/quotes', (req, res) => {
    if(req.query.person){
        const array = quotes.filter(quote => quote.person == req.query.person)
        const result ={
            quotes: array
        }
        console.log(result);
        res.status(200).send(result);
    } else {
        const result = {
            quotes: quotes
        }
        res.send(result);
    }
})


app.post('/api/quotes', (req, res) => {
    if (req.query.name && req.query.quote){
            const result = {
                quote: req.query.quote,
                person: req.query.name
            }

            quotes.push(result);
            const quote = {
                quote: result
            }
            res.status(201).send(quote)
        } else {
            res.status(400).send();
        }
})


app.listen(PORT, (req,res) => {
    console.log("Port is running on " + PORT);
})
