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
          <b-input v-model="product.pro_price" />
        </p>
      </b-field>

      <b-field label="Descrição">
        <b-input type="textarea" v-model="product.pro_description" />
      </b-field>
      <div class="buttons is-right">
        <a class="button is-success is-large">Salvar</a>
      </div>
    </div>
  </section>
</template>

<script>
import MyHero from '@/support/components/my-hero/MyHero'

export default {
  name: 'ProductForm',
  components: {
    MyHero
  },
  data () {
    return {
      name: 'John Silver',
      product: {
        pro_name: '',
        pro_quantity: '',
        pro_price: '',
        pro_description: ''
      }
    }
  }
}
</script>
