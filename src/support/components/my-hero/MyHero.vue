<template>
  <section class="hero" :class="{
    'is-bold': isBold
  }">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">{{ title }}</h1>
        <h2 class="subtitle" v-if="description">{{ description }}</h2>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MyHero',
  props: {
    title: {
      type: String,
      required: false
    },
    description: String,
    isBold: Boolean,
    color: {
      type: String,
      default: 'primary',
      validator: (value) => {
        return [
          'primary',
          'info',
          'success',
          'warning',
          'danger',
          'light',
          'dark'
        ].indexOf(value) !== -1
      }
    }
  }
}
</script>
