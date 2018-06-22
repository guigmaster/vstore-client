<template>
  <section>
    <my-hero
      title="VStore produtos"
      description="Listagem de produtos" />
    <div class="container">
      <div class="columns is-multiline is-mobile"
        v-if="productList && productList.length > 0"
        style="margin-top: 10px;">
        <div class="column is-3-desktop is-4-tablet is-10-mobile is-offset-1-mobile"
          v-for="(product, i) in productList"
          :key="i">
          <product-card
            :title="product.pro_name"
            :description="product.pro_description"
            :price="product.pro_price"
            :quantity="product.pro_quantity"
            :image="product.pro_image" />
        </div>
      </div>
      <b-notification
        v-else
        type="is-warning"
        :closable="false"
        style="margin-top: 20px">
        <strong>Nenhum produto encontrado!</strong>
      </b-notification>
    </div>
    <fab @click="gotoForm"/>
  </section>
</template>

<script>
import ProductCard from '../product-card/ProductCard'
import MyHero from '@/support/components/my-hero/MyHero'
import Fab from '@/support/components/fab/Fab'

export default {
  name: 'ProductList',
  components: {
    ProductCard,
    MyHero,
    Fab
  },
  data () {
    return {
      productList: []
    }
  },
  methods: {
    gotoForm () {
      this.$router.push({ name: 'products.new' })
    }
  }
}
</script>
