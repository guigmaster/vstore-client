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
            :id="product.pro_id"
            :title="product.pro_name"
            :description="product.pro_description"
            :price="product.pro_price"
            :quantity="product.pro_quantity"
            :image="product.pro_image"
            @delete="onDeleteProduct" />
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
import axios from 'axios'
import Swal from 'sweetalert2'

import ProductCard from '../product-card/ProductCard'
import MyHero from '@/support/components/my-hero/MyHero'
import Fab from '@/support/components/fab/Fab'
import toast from '@/support/helpers/toast'

export default {
  name: 'ProductList',
  components: {
    ProductCard,
    MyHero,
    Fab
  },
  data () {
    return {
      appHost: process.env.VUE_APP_HOST,
      productList: []
    }
  },
  mounted () {
    this.getAllProducts()
  },
  methods: {
    gotoForm () {
      this.$router.push({ name: 'products.new' })
    },
    getAllProducts: async function () {
      try {
        const { data } = await axios.get(`${this.appHost}/products`)
        this.productList = data.products.map(item => {
          return item.pro_image
            ? { ...item, pro_image: `${this.appHost}/${item.pro_image}` }
            : { ...item }
        })
      } catch (error) {
        toast.error('Falha ao obter listagem de produtos', 'Erro!')
      }
    },
    onDeleteProduct: async function (id) {
      const result = await Swal({
        title: 'Atenção?',
        text: 'Deseja realmente excluir esse produto!',
        type: 'warning',
        showCancelButton: true,
        buttonsStyling: true,
        confirmButtonText: 'Sim',
        confirmButtonColor: 'hsl(348, 100%, 61%)',
        cancelButtonText: 'Não',
        reverseButtons: true
      })

      if (result.value) {
        try {
          const { data } = await axios.delete(`${this.appHost}/products/${id}`)
          if (data && data.message) {
            toast.success('Produto removido com sucesso!', 'Sucesso!')
            this.getAllProducts()
          } else {
            toast.error('Falha na exclussão do produto', 'Erro')
          }
        } catch (error) {
          toast.error('Falha na exclussão do produto', 'Erro')
        }
      }
    }
  }
}
</script>
