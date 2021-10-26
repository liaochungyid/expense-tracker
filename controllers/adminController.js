module.exports = adminController = {
  getCreate: (req, res) => {
    res.render('edit')
  },
  postCreate: (req, res) => {
    console.log(req.body)
    res.redirect('/')
  },
  getEdit: (req, res) => {
    console.log(req.params.id)
    res.render('edit')
  },
  putEdit: (req, res) => {
    console.log(req.params.id)
    res.redirect('/')
  },
  deleteExpense: (req, res) => {
    console.log(req.params.id)
    res.redirect('/')
  }
}
