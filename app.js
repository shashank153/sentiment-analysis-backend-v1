// Search for Tweets within the past seven days
// https://developer.twitter.com/en/docs/twitter-api/tweets/search/quick-start/recent-search

const needle = require('needle');
const express = require('express')
const bodyParser = require('body-parser')

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
// const token = process.env.BEARER_TOKEN;
const token = 'AAAAAAAAAAAAAAAAAAAAACxEWwEAAAAAYN0o0xgy%2FDYqhOKba%2F0zjoLYw4g%3DT0R02eM5PLYLcmiLyumzt9IzcVB8xfg47LQOHfdWzBSxErOTNB';

const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

async function getRequest(query) {

    // Edit query parameters below
    // specify a search query, and any additional fields that are required
    // by default, only the Tweet ID and text fields are returned
    const params = {
        'query': query,
        // 'tweet.fields': 'author_id'
    }

    const res = await needle('get', endpointUrl, params, {
        headers: {
            "User-Agent": "v2RecentSearchJS",
            "authorization": `Bearer ${token}`
        }
    })

    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}


async function start(query) {
    try {
        // Make request
        const response = await getRequest(query);
        return response;
    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    process.exit();
}
 
// @author: Shashank Kumar Shukla
const app = express()
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static('public'))


app.get('/getTweetData', function(req, res){
    start("salman").then((result) => {
        console.log(JSON.stringify(result));
        res.send(result)
    })
})

app.listen(3000, ()=>{
    console.log("Server started at port 3000");
})

