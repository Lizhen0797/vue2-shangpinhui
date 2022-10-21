<template>
  <div>
    <TypeNav /> <ListContainer /> <Recommend /><Rank />
    <Like /><Floor /><Brand />
  </div>
</template>

<script>
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  data() {
    return {}
  },
  mounted() {},
  methods: {},
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
}
</script>

<style lang="less" scoped></style>
