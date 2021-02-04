<template>
  <div class="contextmenu">
    <ul>
      <li>删除</li>
      <li>置于顶层</li>
      <li>置于底层</li>
      <li>上移一层</li>
      <li>下移一层</li>
      <li>锁定大小和位置</li>
      <li>解除大小和位置锁定</li>
    </ul>
  </div>
</template>
<style scoped>
.contextmenu {
  width: 70px;
  height: 100px;
  background-color: #fff;
  overflow: hidden;
  text-align: center;
  box-shadow: 2px 2px 2px rgba(122, 122, 122, 0.3);
}
.contextmenu ul {
  list-style: none;
}
</style>