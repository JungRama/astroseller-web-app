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

            <v-text-field
            label="Email"
            type="text"
            v-model="email"
            />

            <v-text-field
            label="Password"
            type="password"
            v-model="password"
            />

            <v-btn @click="addUser" color="primary" dark>Add User</v-btn>
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
        name: '',
        email: '',
        password: '',
      }
  },
  methods:{
    addUser(){
        this.loading = true
        let db = this.$firebase.firestore()
        let self = this

        this.$firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((res)=>{
          db.collection('users').doc(res.user.uid).set({
            name: self.name,
            email: self.email,
            address: null,
            phone: null,
            profile_picture: null,
            shop_description: null,
            shop_name: null,
            supplier_status: false
          }).then(()=>{
            self.loading = false
            this.$router.push({ name: 'user' })
          }).catch((err)=>{
            alert(err)
            self.loading = false
            this.$router.push({ name: 'user' })
          })
        }).catch(()=>{
            self.loading = false
        })
    },
  }
}
</script>