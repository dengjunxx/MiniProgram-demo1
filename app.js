App({
  //只能之策一个入口
  onLaunch: function () {
    //初始化监听
    var that = this;
    that.curid = wx.getStorageSync('curid') || that.curid;
    that.setlocal('curid', that.curid);
  },
  onShow: function () {
    //监听显示，进入前台
  },
  onHide: function () {
    //监听隐藏，进入后台，按home离开微信
  },
  onError: function () {
    //监听错误
  },
  //以下为全局注册的方法和数据
  curid: "CN101010100",
  version: "1.0",
  setlocal(key, val) {
    wx.setStorageSync(key, val)
  },
  globalFun: function () {

  },
  globalData: 'I am Global Data',
})