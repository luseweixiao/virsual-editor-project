<template>
  <div class="pageTag">
    <i>{{index}}</i>
    <input class="inputPagename"
           v-model="name">
    <i>编辑</i>
    <i>操作</i>
  </div>
</template>
  
<script>
export default {
  props: {
    index: Number,
    name: String,
  },
  data () {
    return {

    }
  }
}
</script>
  
<style>
</style>