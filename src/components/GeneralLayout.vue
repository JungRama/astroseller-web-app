<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-list-group
            v-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              @click="takeAction(child)"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else-if="item.routeName"
            :key="item.text"
            @click="takeAction(item)"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">ASTROSELLER</span>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn color="error" @click="logout">
        LOGOUT
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container
      >
        
        <slot></slot>

      </v-container>
    </v-content>
  </v-app>
</template>

<style lang="scss" scoped>
</style>

<script>
  export default {
    data: () => ({
      dialog: false,
      drawer: null,
      items: [
        { icon: 'home', text: 'Home', routeName: 'home'},
        { icon: 'ballot', text: 'List User', routeName: 'user' },
        { icon: 'ballot', text: 'List Product', routeName: 'products' },
      ]
    }),
    methods:{
      takeAction(item){
        if(item.routeName){
          this.$router.push({ name: item.routeName})
        }else{
          this[item.action]()
        }
      },
      logout(){
                        localStorage.setItem("isLogin", null);
                this.$router.push({ name: 'login' })

      }
    }
  }
</script>
