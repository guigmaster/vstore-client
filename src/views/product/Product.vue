<template>
  <section>
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
  </section>
</template>

<script>
import ProductCard from './product-card/ProductCard'
export default {
  name: 'Product',
  components: {
    ProductCard
  }
}
</script>
