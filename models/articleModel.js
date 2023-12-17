// articles model ( local usage )
class Article {
  constructor(title, description, content) {
    this.id = Date.now()
    this.title = title
    this.description = description
    this.content = content
    this.createdAt = new Date()
  }
}

module.exports = Article