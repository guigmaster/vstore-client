import Product from '@/views/product/Product'
import ProductList from '@/views/product/product-list/ProductList'
import ProductForm from '@/views/product/product-form/ProductForm'

export default [
  {
    path: '/',
    redirect: { name: 'products.index' }
  },
  {
    name: 'products.index',
    path: '/products',
    component: Product,
    children: [
      {
        name: 'products.list',
        path: '/',
        component: ProductList
      },
      {
        name: 'products.new',
        path: 'create',
        component: ProductForm
      }
    ]
  }
]
