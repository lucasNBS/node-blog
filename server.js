require("dotenv").config()

// Importing libs
const express = require("express")
const mongoose = require("mongoose")
const methodOverride = require("method-override")

// Importing different code sections
const articlesRouter = require("./routes/articlesRoute")
const ArticleModel = require("./models/articleModel")

// Connecting to database
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on("error", (err) => console.error(err))
db.once("open", () => console.log("Connection openned"))

// Initializing and configuring server 
const app = express()

app.set("view engine", "ejs")
app.use(express.static("./styles"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))

// Routes
app.get("/", async (req, res) => {
  const articles = await ArticleModel.find().sort({ createdAt: "desc" })
  res.render("index", { articles })
})

app.use("/articles", articlesRouter)

app.listen(process.env.PORT, () => {
  console.log("Hello")
})