<template>
  <div class="home">
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
                aspect-ratio="1" class="grey lighten-2" max-width="80" max-height="80"></v-img>

              <!-- <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar> -->
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" lg="3">
          <v-card class="mb-3" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">Info</div>
                <v-list-item-title class="headline mb-1">{{countTotalUser}}</v-list-item-title>
                <v-list-item-subtitle>Jumlah User</v-list-item-subtitle>
              </v-list-item-content>
              <v-img src="https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg"
                lazy-src="https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg"
                aspect-ratio="1" class="grey lighten-2" max-width="80" max-height="80"></v-img>

              <!-- <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar> -->
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="12" sm="!2" lg="3">
          <v-card class="mb-3" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">Info</div>
                <v-list-item-title class="headline mb-1">{{countTotalSupplier}}</v-list-item-title>
                <v-list-item-subtitle>Jumlah Supplier</v-list-item-subtitle>
              </v-list-item-content>

              <v-img
                src="https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-vector-user-young-boy-avatar-icon-png-image_1538408.jpg"
                lazy-src="https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-vector-user-young-boy-avatar-icon-png-image_1538408.jpg"
                aspect-ratio="1" class="grey lighten-2" max-width="80" max-height="80"></v-img>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </GeneralLayout>
  </div>
</template>

<script>
  import GeneralLayout from '@/components/GeneralLayout'
  export default {
    name: 'home',
    data(){
      return{
        products: [],
        users: []
      }
    },
    components: {
      GeneralLayout
    },
    computed:{
      countTotalUser(){
        return this.users.length
      },
      countTotalSupplier(){
        return this.users.filter(res => res.supplier_status==true).length
      },
      countTotalProduct(){
        return this.products.length
      }
    },
    mounted(){
      let db = this.$firebase.firestore()
      let self = this
      
      db.collection('users').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          self.users.push(doc.data())
        })
      })

      db.collection('products').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          self.products.push(doc.data())
        })
      })
    }
  }
</script>
