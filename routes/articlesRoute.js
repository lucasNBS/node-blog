const express = require("express")
const Article = require("../models/articleModel")
const router = express.Router()

// local storage
const articlesList = []

// Show create article page
router.get("/create", (req, res) => {
  res.render("articles/form", { article: new Article("", "", ""), form: "create" })
})

// Create article
router.post("/create", (req, res) => {
  const { title, description, content } = req.body

  const article = new Article(
    title,
    description,
    content
  )

  try {
    articlesList.push(article)

    res.redirect("/")
  } catch (err) {
    console.log(err)
    res.render("articles/form", { article, form: "create" })
  }
})

// Show article's page
router.get("/:id", (req, res) => {
  const { id } = req.params

  const article = articlesList.find(article => article.id == id)

  if (!article) res.redirect("/")

  res.render("articles/article", { article })
})

// Show edit article page
router.get("/edit/:id", (req, res) => {
  const { id } = req.params

  const article = articlesList.find(article => article.id == id)

  if (!article) res.redirect("/")

  res.render("articles/form", { article, form: `edit/${id}?_method=PUT` })
})

// Edit article
router.put("/edit/:id", (req, res) => {
  const { id } = req.params
  const { title, description, content } = req.body

  const index = articlesList.findIndex(article => article.id == id)

  const article = articlesList.find(article => article.id == id)

  if (!article) {
    res.redirect("/")
  }

  const newArticle = {
    id: id,
    title: title ? title : article.title,
    description: description ? description : article.description,
    content: content ? content : article.content,
    createdAt: article.createdAt
  }

  try {
    articlesList.splice(index, 1, newArticle)
    res.redirect("/")
  } catch (err) {
    res.render("articles/form", { article, form: `edit/${id}?_method=PUT` })
  }
})

// Delete article
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params

  const index = articlesList.findIndex(article => article.id == id)

  articlesList.splice(index, 1)

  res.redirect("/")
})

module.exports = { router: router, articlesList: articlesList }