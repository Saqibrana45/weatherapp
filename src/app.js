const express = require('express');
const app = express();
const path = require("path")
const hbs = require('hbs')
// const rootDir = require("../node_modules")
const PORT = process.env.PORT || 8000;

app.use("/css", express.static(path.join(__dirname + '/node_modules/bootstrap/dist/css/bootstrap.min.css')));

// console.log(path.join(__dirname, '../node_modules/bootstrap/dis/css/bootstrap.min.css'));
app.use(express.static('public'));

const template_path = path.join(__dirname, "../templates/views")
const template_partails = path.join(__dirname, "../templates/partials")

app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(template_partails)

app.get("/", (req, res)=>{
    res.render("index")
})

app.get("/about", (req, res)=>{
    res.render("about")
})
app.get("/weather", (req, res)=>{
    res.render("weather")
})
app.get("*", (req, res)=>{
    res.render("404Error", {
        errorMsg: "Opps, Page Not Found, Go Back "
    })
})
app.listen(PORT, () => {
    console.log(`Express Website running on the ${PORT}`);
})