<template>
  <section>
    <my-hero title="Cadastro de Produtos" />
    <form class="container is-fluid"
      style="margin-top: 20px"
      @submit.prevent="onSubmit">
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
        <button class="button is-large is-success"
          :disabled="$v.$invalid">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script>
import { Money } from 'v-money'
import { get } from 'lodash'
import { required, integer, decimal } from 'vuelidate/lib/validators'
import axios from 'axios'
import toast from '@/support/helpers/toast'
import MyHero from '@/support/components/my-hero/MyHero'

export default {
  name: 'ProductForm',
  components: {
    MyHero,
    Money
  },
  data () {
    return {
      appHost: process.env.VUE_APP_HOST,
      money: {
        decimal: ',',
        thousands: '.',
        precision: 2,
        masked: false
      },
      submitStatus: null,
      product: {
        pro_name: '',
        pro_quantity: '',
        pro_price: 0.00,
        pro_description: '',
        pro_image: null
      },
      nameRules: {
        required: 'Campo nome é obrigatório'
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
        required
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
  mounted () {
    if (this.$route.name === 'products.edit') {
      this.getProductData(this.$route.params.id)
    }
  },
  methods: {
    getProductData: async function (id) {
      try {
        const { data } = await axios.get(`${this.appHost}/products/${id}`)
        if (data && !data.product) {
          toast.error('Falha ao obter dados do produto', 'Erro')
        } else {
          this.product = Object.assign({}, data.product)
        }
      } catch (error) {
        toast.error('Falha ao obter dados do produto', 'Erro')
      }
    },
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
    },
    onSubmit: async function () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        let product = { ...this.product }
        product['pro_price'] = product['pro_price'].toFixed(2)

        const payload = new FormData()

        Object.keys(product).forEach(key => {
          if (key === 'pro_image' && product[key]) {
            payload.append(key, product[key][0])
          } else {
            payload.append(key, product[key])
          }
        })

        try {
          const response = await axios.post(`${this.appHost}/products`, payload, { headers: { 'Content-Type': 'multipart/form-data' } })
          if (response.data) {
            toast.success('Produto inserido com sucesso!', 'Sucesso!')
            this.$router.push({ name: 'products.list' })
          }
        } catch (error) {
          toast.error('Falha ao cadastrar produto!', 'Error!')
        }
      }
    }
  }
}
</script>
