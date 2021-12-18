// pages/photo/index.js
const app = getApp()
Page({
    data: {
        show: "in",
        canSave: false
    },
    switchChange(event) {
        const {
            detail: {
                value
            }
        } = event
        this.setData({
            show: value ? "out" : "in"
        })
    },
    savePhoto() {
        const fm = wx.getFileSystemManager()
        const path = `${wx.env.USER_DATA_PATH}/cartoon-${Date.now()}.png`
        fm.writeFile({
            filePath: path,
            data: this.data.out,
            encoding: 'base64',
            success(res) {
                wx.saveImageToPhotosAlbum({
                    filePath: path,
                    success: (e) => {
                        wx.showToast({
                            title: 'save ok',
                            icon: 'success'
                        });
                    },
                    fail: (err) => {
                        console.error(err)
                        wx.showToast({
                            title: 'save fail',
                            icon: 'error'
                        })
                    }
                })
            },
            fail(err) {
                console.error(err)
                wx.showToast({
                    title: 'save fail',
                    icon: 'error'
                })
            }
        })
    },
    onLoad: function (options) {
        const _self = this;
        const {
            data
        } = app.globalData
        this.setData({
            in: data
        })
        wx.showLoading({
            title: 'loading',
        })
        wx.request({
            url: `${app.globalData.host}/api/cartoon`,
            method: 'POST',
            data: data,
            success(res) {
                console.log(res)
                _self.setData({
                    out: res.data,
                    show: "out",
                    canSave: true
                })
                wx.hideLoading({
                    success: (res) => {},
                })
            },
            fail(err) {
                console.error(err)
                wx.showToast({
                    title: 'api fail',
                    icon: 'error'
                })
                wx.hideLoading({
                    success: (res) => {},
                })
            }
        })
    },
})