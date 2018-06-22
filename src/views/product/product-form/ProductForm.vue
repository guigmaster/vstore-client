<template>
  <section>
    <my-hero title="Cadastro de Produtos" />
    <form class="container is-fluid" style="margin-top: 20px" enctype="multipart/form-data">
      <b-field label="Nome"
        :type="getValidationType('product.pro_name')"
        :message="getMessagesForRules('product.pro_name', nameRules)">
        <b-input v-model="$v.product.pro_name.$model" />
      </b-field>

      <b-field label="Quantidade"
        :type="getValidationType('product.pro_quantity')"
        :message="getMessagesForRules('product.pro_quantity', quantityRules)">
        <b-input v-model="$v.product.pro_quantity.$model" />
      </b-field>

      <b-field label="Preço" :type="getValidationType('product.pro_price')" />
      <b-field
        :type="getValidationType('product.pro_price')"
        :message="getMessagesForRules('product.pro_price', priceRules)">
        <p class="control">
          <span class="button is-static">R$ </span>
        </p>
        <p class="control is-expanded">
          <money class="input" v-model="$v.product.pro_price.$model" v-bind="money" />
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
import { get } from 'lodash'
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
      },
      nameRules: {
        required: 'Campo nome é obrigatório',
        alphaNum: 'Somente são permitidos números e letras'
      },
      quantityRules: {
        required: 'Campo quantidade é obrigatório',
        integer: 'Somente números são permitidos'
      },
      priceRules: {
        required: 'Campo preço é obrigatório',
        decimal: 'Apenas valores decimais são permitidos'
      }
    }
  },
  validations: {
    product: {
      pro_name: {
        required,
        alphaNum
      },
      pro_quantity: {
        required,
        integer
      },
      pro_price: {
        required,
        decimal
      }
    }
  },
  methods: {
    getValidationType (key) {
      const field = get(this.$v, key)
      return (field.$dirty && field.$invalid)
        ? 'is-danger'
        : null
    },
    getMessagesForRules (key, rules) {
      const field = get(this.$v, key)
      return Object.keys(rules).map(rule => {
        if (field.$dirty && field.$invalid && !field[rule]) {
          return rules[rule]
        }
      })
    }
  }
}
</script>
