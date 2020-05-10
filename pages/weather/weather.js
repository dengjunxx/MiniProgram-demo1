// pages/weather/weather.js
var app = getApp(); //获取小程序实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cur_id: app.curid,
    basic: {
      location: ''
    },
    loc: '',
    icon: '',
    now: {
      tmp: '',
      cond_txt: '',
      wind_dir: '',
      wind_sc: '',
      hum: '',
      pcpn: '',
      vis: '',
    },
    lifestyle: [],

  },
  bindViewTap() {
    console.log("bindViewTap");
    wx.switchTab({
      url: '../city/city',
    })
  },
  showcurid() {
    console.log('showcurid')
  },
  getnow(fn) {
    //自定义方法
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/now',
      data: {
        location: app.curid,
        key: 'e1c701806a6746b6bdf3dd7f7f157ed4'
      },
      header: {
        "Content-Type": 'application/json'
      },
      success: function (res) {
        fn(res.data.HeWeather6[0])
      },
    })
  },
  getsuggestion(fn) {
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/lifestyle',
      data: {
        location: app.curid,
        key: 'e1c701806a6746b6bdf3dd7f7f157ed4'
      },
      header: {
        "Content-Type": 'application/json'
      },
      success: function (res) {
        fn(res.data.HeWeather6[0])
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: "loading",
      duration: 3000
    });
    that.getnow(function (d) {
      wx.hideToast();
      console.info(d);
      var icon1 = "https://cdn.heweather.com/cond_icon/" + d.now.cond_code + ".png";
      console.info(icon1);
      that.setData({
        basic: d.basic,
        now: d.now,
        icon: icon1,
        loc: d.update.loc
      })
    });
    that.getsuggestion(function (d) {
      console.info(d);
      that.setData({
        lifestyle: d.lifestyle
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //下拉刷新，需要在json文件中打开"enablePullDownRefresh": true
    console.log('下拉刷新')
    wx.showNavigationBarLoading();
    var that = this;
    wx.showToast({
      title: '加载中',
      icon:'loading',
      duration:3000
    });
    that.getnow(function(d){
      console.info(d);
      var icon1 = "https://cdn.heweather.com/cond_icon/" + d.now.cond_code + ".png";
      that.setData({
        basic:d.basic,
        now:d.now,
        icon:icon1,
        loc:d.update.loc
      })
    });
    that.getsuggestion(function(d){
      console.info(d);
      that.setData({
        lifestyle:d.lifestyle
      })
    })
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
})
//跳转并刷新页面：需使用onshow来代替onload执行逻辑，onload只在首次打开页面时执行一次。
//如：B页面操作全局数据并跳转A页面，A页面onshow中获取全局数据更新视图。