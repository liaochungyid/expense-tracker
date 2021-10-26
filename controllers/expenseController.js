const CATEGORY = {
  家居物業: '<i class="fas fa-home" >',
  交通出行: '<i class="fas fa-shuttle-van">',
  休閒娛樂: '<i class="fas fa-grin-beam">',
  餐飲食品: '<i class="fas fa-utensils">',
  其他: '<i class="fas fa-pen">'
}

module.exports = expenseController = {
  getIndex: (req, res) => {
    res.render('index', { CATEGORY: Object.keys(CATEGORY) })
  }
}