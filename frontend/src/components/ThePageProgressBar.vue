<template>
  <progress id="pageLoadingBar" />
</template>

<style scoped>
#pageLoadingBar {
  visibility: hidden;
  position: fixed;
  top: 0px;
  border-radius: 0px;
  height: 5px;
}

#pageLoadingBar:indeterminate {
  background: transparent linear-gradient(to right, #1e88e570 30%, transparent 30%) top left/150% 150% no-repeat;
}
</style>