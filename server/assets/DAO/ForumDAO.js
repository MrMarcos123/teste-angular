class ForumDAO {
  constructor(req, model) {
    this.model = model
    this.con = req.con
  }
}
module.exports = ForumDAO
