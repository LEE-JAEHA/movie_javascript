const express = require('express');
const router = express.Router();
const db = require('../database/index');


router.route("/movie")
    .get( (req, res) => {
        var sql = "SELECT * FROM movie";
        console.log("hi");
        db.query(sql, (error, movies, fields) => {
            if (error){
                console.log(error)
                return res.end();
            }
            res.render('movie/index',{movies});
        })
        console.log("hi2");
        
    })
    .post((req,res)=>{
        var search = req.body.search;
        search = "%" + search + "%";
        var sql = "SELECT * FROM movie WHERE title LIKE ? OR description LIKE ?";
        //SELECT [칼럼명] FROM [테이블명] WHERE [칼럼명] LIKE '%특정문자열%
        db.query(sql, [search, search], (err, movies, fields) => {
            if(err){
                console.log(err);
                return res.send("sorry error~");
            }
            res.render('movie/index', { movies });// /movie 홈페이지로 이동
        })
    })
    
// router.get("/movie", (req, res) => {
//     var sql = "SELECT * FROM movie";
//     console.log("hi");
//     db.query(sql, (error, results, fields) => {
//         if (error) throw error;
//         res.render('movie/index',{results});
//     });
// })

// router.post("/movie",(req,res)=>{
//     var sql = "SELECT * FROM movie "
//     var {title, description, category, thumbnail} = req.body;
//     var sql = "INSERT INTO movie (title,description,category,thumbnail) VALUES (?,?,?,?)";
//     console.log("I'm in in");
//     db.query(sql, [title, description, category, thumbnail], (error, results, fields) => {
//         if (error) throw error;
//         console.log("I'm in in");
//         res.redirect("/movie");
//     })
// })


// router.post("/movie", (req, res) => {
//     var { title, description, category, thumbnail } = req.body;
//     var sql = "INSERT INTO movie (title, description, category, thumbnail) VALUES (?, ?, ?, ?)";
//     db.query(sql, [title, description, category, thumbnail], (error, results, fields) => {
//         if (error) throw error;
//         res.redirect("/admin");
//     });
// })


module.exports = router;