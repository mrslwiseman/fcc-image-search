const express = require('express');
const app = express();
const axios = require('axios');
const get = require('lodash.get');
const path = require('path');
const parse = require('./helpers/parsers');
const firebase = require('firebase');

if (app.get('env') !== 'production') {
    require('dotenv').config();
}
app.set('view engine', 'pug')
app.set('views', './views')
app.set('port', process.env.PORT || 5000)

const config = {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: "fcc-image-search-735d9.firebaseapp.com",
    databaseURL: "https://fcc-image-search-735d9.firebaseio.com",
    projectId: "fcc-image-search-735d9",
    storageBucket: "fcc-image-search-735d9.appspot.com",
    messagingSenderId: "646946511088"
};

firebase.initializeApp(config);
const database = firebase.database();
// models
function writeSearchData(req, timestamp) {
    database
        .ref('searches/')
        .push({
            timestamp,
            term: req.params.search,
            ip: parse.ip(req),
            language: parse.lang(req),
            user_agent: parse.userAgent(req)
        });
}


function sortDesc(val){
    return Object.keys(val)
        .map(key => val[key])
        .sort((a,b) => b.timestamp - a.timestamp)
}

function getRecentSearches() {
    return database
        .ref('/searches')
        .limitToLast(10)
        .once('value')
        .then(res => sortDesc(res.val())) // // firebase only gives us ascending results so we have to sort here
        .catch(e => res.json('there was an error getting recent searches.' + e))
}

function formatResponse(d) {
    return d.data.items
        .map(r => ({
            title: r.title,
            alt: get(r, 'pagemap.imageobject[0].caption', null),
            page_url: r.link,
            src_url: get(r, 'pagemap.cse_image[0].src', null)
        }))
}

function search(q, offset = 0) {
    return axios({
        method: 'get',
        url: 'https://www.googleapis.com/customsearch/v1',
        params: {
            q,
            cx: '015745276868716929893:w-qq-w5u57g',
            key: process.env.KEY,
            fields: 'items/link,items/pagemap/imageobject/caption,items/pagemap/cse_image/src,items/title',
            start: offset
        }
    })
}

app.get('/search/:search', (req, res) => {
    const offset = req.query.offset ? (req.query.offset * 10) : null;
    search(req.params.search, offset)
        .then(formatResponse)
        .then(writeSearchData(req, Date.now()))
        .then(r => res.json(r))
        .catch(e => res.json('there was an error.' + e))
})


app.get('/recent', (req, res) => {
    getRecentSearches()
        .then(r => {
            if (r !== null) {
                res.json(r);
            } else {
                throw Error('Error connecting to recent searches DB')
            }
        }).catch(e => res.json('Oh No! There was an error! ' + e.message))
})

app.get('/', (req, res) => {
    res.render('index');
})

const server = app.listen(app.get('port'), () => {
    console.log('Server running on port ' + app.get('port'));
})