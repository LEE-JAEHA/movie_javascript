const express = require('express');
const router = express.Router();
const db = require('../database/index');
const axios = require('axios');

router.route("/use_api")
    .get(async(req, res) => {
        var result = await axios.get('https://yts.am/api/v2/list_movies.json?sort_by=rating')
        var movies = result.data.data.movies;
        res.render('use_api/index', { movies });
    })
    .post(async(req, res) => {
        var search = req.body.search;
        if(!search){
        }
        // search = "%" + search + "%";
        var API = 'https://yts.am/api/v2/list_movies.json?sort_by=rating';
        API = API + "?query_term=" + search;
        var result = await axios.get(API)
        var movies = result.data.data.movies;
        res.render('use_api/index', { movies });
        // var sql = "SELECT * FROM movie WHERE title LIKE ? OR description LIKE ?";
        // db.query(sql, [search, search], (err, movies, fields) => {
        //     if(err){
        //         console.log(err);
        //         return res.send("sorry error~");
        //     }
        //     res.render('use_api/index', { movies });
        // })
    })

module.exports = router;
