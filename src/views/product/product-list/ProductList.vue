<template>
  <section>
    <my-hero
      title="VStore produtos"
      description="Listagem de produtos" />
    <div class="container">
      <div class="columns is-multiline is-mobile" style="margin-top: 10px;">
        <div class="column is-3-desktop is-4-tablet is-10-mobile is-offset-1-mobile"
          v-for="i in (0, 20)"
          :key="i">
          <product-card
            :title="'produto de número ' + i"
            description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero quia, obcaecati consectetur at corrupti corporis!"
            :price="'10.65'"
            quantity="100" />
        </div>
      </div>
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
  methods: {
    gotoForm () {
      this.$router.push({ name: 'products.new' })
    }
  }
}
</script>
