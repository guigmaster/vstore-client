<template>
  <section>
    <my-hero title="Cadastro de Produtos" />
    <div class="container is-fluid" style="margin-top: 20px">
      <b-field label="Nome">
        <b-input v-model="product.pro_name" />
      </b-field>

      <b-field label="Quantidade">
        <b-input v-model="product.pro_quantity" />
      </b-field>

      <b-field label="Preço"></b-field>
      <b-field>
        <p class="control">
          <span class="button is-static">R$ </span>
        </p>
        <p class="control is-expanded">
          <money class="input" v-model="product.pro_price" v-bind="money" />
        </p>
      </b-field>

      <b-field label="Descrição">
        <b-input type="textarea" v-model="product.pro_description" />
      </b-field>
      <div class="buttons is-right">
        <router-link class="button is-large"
          :to="{ name: 'products.list' }">Cancelar</router-link>
        <a class="button is-success is-large">Salvar</a>
      </div>
    </div>
  </section>
</template>

<script>
import { Money } from 'v-money'
import MyHero from '@/support/components/my-hero/MyHero'

export default {
  name: 'ProductForm',
  components: {
    MyHero,
    Money
  },
  data () {
    return {
      name: 'John Silver',
      money: {
        decimal: ',',
        thousands: '.',
        precision: 2,
        masked: false
      },
      product: {
        pro_name: '',
        pro_quantity: '',
        pro_price: 0.00,
        pro_description: ''
      }
    }
  }
}
</script>
