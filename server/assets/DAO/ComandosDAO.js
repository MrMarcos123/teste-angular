class ComandosDAO {
  constructor(req, model) {
    this.model = model
    this.con = req.con
  }
}
module.exports = ComandosDAO
