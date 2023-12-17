require("dotenv").config()

// Importing libs
const express = require("express")
const methodOverride = require("method-override")

// Importing different code sections
const { router, articlesList } = require("./routes/articlesRoute")

// Initializing and configuring server 
const app = express()

app.set("view engine", "ejs")
app.use(express.static("./styles"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))

// Routes
app.get("/", (req, res) => {
  const articles = articlesList
  res.render("index", { articles })
})

app.use("/articles", router)

app.listen(process.env.PORT, () => {
  console.log("Hello")
})