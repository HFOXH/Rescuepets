<template>
    <v-app>
      <!-- Barra lateral -->
      <v-navigation-drawer app v-model="drawer">
        <!-- Contenido de la barra lateral -->
        <v-list>
          <v-list-item @click="toggleDrawer">
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Inicio</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
  
          <v-list-item @click="toggleDrawer">
            <v-list-item-action>
              <v-icon>mdi-account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Mi Perfil</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
  
          <!-- Agrega más elementos de menú aquí -->
        </v-list>
      </v-navigation-drawer>
  
      <!-- Contenido principal -->
      <v-app-bar app>
        <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Aplicación con Sidebar</v-toolbar-title>
      </v-app-bar>
  
      <v-main>
        <!-- Tu contenido principal va aquí -->
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <router-view></router-view> <!-- Esto es para enrutamiento si estás usando Vue Router -->
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  export default {
    data() {
      return {
        drawer: false // Para controlar la visibilidad del sidebar
      };
    },
    methods: {
      toggleDrawer() {
        this.drawer = !this.drawer; // Cambia el estado del sidebar cuando haces clic en un elemento del menú
      }
    }
  };
  </script>
  
  <style>
  /* Puedes personalizar el estilo del sidebar y otros elementos aquí */
  </style>
  