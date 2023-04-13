var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require ('cors')

const dotenv = require('dotenv');
dotenv.config();

const APIKey = process.env.API_KEY;

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('dist'))


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})


app.post('/analyze', (request, response) => {
    const text = request.body.text;

    const formdata = new FormData();
        formdata.append("key", APIKey);
        formdata.append("txt", text);
        formdata.append("lang", "auto");  

    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    const analysis = async () => {
        const answer = await fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions);
        //https://learn.meaningcloud.com/developer/sentiment-analysis/2.1/console
        try {
            const result = await answer.body.json();
            console.log('blaaaah')
            return result;
        } catch (err) {
            console.log('ERROR', err);
        }
    
    const analysisResult = analysis();

    response.send(analysisResult);
    }
})


