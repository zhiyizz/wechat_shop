// pages/order/index.js
Page({

        /**
         * 页面的初始数据
         */
        data: {
                items: [{
                        type: '全部',
                  
                      }, {
                        type: '烟',
                        children: [{
                            title: "南京",
                            imageURL: '/assets/xiangyan/nanjing.jpg',
                            price: '17'
                          },
                          {
                            title: "中华2",
                            imageURL: '/assets/xiangyan/yuxi.jpg',
                            price: '16'
                          },
                          {
                            title: "中华",
                            imageURL: '/assets/xiangyan/zhonghua.jpg',
                            price: '50'
                          }
                          
                        ]
                      }, {
                        type: '酒',
                        children: [{
                          title: '洋河蓝色经典海之蓝42度白酒480ml',
                          imageURL: '/assets/jiushui/yanghe.jpg',
                          price: '149'
                        }, {
                          title: '康师傅柠檬味冰红茶1L',
                          imageURL: '/assets/jiushui/binghongcha.jpg',
                          price: '3.4'
                        }, {
                          title: '百世可乐碳酸饮料',
                          imageURL: '/assets/jiushui/kele.jpg',
                          price: '3'
                        }]
                      }],
                cardItem: [],
                price:0
        },
        onClose(event){

         
                const { position, instance } = event.detail;
                const id = event.currentTarget.id;
                switch (position) {
                  case 'left':
                  case 'cell':
                    instance.close();
                    break;
                  case 'right':

                   this.data.cardItem.splice(id,1);
                   instance.close();
                    break;
                }
               const price =  this.data.cardItem.map(item => item.price*item.num);
               let priceAll = 0;
               for(let v of price){
                       priceAll += v
               }

             this.setData({
                     price:priceAll*100
             })
               this.setData({
                      cardItem:this.data.cardItem 
               });
        },
        onClickLeft(){
                wx.navigateBack({
                  delta: 1,
                })
        },
        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
                let arr = [];
                const detail = JSON.parse(options.detail);
                this.data.items.map(item => {
                        item.children && item.children.map(item2 => {
                            detail.map((con,idx) => {
                                    if(con.name === item2.title){
                                        arr.splice(idx,0,{...item2,num:con.cur});
                                        
                                    }
                            })  
                      })
                })
                const price = arr.map(item => item.price*item.num);
                let priceAll = 0;
                for(let v of price){
                        priceAll += v
                }
              this.setData({
                      cardItem:arr
              });
              this.setData({
                      price:priceAll*100
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

        },

        /**
         * 页面上拉触底事件的处理函数
         */
        onReachBottom: function () {

        },

        /**
         * 用户点击右上角分享
         */
        onShareAppMessage: function () {

        }
})