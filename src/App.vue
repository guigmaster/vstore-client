<style lang="scss" src="./styles/main.scss"></style>
<template>
  <div id="app">
    <main-header />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import MainHeader from './support/components/main-header/MainHeader'

export default {
  name: 'app',
  components: {
    MainHeader
  }
}
</script>
