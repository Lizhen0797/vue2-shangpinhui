<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">

        <ul class="cart-list"
            v-for="cartInfo in cartInfoList"
            :key="cartInfo.id">
          <li class="cart-list-con1">
            <input type="checkbox"
                   name="chk_list"
                   :checked="cartInfo.isChecked===1"
                   @change="updateShopCartCheckedById(cartInfo, $event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl">
            <div class="item-msg">{{cartInfo.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cartInfo.cartPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)"
               class="mins"
               @click="handler('minus', -1, cartInfo)">-</a>
            <input autocomplete="off"
                   type="text"
                   class="itxt"
                   :value="cartInfo.skuNum"
                   @change="handler('change', $event.target.value * 1, cartInfo)">
            <a href="javascript:void(0)"
               class="plus"
               @click="handler('add', 1, cartInfo )">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cartInfo.skuNum * cartInfo.cartPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none"
               class="sindelet"
               @click="deleteShopCartListById(cartInfo)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll"
               type="checkbox"
               :checked="isAllChecked&&cartInfoList.length>0"
               @change="updateAllShopCartChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedShopCart">删除选中的商品</a>
        <a href="javascript:">移到我的关注</a>
        <a href="javascript:">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>123</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn"
                       to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
  

<script>
import { mapGetters } from 'vuex';
import throttle from 'lodash/throttle'

export default {
  name: 'ShopCart',

  data () {
    return {

    };
  },

  mounted () {
    this.getData()
  },
  computed: {
    ...mapGetters(['cartList']),
    cartInfoList () {
      return this.cartList.cartInfoList || []
    },
    totalPrice () {
      let sum = 0
      this.cartInfoList.forEach(item => {
        sum += item.cartPrice * parseInt(item.skuNum)
      })
      return sum
    },
    isAllChecked () {
      //遍历数组里面原理，只要全部元素ischecked属性都为1===>真true
      //只要有一个不是1======>假falseI
      // this.cartInfoList.forEach(item => {
      //   if (item.isChecked === 0) {
      //     return false
      //   }
      // })
      // return true
      return this.cartInfoList.every((item) => item.isChecked === 1);
    },
  },

  methods: {
    getData () {
      this.$store.dispatch("getShopCartList")
    },
    handler: throttle(async function (type, disNum, cartInfo) {
      switch (type) {
        case 'add':
          disNum = 1
          break
        case "minus":
          disNum = cartInfo.skuNum > 1 ? -1 : 0
          break
        case 'change':
          if (isNaN() || disNum < 1) {
            disNum = 0
          } else {
            disNum = parseInt(disNum) - cartInfo
          }
          break
      }
      try {
        await this.$store.dispatch('addOrUpdateShopCart', { skuId: cartInfo.skuId, skuNum: disNum })
        this.getData()
      } catch (err) {
        console.log(err)
      }
    }, 1000),
    async deleteShopCartListById (cartInfo) {
      try {
        await this.$store.dispatch('deleteShopCartListById', cartInfo.skuId)
        this.getData()
      } catch (err) {
        console.log(err.message)
      }
    },
    updateShopCartCheckedById: throttle(async function (cartInfo, e) {
      try {
        let isChecked = e.target.checked ? 1 : 0
        await this.$store.dispatch('updateShopCartCheckedById', { skuId: cartInfo.skuId, isChecked: isChecked })
        this.getData()
      } catch (err) {
        console.log(err.message)
      }
    }),
    async deleteAllCheckedShopCart () {
      try {
        await this.$store.dispatch('deleteAllCheckedShopCart')
        this.getData()
      } catch (err) {
        console.log(err.message)
      }
    },
    async updateAllShopCartChecked (e) {
      try {
        let isChecked = e.target.checked ? 1 : 0
        await this.$store.dispatch('updateAllShopCartChecked', isChecked)
        this.getData()
      } catch (err) {
        console.log(err.message)
      }
    }
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 15%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 35%;
      }

      .cart-th3 {
        width: 10%;
      }
      .cart-th4 {
        width: 17%;
      }
      .cart-th5 {
        width: 10%;
      }
      .cart-th6 {
        width: 13%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .item-txt {
          text-align: center;
        }
      }

      .cart-list-con4 {
        width: 10%;
      }

      .cart-list-con5 {
        width: 17%;

        .mins {
          border: 1px solid #ddd;
          border-right: 0;
          float: left;
          color: #666;
          width: 6px;
          text-align: center;
          padding: 8px;
        }

        input {
          border: 1px solid #ddd;
          width: 40px;
          height: 33px;
          float: left;
          text-align: center;
          font-size: 14px;
        }

        .plus {
          border: 1px solid #ddd;
          border-left: 0;
          float: left;
          color: #666;
          width: 6px;
          text-align: center;
          padding: 8px;
        }
      }

      .cart-list-con6 {
        width: 10%;

        .sum {
          font-size: 16px;
        }
      }

      .cart-list-con7 {
        width: 13%;

        a {
          color: #666;
        }
      }
    }
  }
}

.cart-tool {
  overflow: hidden;
  border: 1px solid #ddd;

  .select-all {
    padding: 10px;
    overflow: hidden;
    float: left;

    span {
      vertical-align: middle;
    }

    input {
      vertical-align: middle;
    }
  }

  .option {
    padding: 10px;
    overflow: hidden;
    float: left;

    a {
      float: left;
      padding: 0 10px;
      color: #666;
    }
  }

  .money-box {
    float: right;

    .chosed {
      line-height: 26px;
      float: left;
      padding: 0 10px;
    }

    .sumprice {
      width: 200px;
      line-height: 22px;
      float: left;
      padding: 0 10px;

      .summoney {
        color: #c81623;
        font-size: 16px;
      }
    }

    .sumbtn {
      float: right;

      a {
        display: block;
        position: relative;
        width: 96px;
        height: 52px;
        line-height: 52px;
        color: #fff;
        text-align: center;
        font-size: 18px;
        font-family: "Microsoft YaHei";
        background: #e1251b;
        overflow: hidden;
      }
    }
  }
}
</style>