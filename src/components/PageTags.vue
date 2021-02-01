<template>
  <div class="PageTags">
    <button @click="addPage">add page</button>
    <ul v-if="pageNum!=0">
      <li v-for="item in pageTagList"
          :key="item.index">
        <pageTag v-bind:index="item.index"
                 v-bind:name="item.name"
                 v-bind:class="{pageIsActive:item.index==currPageIndex}" />
      </li>
    </ul>
  </div>
</template>

<script>
import PageTag from '@/components/PageTag'
import { mapState } from 'vuex'
export default {
  components: {
    PageTag
  },
  data () {
    return {
      index: 0
    }
  },
  computed:
    mapState(["pageTagList", "pageNum", "currPageIndex"])
  ,
  methods: {
    addPage () {
      var index = ++this.index;
      var pagetag = { index: index, content: "pageTag" + index, name: "pageTag" + index };
      var page = { index: index, content: "page" + index, name: "page" + index };
      this.$store.commit("addPage", { pagetag, page });
      console.log(this.pageNum);
    }
  }
}
</script>
<style  scoped>
.pageIsActive {
  border: 1px solid red;
}
</style>