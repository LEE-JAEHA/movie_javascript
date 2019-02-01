const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mysql = require('mysql');
const db = require('./routes/database/index');

app.use(bodyParser.urlencoded({extended: false}));

//method override put과 delete를 쉽게 받을 수 있도록 해줌
app.use(methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))


app.set('view engine', 'pug');
app.set("views", "./views");

// const admin = require('./routes/admin/index');
// app.use(admin);

//movie page 만들기
// app.get("/movie", (req,res)=>{
//     // var sql = "SELECT * FROM movie";
//     // db.query(sql, (error, results, fields)=> {
//     //     if (error) throw error;
//     //     res.render('movie/index', {results});
//     // });
//     res.render('movie/index');
// })
// app.post("/movie",(req,res)=>{
//     var {title, description, category, thumbnail} = req.body;
//     var sql = "INSERT INTO movie (title,description,category,thumbnail) VALUES (?,?,?,?)";
//     console.log("HI");
//     db.query(sql, [title, description, category, thumbnail], (error, results, fields) => {
//         if (error) throw error;
//         res.redirect("/movie");
//     })
// })


const admin = require('./routes/admin/index');
const movie = require('./routes/movie/index');
app.use(admin);
app.use(movie);



app.listen(3000, () => {
    console.log("server running");
})