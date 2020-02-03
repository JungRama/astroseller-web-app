<template>
   <div class="layout-start">
    <GeneralLayout>

        <!-- asd{{$router.params}} -->
        <v-form>
            <v-text-field
            label="Product Name"
            type="text"
            v-model="product_name"
            />

            <v-text-field
            label="Product Description"
            type="text"
            v-model="product_description"
            />

            <v-text-field
            label="Product Price"
            type="text"
            v-model="product_price"
            />
            
            <v-row
                  class="mb-6"
                  no-gutters
                  align="center"
                >
              <v-col>
                <v-img
                :src="getImage"
                :lazy-src="getImage"
                aspect-ratio="1"
                class="grey lighten-2"
                max-width="200"
                max-height="200"
                ></v-img>
              </v-col>
              <v-col>
                <v-btn @click="clickInput" color="success" dark class="mt-2 ml-2">File</v-btn>
                <span style="margin: 10px 0px 0px 10px;">{{realFileName==''?'No File Founds':realFileName}}</span>
                <input style="display:none" id="inputfile" type="file" @change="imageFile($event)" ref="myFiles">
              </v-col>
            </v-row>

            <!-- <v-file-input
              class="mt-2"
              label="File input"
              prepend-icon="mdi-camera"
              @change="upImage"
              ref="myFiles"
            ></v-file-input> -->

            <v-btn @click="editItem" color="primary" dark class="mt-2">Edit</v-btn>
            <v-btn @click="deleteItem" color="error" dark class="mt-2 ml-2">Delete</v-btn>

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
import { log } from 'util'
export default {
  name: 'home',
  components: {
    GeneralLayout
  },
  data(){
      return{
        loading: false,
        product_name: '',
        product_description: '',
        product_price: '',
        product_image: '',
        product_image_old: '',
        realFileName: ''
      }
  },
  methods:{
    editItem(){
      this.loading = true

      let db = this.$firebase.firestore()
      let storage = this.$firebase.storage()
      const imageProduct = this.$refs.myFiles.files[0]
      let self = this

      if(this.product_image!=''){
        storage.ref(this.product_image).put(imageProduct)
        .then(params => params.ref.getDownloadURL())
        .then((url) => {
          // UPDATE IMAGE URL IN DATABASE
          db.collection('products').doc(this.$route.params.id)
          .update({
            product_name : self.product_name,
            product_description : self.product_description,
            product_price : self.product_price,
            product_image : url,
          })
          .then(()=>{
            self.loading = false
            self.$router.push({ name: 'products' })
          }).catch(function(error) {
            self.loading = false
            console.error("Error updating document: ", error);
          });
        })

      }else{
        const dataStore = {
          product_name : this.product_name,
          product_description : this.product_description,
          product_price : this.product_price,
        }

        db.collection('products').doc(this.$route.params.id)
        .update(dataStore)
        .then(()=>{
          self.loading = false
          self.$router.push({ name: 'products' })
        }).catch(function(error) {
          self.loading = false
          console.error("Error updating document: ", error);
        });
      }
    },
    imageFile(){
      const date = new Date();
      const files = event.target.files[0].name
      let filename = date.getTime()+files
      this.product_image = filename
      this.realFileName = files
    },
    deleteItem(){
        this.loading = true;
        let db = this.$firebase.firestore()
        let self = this
        db.collection('products').doc(this.$route.params.id).delete()
        .then(function() {
            self.loading = false;
            self.$router.push({ name: 'products' })
        }).catch(function(error) {
            self.loading = false;
            console.error("Error removing document: ", error);
        });
    },
    clickInput(){
        document.getElementById("inputfile").click();
    }
  },
  computed:{
    getImage() {
      let image
      if(this.product_image_old==null){
        image = require('@/assets/placeholder_product.jpg')
      }else{
        image = this.product_image_old
      }
      return image
    },
    getFileName(){
      this.get
    }
  },
  mounted(){
    let db = this.$firebase.firestore()
    let self = this
    db.collection('products').doc(this.$route.params.id).onSnapshot(function(doc) {
        let data = doc.data()
        self.product_name = data.product_name
        self.product_description = data.product_description
        self.product_price = data.product_price
        self.product_image_old = data.product_image
    });
  }
}
</script>