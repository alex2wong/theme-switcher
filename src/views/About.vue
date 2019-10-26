<template>
  <div class="about">
    <h1>About theme switcher</h1>
    <p>Customize app theme achieved by backend LESS compiler service, global theme styles appended to Head end</p>
  </div>
</template>
<style lang="less">
  @import url('../assets/global.less');

  .about {
    color: @primary-color;
    background-color: @primary;
  }
</style>
