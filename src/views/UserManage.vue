<template>
   <div class="layout-start">
    <GeneralLayout>

        <!-- asd{{$router.params}} -->

        <v-form>
            <v-text-field
            label="Name"
            type="text"
            v-model="name"
            />

            <div v-if="isSupplier">
              <v-text-field
              label="Shop Name"
              type="text"
              v-model="shop_name"
              />

              <v-text-field
              label="Shop Description"
              type="text"
              v-model="shop_description"
              />
            </div>
            
            <v-text-field
            label="Phone Number"
            type="text"
            v-model="phone"
            />

            <v-text-field
            label="Address"
            type="text"
            v-model="address"
            />

            <v-btn @click="editItem" color="primary" dark>Edit</v-btn>
            <v-progress-circular
              indeterminate
              color="primary"
              v-if="loading"
              style="margin-left: 10px;"
            ></v-progress-circular>
            <!-- <v-btn @click="deleteItem" color="error" class="ml-1" dark>Delete</v-btn> -->
        </v-form>


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
        loading: false,
        supplier_status: false,
        name: '',
        shop_name: '',
        shop_description: '',
        phone: '',
        address: '',
        isSupplier: false
      }
  },
  methods:{
    detailItem(item){
      console.log(item);
    },
    editItem(){
        this.loading = true
        let db = this.$firebase.firestore()
        let self = this
        db.collection('users').doc(this.$route.params.id)
          .update({
            name : self.name,
            shop_name : self.shop_name,
            shop_description : self.shop_description,
            phone : self.phone,
            address : self.address,
          })
          .then(()=>{
            self.loading = false
            self.$router.push({ name: 'user' })
          }).catch(function(error) {
            self.loading = false
            console.error("Error updating document: ", error);
          });
    },
  },
  mounted(){
    let db = this.$firebase.firestore()
    let self = this
    db.collection('users').doc(this.$route.params.id).onSnapshot(function(doc) {
        let data = doc.data()
        console.log(data)
        self.name = data.name
        self.shop_name = data.shop_name
        self.shop_description = data.shop_description
        self.isSupplier = data.supplier_status
        self.phone = data.phone
        self.address = data.address
    });
  }
}
</script>