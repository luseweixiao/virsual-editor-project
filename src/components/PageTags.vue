<template>
  <div class="PageTags"
       v-on:addPage="handleAddPage">
    <button @click="addPage1">add page</button>
    <ul v-if="pageList.lenght!=0">
      <li v-for="item in pageList"
          :key="item.index">
        <pageTag v-bind:index="item.index"
                 v-bind:name="item.name" />
      </li>
    </ul>
  </div>
</template>

<script>
import PageTag from '@/components/PageTag'
import { mapState } from 'vuex'
import Page from '@/components/Page'
export default {
  components: {
    PageTag
  },
  data () {
    return {
      index: 0
    }
  },
  computed: {
    ...mapState(["pageList", "currPageIndex"])
  },
  methods: {
    addPage1 () {
      var index = this.pageList.length + 1;
      var page = new Page("页面" + index, index - 1, []);
      this.$store.commit("addPage", page);
    }
    ,
    handleAddPage () {
      console.log("handleAddPage")
      var index = this.pageList.length + 1;
      var page = new Page("页面" + index, index - 1, []);
      this.$store.commit("addPage", page);
    }
  }
}
</script>
<style  scoped>
</style>