<template>
  <div>
    <div class="items">
      <div class="item" v-for="(item, index) in items"
      :key="item.id"
      @click="clickItem(item.id,index)"
      >
        <div class="item-pic">
          <img :src="item.pic" alt="">
        </div>
        <div class="item-info">
          <div class="item-name">
            <p>{{item.name}}</p>
            <p>精品玫瑰礼盒:19枝卡罗拉红玫瑰，勿忘我1枝精品玫瑰礼盒:19枝卡罗拉红玫瑰，勿忘我1枝</p>
            <p>年度销售冠军</p>
          </div>
          <div class="item-desc">
            {{item.characteristic?item.characteristic:"暂无描述"}}
            </div>
          <div class="action">
            <span>￥{{item.minPrice}}</span>
            <van-icon name="gouwuche" class-prefix="icon" size="25" @click.stop="addCart(item.id,index)"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Floor',
  props: ['items'],
  methods: {
    clickItem: function (id, index) {
      this.$emit('clickItem', { id, index })
    },
    addCart: function (id, index) {
      this.$emit('addCart', { id, index })
    }
  }
}
</script>

<style lang="scss" scoped>
.items{
  margin: 0 auto;
  width: 98%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .item{
    width: 49%;
    background-color: #fff;
    margin-bottom: 10px;
    border-radius: 10px;
    .item-pic{
      border-radius: 10px 10px 0 0;
      width: 100%;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .item-info{
      flex: 1;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .item-name{
        padding-bottom: 10px;
        p:nth-of-type(1){
          font-weight: 600;
          font-size: 14px;
        }
        p:nth-of-type(2){
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp:2;
          word-break:break-all;
          display:-webkit-box;
          -webkit-box-orient:vertical;
          font-weight: normal;
          font-size: 13px;
        }
        p:nth-of-type(3){
          margin-top: 5px;
          display: inline-block;
          padding: 1px 5px;
          height: 15px;
          border-radius: 5px;
          font-weight: normal;
          font-size: 10px;
          color: #FF734C;
          border: 0.02rem solid #FF734C;
        }
      }
      .item-desc{
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp:2;
        word-break:break-all;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        padding: 2px 0;
        border-top: 1px solid #F3F5F7;
        border-bottom: 1px solid #F3F5F7;
        color: #71797f;
        font-size: 12px;
      }
      .action{
        flex: 1;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        color: #FF734C;
      }
    }
  }
}
</style>
