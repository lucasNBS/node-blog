const express = require("express")
const ArticleModel = require("../models/articleModel")
const router = express.Router()

// Show create article page
router.get("/create", (req, res) => {
  res.render("articles/form", { article: new ArticleModel(), form: "create" })
})

// Create article
router.post("/create", async (req, res) => {
  const { title, description, content } = req.body

  const article = new ArticleModel({
    title,
    description,
    content,
  })

  try {
    await article.save()
    res.redirect("/")
  } catch (err) {
    res.render("articles/form", { article, form: "create" })
  }
})

// Show article's page
router.get("/:slug", async (req, res) => {
  const { slug } = req.params

  const article = await ArticleModel.findOne({ slug })

  if (!article) res.redirect("/")

  res.render("articles/article", { article })
})

// Show edit article page
router.get("/edit/:slug", async (req, res) => {
  const { slug } = req.params

  const article = await ArticleModel.findOne({ slug })

  if (!article) res.redirect("/")

  res.render("articles/form", { article, form: `edit/${slug}?_method=PUT` })
})

// Edit article
router.put("/edit/:slug", async (req, res) => {
  const { slug } = req.params
  const { title, description, content } = req.body

  const article = await ArticleModel.findOne({ slug })

  if (!article) {
    res.redirect("/")
  }

  if (title) article.title = title
  if (description) article.description = description
  if (content) article.content = content

  try {
    await article.save()
    res.redirect("/")
  } catch (err) {
    res.render("articles/form", { article, form: `edit/${slug}?_method=PUT` })
  }
})

// Delete article
router.delete("/delete/:slug", async (req, res) => {
  const { slug } = req.params

  await ArticleModel.findOneAndDelete({ slug })
  res.redirect("/")
})

module.exports = router