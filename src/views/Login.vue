<template>
  <v-app id="inspire">
    <v-snackbar
      v-model="alert.state"
    >
      {{ alert.text }}
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="email"
                    prepend-icon="person"
                    type="email"
                    v-model="email"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-progress-circular
                  indeterminate
                  color="primary"
                  v-if="loading"
                  style="margin-right: 10px;"
                ></v-progress-circular>
                <v-btn color="primary" @click="signIn">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import firebase from 'firebase'
  
  export default {
    data(){
      return{
        email: 'admin@admin.com',
        password: 'test123',
        loading: false,
        alert:{
          state: false,
          text : ''
        } 
      }
    },
    methods:{
        signIn(){
            this.loading = true
            this.$firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then((res) =>  {
                localStorage.setItem("astroseller_is_login", true);
                this.alert.text = "Login Success"
                this.alert.state = true
                this.loading = false
                console.log(res.user.uid);
                
                localStorage.setItem("isLogin", res.user.uid);
                this.$router.push({ name: 'home' })
            })
            .catch((err) =>  {
                this.alert.text = err
                this.alert.state = true
                this.loading = false
            })
        }
    },
    mounted(){
      localStorage.setItem("isLogin", null);
    }
  }
</script>