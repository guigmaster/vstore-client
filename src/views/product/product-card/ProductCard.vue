<style lang="scss" src="./ProductCard.scss" scoped></style>

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
          <p class="title is-text-overflow" :title="title">{{ title }}</p>
          <p class="subtitle">{{ price | formatMoney('R$ ') }}</p>
        </div>
      </div>

      <div class="content" v-if="description">
        <p>{{ description | readMore(50, '...') }}</p>
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item has-text-white has-background-danger">Apagar</a>
      <router-link
        :to="{ name: 'products.edit', params: { id: id } }"
        class="card-footer-item has-text-white has-background-info">
        Editar
      </router-link>
    </footer>
  </div>
</template>

<script>
import accounting from 'accounting'

export default {
  name: 'ProductCard',
  props: {
    id: {
      type: [Number, String],
      required: true
    },
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
    },
    readMore (text, length, suffix) {
      return text.substring(0, length) + suffix
    }
  }
}
</script>
