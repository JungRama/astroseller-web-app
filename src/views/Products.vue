<template>
    <div class="layout-start">
    <GeneralLayout>

      <v-row>
        <v-col cols="12" sm="12" lg="3">
          <v-card class="mb-3" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">Info</div>
                <v-list-item-title class="headline mb-1">{{countTotalProduct}}</v-list-item-title>
                <v-list-item-subtitle>Jumlah Product</v-list-item-subtitle>
              </v-list-item-content>
              <v-img
                src="https://png.pngtree.com/png-vector/20190115/ourlarge/pngtree-vector-package-icon-png-image_319833.jpg"
                lazy-src="https://png.pngtree.com/png-vector/20190115/ourlarge/pngtree-vector-package-icon-png-image_319833.jpg"
                aspect-ratio="1"
                class="grey lighten-2"
                max-width="80"
                max-height="80"
                ></v-img>

              <!-- <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar> -->
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>

      <v-skeleton-loader
        ref="skeleton"
        :boilerplate="false"
        :type="'table'"
        :tile="false"
        v-if="loading"
        class="mx-auto"
      ></v-skeleton-loader>

      <v-data-table :headers="headers" :items="products" :items-per-page="10" class="elevation-1" v-if="!loading">

        <template v-slot:item.action="{ item }">
          <v-icon class="mr-2" @click="detailItem(item.id)">
            search
          </v-icon>
        </template>

        <template v-slot:item.product_image="{ item }">
            <v-img
            :src="getImage(item.product_image)"
            :lazy-src="getImage(item.product_image)"
            aspect-ratio="1"
            class="grey lighten-2"
            max-width="80"
            max-height="80"
            ></v-img>
        </template>

        <template v-slot:item.product_price="{ item }">
            {{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'IDR' }).format(item.product_price)}}
        </template>

      </v-data-table>
    </GeneralLayout>
  </div>
</template>

<script>
import GeneralLayout from '@/components/GeneralLayout'
export default {
  name: 'home',
  components: {
    GeneralLayout
  },
  data(){
      return{
        loading: true,
        headers: [
          { text: 'Product Name', value: 'product_name' },
          { text: 'Product Image', value: 'product_image' },
          { text: 'Product Price', value: 'product_price' },
          { text: 'Action', value: 'action' },
        ],
        products: []
      }
  },
  methods:{
    detailItem(item){
      this.$router.push({ name: 'products-manage', params: { id: item } })
    },
    getImage(item) {
      let image
      if(item==null){
        image = require('@/assets/placeholder_product.jpg')
      }else{
        image = item
      }
      return image
    }
  },
  computed:{
    countTotalProduct(){
      return this.products.length
    }
  },
  mounted(){
    let db = this.$firebase.firestore()
    let self = this
    db.collection('products').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           this.loading = false
           let productData = {
               id: doc.id, 
               ...doc.data()
           }
           self.products.push(productData)
        })
    })
  }
}
</script>