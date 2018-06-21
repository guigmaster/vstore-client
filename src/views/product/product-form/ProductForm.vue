<template>
  <section>
    <my-hero title="Cadastro de Produtos" />
    <form class="container is-fluid" style="margin-top: 20px" enctype="multipart/form-data">
      <b-field label="Nome">
        <b-input v-model="$v['product.pro_name'].$model" />
      </b-field>

      <b-field label="Quantidade">
        <b-input v-model="$v['product.pro_quantity'].$model" />
      </b-field>

      <b-field label="Preço"></b-field>
      <b-field>
        <p class="control">
          <span class="button is-static">R$ </span>
        </p>
        <p class="control is-expanded">
          <money class="input" v-model="$v['product.pro_price'].$model" v-bind="money" />
        </p>
      </b-field>

      <b-field label="Descrição">
        <b-input type="textarea" v-model="product.pro_description" />
      </b-field>

      <b-field class="file">
        <b-upload v-model="product.pro_image">
          <a class="button is-primary">
            <b-icon icon="upload"></b-icon>
            <span>Selecione uma imagem</span>
          </a>
        </b-upload>
        <span class="file-name"
          v-if="product.pro_image && product.pro_image.length">
          {{ product.pro_image[0].name }}
        </span>
      </b-field>

      <div class="buttons is-right">
        <router-link class="button is-large"
          :to="{ name: 'products.list' }">Cancelar</router-link>
        <a class="button is-large is-success"
          :disabled="$v.$invalid">Salvar</a>
      </div>
    </form>
  </section>
</template>

<script>
import { Money } from 'v-money'
import { required, integer, decimal, alphaNum } from 'vuelidate/lib/validators'
import MyHero from '@/support/components/my-hero/MyHero'

export default {
  name: 'ProductForm',
  components: {
    MyHero,
    Money
  },
  data () {
    return {
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
        pro_description: '',
        pro_image: null
      }
    }
  },
  validations: {
    'product.pro_name': {
      required,
      alphaNum
    },
    'product.pro_quantity': {
      required,
      integer
    },
    'product.pro_price': {
      required,
      decimal
    }
  }
}
</script>
