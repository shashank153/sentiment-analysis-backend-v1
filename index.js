const needle = require('needle');
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 3000
const token = 'AAAAAAAAAAAAAAAAAAAAACxEWwEAAAAAYN0o0xgy%2FDYqhOKba%2F0zjoLYw4g%3DT0R02eM5PLYLcmiLyumzt9IzcVB8xfg47LQOHfdWzBSxErOTNB';
const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";
async function getRequest(query) {

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
app.use(cors({
    origin: '*'
}));
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use(express.static('public'));

//Home Route(Get Route)
app.get('/', (req, res) => {
    res.send("Welcome to the Twitter backend API")
})

//getTweetData(Get Route)
app.get('/getTweetData/:query', function (req, res) {
    console.log(req.params.query);
    start(req.params.query).then((result) => {
        console.log(JSON.stringify(result));
        res.send(result)
    })
})

app.listen(port, () => {
    console.log("Server started at: http://localhost:" + port);
})