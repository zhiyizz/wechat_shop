// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    show: true,
    navItems: [],
    imageURL: '/assets/icon1.jpg',
    productItems: [],
    shoppingcar: [],
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
        price: '3.5'
      }]
    }],
    priceAll:0
  },
  // 事件处理函数
  showPopup() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  onChange(event) {
    let items = this.data.shoppingcar;
    const idx = items.findIndex(i => i.name === event.currentTarget.dataset.name)
    idx < 0 ? items.push({
      name: event.currentTarget.dataset.name,
      cur: event.detail
    }) : items.splice(idx, 1, {
      name: event.currentTarget.dataset.name,
      cur: event.detail
    })
    const removeItem = items.findIndex(i => i.cur === 0);
    if(removeItem >= 0) {
      items.splice(idx, 1)
    }
    // const itemsCur = items.map(item => item.cur);
    const price = items.map(item => item.cur);
     let itemsCurAll = 0;
    //  itemsCur.map(item =>itemsCurAll+item);
     for(let i of price){
      itemsCurAll +=  i
     }

    this.setData({
      shoppingcar: items,
      priceAll:itemsCurAll
    });
  
  },
  onClickButton(){
    //跳转
    wx.navigateTo({
       url:'../order/index?detail='+JSON.stringify(this.data.shoppingcar)
    })
  },
  onChangeSlide(e){
      let idx = e.detail;
      if(idx === 0){
        //全部产品
        const product = this.data.items.map(item => {
          if (item.children) {
            return item.children;
          }
        });
            //产品去空
        const filter = product.filter((e) => {
          return e
        });
        const arr = [];
        filter.map(item => {
          item.map(item2 =>  arr.push(item2))
        })
    
        this.setData({
          productItems: arr
        });
      }else{
        //单选品类
        this.data.items.map((item,index) => {
          if(index === idx){
            this.setData({
              productItems:item.children
            })
          }
      })
      }
  },
  onLoad() {
    const data = wx.request({
      url: 'http://47.101.149.59:3000/queryAll',
      success(res){
        console.log(res);
      }
    })
    //导航
    const nav = this.data.items.map(item => item.type);
    this.setData({
      navItems: nav
    });
    //产品列表
    const product = this.data.items.map(item =>  item.children);
    //产品去空
    const filter = product.filter((e) => {
      return e
    });
    const arr = [];
    //二维数组转换一维
    filter.map(item => {
      item.map(item2 =>  arr.push(item2))
    });

    this.setData({
      productItems: arr
    });
  
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})