<style lang="scss" src="./Fab.scss" scoped></style>
<template>
  <div class="fab" @click.prevent="onClick">
    <span>+</span>
  </div>
</template>

<script>
export default {
  name: 'Fab',
  methods: {
    onClick () {
      this.$emmit('click')
    }
  }
}
</script>
