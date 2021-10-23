import express from 'express';
import db from "../utils/database";
import createURL from "../utils/createURL";
const app = express();

app.post("/api/newURL", function (req, res) {
    console.log(req.body)
    if (req.body.newURL) db.push("url", { url: req.body.url, newURL: req.body.newURL, author: req.body.username })
    else db.push("url", { url: req.body.url, newURL: createURL(4), author: req.body.username })
    res.json({ status: 200 })
})

app.get("/:url" , function(req, res) {
    console.log(db.read("user").find((data: any) => data.newURL == req.params.url))
    res.redirect(db.read("user").find((data: any) => data.newURL == req.params.url).url)
})

app.listen(8080)