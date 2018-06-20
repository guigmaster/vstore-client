<style lang="scss" src="./styles/main.scss"></style>
<template>
  <div id="app">
    <main-header />
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
