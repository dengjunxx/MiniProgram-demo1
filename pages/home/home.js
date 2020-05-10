Page({
  data: {
    students: [{
        name: 'Jason',
        age: 18
      },
      {
        name: 'Jingli',
        age: 16
      },
    ],
    counter: 0
  },
  handleBtnClickAdd() {
    this.setData({
      counter: this.data.counter + 1
    })
  },
  handleBtnClickMinus() {
    this.setData({
      counter: this.data.counter - 1
    })
  }
})