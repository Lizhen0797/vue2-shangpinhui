<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x"
                v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">x</i>
            </li>
            <li class="with-x"
                v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeKeyword">x</i>
            </li>

            <li class="with-x"
                v-if="searchParams.trademark">
              {{ searchParams.trademark.split(':')[1] }}
              <i @click="removeTrademark">x</i>
            </li>

            {{
            searchParams.props
            }}
            <li class="with-x"
                v-for="(prop, index) in searchParams.props"
                :key="index">
              {{ prop.split(':')[1] }}
              <i @click="removeAttr(index)">x</i>
            </li>
          </ul>
        </div>

        <SearchSelector @trademarkInfo="trademarkInfo"
                        @attrInfo="attrInfo" />
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 价格结构 排序的结构-->
              <ul class="sui-nav">
                <li :class="{active: isOne }"
                    @click="changeOrder('1')">
                  <a>综合<span v-show="isOne"
                          class="iconfont"
                          :class="orderClass"></span></a>
                </li>
                <li :class="{active: isTwo }"
                    @click="changeOrder('2')">
                  <a>价格<span v-show="isTwo"
                          class="iconfont"
                          :class="orderClass"></span></a>
                </li>
                <!-- <li>
                  <button @click="searchParams.order = '1:desc'">1:desc</button>
                  <button @click="searchParams.order = '1:asc'">1:asc</button>

                  <button @click="searchParams.order = '2:desc'">2:desc</button>
                  <button @click="searchParams.order = '2:asc'">2:asc</button>
                </li> -->
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5"
                  v-for="good in goodsList"
                  :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img :src="
                                 good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank"
                       href="item.html"
                       title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{ good.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html"
                       target="_blank"
                       class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);"
                       class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo="searchParams.pageNo"
                      :pageSize="searchParams.pageSize"
                      :total="total"
                      :continues="5"
                      @getPageNo="getPageNo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector'
import { mapGetters, mapState } from 'vuex'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Search',
  components: {
    SearchSelector,
  },
  data () {
    return {
      searchParams: {
        //一级分类的id
        category1Id: '',
        //二级分类id
        category2Id: '',
        //三级分类id
        category3Id: '',
        //分类名字
        categoryName: '',
        // 关键字
        keyword: '',
        // 排序
        //排序：初始状态应该是综合|降序
        order: '1:desc',
        //分页器用的：代表的是当前是第几页
        pageNo: 1,
        //代表的是每一个展示数据个数
        pageSize: 3,
        //平台售卖属性操作带的参数
        props: [],
        // 品牌
        trademark: '',
      },
    }
  },
  methods: {
    getData () {
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    removeCategoryName () {
      console.log(this.$route.params)
      this.searchParams.categoryName = undefined
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      /* 地址栏也需要需改：进行路由跳转（现在的路由跳转只是跳转到自己这里）
      严谨：本意是删除query，如果路径当中东现params不应该删除，路由跳转的时候应该带着 */
      if (this.$route.params) {
        this.$router.push({ name: 'search', params: this.$route.params })
      }
    },
    removeKeyword () {
      this.searchParams.keyword = undefined
      /* 地址栏也需要需改：进行路由跳转（现在的路由跳转只是跳转到自己这里）
      严谨：本意是删除params，如果路径当中东现query不应该删除，路由跳转的时候应该带着 */
      if (this.$route.query) {
        this.$router.push({ name: 'search', query: this.$route.query })
      }
      this.$bus.$emit('clearKeyword')
    },
    trademarkInfo (trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      this.getData()
    },
    attrInfo (attr, attrValue) {
      let prop = `${attr.attrId}:${attrValue}:${attr.attrName}`
      if (this.searchParams.props.indexOf(prop) === -1) {
        this.searchParams.props.push(prop)
        this.getData()
      }
    },
    removeAttr (index) {
      this.searchParams.props.splice(index, 1)
      this.getData()
    },
    removeTrademark () {
      this.searchParams.trademark = undefined
    },
    changeOrder (flag) {
      let orginFlag = this.searchParams.order.split(":")[0]; //初始状态的order是1还是2
      let orginSort = this.searchParams.order.split(":")[1]; //初始状态的order是desc还是asc
      let newOrder = ""; //准备一个新的order

      if (flag == orginFlag) {
        //点击综合的话flag就是1初始状态的也是1进入循环
        newOrder = `${orginFlag}:${orginSort == "desc" ? "asc" : "desc"}`; //点击如果是升序就变成降序,如果是将降序就变成升序
      } else {
        newOrder = `${flag}:${"desc"}`; //点击价格后flag变成2了，直接改为desc,originflag也变成2了，所以还是会走if里面的判断
      }
      this.searchParams.order = newOrder; //将新的order赋予searchParams
      this.getData();
    },
    getPageNo (pageNo) {
      this.searchParams.pageNo = pageNo
      this.getData()
    }
  },
  computed: {
    ...mapGetters(['goodsList', 'trademarkList', 'attrsList']),
    isOne () {
      return this.searchParams.order.includes("1");
    },
    isTwo () {
      return this.searchParams.order.includes("2");
    },
    orderClass () {
      const test = {
        'icon-UP': this.searchParams.order.includes("asc"),
        'icon-DOWN': this.searchParams.order.includes("desc")
      }
      return test
    },
    ...mapState({
      total: state => state.search.searchList.total
    })
  },
  watch: {
    // 监听路由的信息是否发生变化，如果发生变化，再次发起请求
    $route () {
      // 再次发请求之前整理带给服务器参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      //再次发起ajax请求
      this.getData()
      // 每一次请求完毕，应该把相应的1、2、3级分类的id置空的，让他接受下一次的相应1、2、3id
      this.searchParams.categoryId1 = ''
      this.searchParams.categoryId2 = ''
      this.searchParams.categoryId3 = ''
    },
  },
  beforeMount () {
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  mounted () {
    this.getData()
  },
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .selector {
      border: 1px solid #ddd;
      margin-bottom: 5px;
      overflow: hidden;

      .logo {
        border-top: 0;
        margin: 0;
        position: relative;
        overflow: hidden;

        .key {
          padding-bottom: 87px !important;
        }
      }

      .type-wrap {
        margin: 0;
        position: relative;
        border-top: 1px solid #ddd;
        overflow: hidden;

        .key {
          width: 100px;
          background: #f1f1f1;
          line-height: 26px;
          text-align: right;
          padding: 10px 10px 0 15px;
          float: left;
        }

        .value {
          overflow: hidden;
          padding: 10px 0 0 15px;
          color: #333;
          margin-left: 120px;
          padding-right: 90px;

          .logo-list {
            li {
              float: left;
              border: 1px solid #e4e4e4;
              margin: -1px -1px 0 0;
              width: 105px;
              height: 52px;
              text-align: center;
              line-height: 52px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-weight: 700;
              color: #e1251b;
              font-style: italic;
              font-size: 14px;

              img {
                max-width: 100%;
                vertical-align: middle;
              }
            }
          }

          .type-list {
            li {
              float: left;
              display: block;
              margin-right: 30px;
              line-height: 26px;

              a {
                text-decoration: none;
                color: #666;
              }
            }
          }
        }

        .ext {
          position: absolute;
          top: 10px;
          right: 10px;

          .sui-btn {
            display: inline-block;
            padding: 2px 14px;
            box-sizing: border-box;
            margin-bottom: 0;
            font-size: 12px;
            line-height: 18px;
            text-align: center;
            vertical-align: middle;
            cursor: pointer;
            padding: 0 10px;
            background: #fff;
            border: 1px solid #d5d5d5;
          }

          a {
            color: #666;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }

    .hot-sale {
      margin-bottom: 5px;
      border: 1px solid #ddd;

      .title {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #333;
        margin: 0;
        padding: 5px 0 5px 15px;
      }

      .hot-list {
        padding: 15px;

        ul {
          display: flex;

          li {
            width: 25%;
            height: 100%;

            .list-wrap {
              .p-img,
              .price,
              .attr,
              .commit {
                padding-left: 15px;
              }

              .p-img {
                img {
                  max-width: 100%;
                  vertical-align: middle;
                  border: 0;
                }
              }

              .attr {
                width: 85%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
              }

              .price {
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .commit {
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
              }
            }
          }
        }
      }
    }
  }
}
</style>
