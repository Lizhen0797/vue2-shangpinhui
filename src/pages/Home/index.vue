<template>
  <div>
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="floor in floorList"
           :key="floor.id"
           :list="floor" />
    <Brand />
  </div>
</template>

<script>
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import { mapState } from 'vuex'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  data () {
    return {}
  },
  mounted () {
    this.$store.dispatch('getFloorList')
    if (localStorage.getItem("TOKEN")) {
      this.$store.dispatch('getUserInfo')
    }
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
  methods: {},
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
}
</script>

<style lang="less" scoped></style>
