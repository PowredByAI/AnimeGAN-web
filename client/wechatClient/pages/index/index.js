// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    devicePosition: "back",
  },
  switchChange(event) {
    const {
      detail: {
        value
      }
    } = event
    this.setData({
      devicePosition: value ? "front" : "back"
    })
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        const {
          tempImagePath
        } = res
        wx.getFileSystemManager().readFile({
          filePath: tempImagePath, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: (res) => {
            const {
              data
            } = res
            app.globalData.data = data;
            wx.navigateTo({
              url: '../photo/index',
            })
          }
        })
      },
      fail() {
        wx.showToast({
          title: 'take fail',
          icon: 'error'
        })
        wx.hideLoading({
          success: (res) => {},
        })
      }
    })
  },
})