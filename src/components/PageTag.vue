<template>
  <div class="pageTag">
    <span class="pagetag-index">{{index+1}}</span>
    <input class="pagetag-input"
           v-model.lazy="pageName"
           @blur="changePageInfo">
    <ul class="pagetag-icons">
      <li class="pagetag-icon edit">
        <!-- <span @click="changeEditModel"><img src="@/assets/edit.png" /></span> -->
        <i class="el-icon-edit icon-style"
           @click="changeEditModel"></i>
      </li>
      <li class="pagetag-icon icon-pulldown"
          @click="changeToolbarMode"
          @blur="blur">
        <i class="el-icon-arrow-down icon-style"></i>
        <!-- <span><img src="@/assets/pulldown.png" /></span> -->
        <ul class="toolbar"
            :class="{slideup:!isToolBarShow,slidedown:isToolBarShow}">
          <li @click="addPage">新增</li>
          <li @click="copyPage">复制</li>
          <li @click="deletePage">删除</li>
        </ul>
      </li>
    </ul>
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
      isToolBarShow: false,
      pageName: this.name,
      // toorbarId: "toorbar" + this.name + this.index
    }
  },
  components: {
    // Toolbar
  },
  methods: {
    blur () {
      console.log("blur")
    },
    changeToolbarMode () {
      this.isToolBarShow = !this.isToolBarShow;
    },
    changeEditModel () {
      this.$store.commit("changeCurrPageIndex", this.index);
      this.$store.commit("changeCurrComponentIndex", 0);
      this.$store.commit("changeEditMode", true);
    },

    changePageInfo () {
      console.log(this.pageName)
      this.$store.commit("changePageInfo", { name: this.pageName, index: this.index });
    },
    addPage () {
      console.log("add")
      // var index = this.pageList.length + 1;
      // var page = new Page("页面" + index, index - 1, []);
      // this.$store.commit("addPage", page);
      // this.$emit("addPage");
    },
    copyPage () {
      console.log("copy")
    },
    deletePage () {
      console.log("delete")
    },
  }
}
</script>
  
<style scope>
.pageTag {
  background-color: rgb(228, 222, 222);
  border-top: 1px solid rgba(121, 121, 121, 1);
  border-bottom: 1px solid rgba(121, 121, 121, 1);
  margin: 5px 0;
  position: relative;
  height: 24px;
}
.pageTag span {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
}
.pagetag-index {
  position: absolute;
  left: 1px;
  top: 1px;

  border-radius: 50%;
  background-color: #fff;
  border: 1px solid #555;
}
.pagetag-input {
  position: absolute;
  left: 23px;
  right: 0px;
  width: 138px;
  height: 20px;
  border: none;
  outline: none;
}
/* icons */
ul.pagetag-icons {
  list-style: none;
  width: 40px;
  height: 20px;
  position: absolute;
  /* z-index: 12; */
  top: 0;
  right: 0;
  border: none;
}
ul.pagetag-icons li {
  display: inline-block;
  border: none;
  outline: none;
}
.icon-style {
  color: rgb(22, 155, 213);
}
/* .pagetag-icon img {
  width: 20px;
  height: 18px;
} */
.pagetag-icon :hover {
  cursor: pointer;
  /* border: 1px solid #1296db; */
}
.IsFocus {
  border: 1px solid red;
}
/* pulldown toolbar */
.pulldow {
  position: relative;
}
ul.toolbar {
  position: absolute;
  top: 21px;
  right: 0px;
  left: 4px;
  z-index: 1000;
  background-color: #fff;
  opacity: 1;
  list-style: none;
  font-weight: 400;
  font-size: 12px;
  /* background-color: rgba(215, 215, 215, 1); */
  border: 1px solid rgba(121, 121, 121, 1);
  padding: 1px;
}
ul.toolbar li {
  padding: 2px;
}
ul.toolbar li:hover {
  background-color: antiquewhite;
  cursor: pointer;
}
.slideup {
  display: none;
}
.slidedown {
  display: block;
}
</style>