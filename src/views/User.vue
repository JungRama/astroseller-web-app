<template>
    <div class="layout-start">
    <GeneralLayout>
      
      <v-row>
        <v-col cols="12" sm="12" lg="3">
          <v-card class="mb-3" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">Info</div>
                <v-list-item-title class="headline mb-1">{{countTotalUser}}</v-list-item-title>
                <v-list-item-subtitle>Jumlah User</v-list-item-subtitle>
              </v-list-item-content>
              <v-img
                src="https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg"
                lazy-src="https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg"
                aspect-ratio="1"
                class="grey lighten-2"
                max-width="80"
                max-height="80"
                ></v-img>

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
                aspect-ratio="1"
                class="grey lighten-2"
                max-width="80"
                max-height="80"
                ></v-img>
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

      <div  v-if="!loading">
        <v-btn @click="toAdd" color="success" dark class="mb-4">Add User</v-btn>

      <v-data-table :headers="headers" :items="users" :items-per-page="10" class="elevation-1">

        <template v-slot:item.action="{ item }">
          <v-icon class="mr-2" @click="detailItem(item.id)">
            search
          </v-icon>
        </template>

      </v-data-table>
      </div>
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
          { text: 'Name', value: 'name' },
          { text: 'Address', value: 'address' },
          { text: 'Email', value: 'email' },
          { text: 'Supplier', value: 'shop_name' },
          { text: 'Action', value: 'action' },
        ],
        users: []
      }
  },
  methods:{
    detailItem(item){
      this.$router.push({ name: 'user-manage', params: { id: item } })
    },
    toAdd(){
      this.$router.push({ name: 'user-add' })
    }
  },
  computed:{
    countTotalUser(){
      return this.users.length
    },
    countTotalSupplier(){
      return this.users.filter(res => res.supplier_status==true).length
    }
  },
  mounted(){
    let db = this.$firebase.firestore()
    let self = this
    db.collection('users').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           this.loading = false
           let userData = {
               id: doc.id, 
               ...doc.data()
           }
           self.users.push(userData)
        })
    })
  }
}
</script>