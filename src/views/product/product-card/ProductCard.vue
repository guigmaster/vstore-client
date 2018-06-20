<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="image | defaultImage" :alt="title" />
      </figure>
    </div>

    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title">{{ title }}</p>
          <p class="subtitle">{{ price | formatMoney('R$ ') }}</p>
        </div>
      </div>

      <div class="content">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script>
import accounting from 'accounting'

export default {
  name: 'ProductCard',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      erquired: false
    },
    price: {
      type: [String, Number],
      required: true
    },
    quantity: {
      type: [String, Number],
      required: true
    },
    image: {
      type: String,
      required: false
    }
  },
  filters: {
    defaultImage (image) {
      return image || 'http://via.placeholder.com/500x380?text=sem%20image'
    },
    formatMoney (value, currency) {
      return accounting.formatMoney(value, currency, 2, '.', ',')
    }
  }
}
</script>
