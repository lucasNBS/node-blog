const mongoose = require("mongoose")
const slugify = require("slugify")

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  slug: {
    type: String,
    required: true,
    unique: true
  }
})

ArticleSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true })
  }
  next()
})

module.exports = mongoose.model("Article", ArticleSchema)