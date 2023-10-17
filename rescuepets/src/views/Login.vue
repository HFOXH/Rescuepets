<template>
    <v-container class="container">
      <div class="circle"></div>
      <div class="circle1"></div>
      <div class="circle3"></div>
      <v-row class="fill-height">
        <v-col cols="12">
          <v-card class="fill-height container--card mx-auto" width="800px">
            <v-row class="fill-height">
              <v-col cols="6" class="fill-height" style="padding: 0;">
                <img src="../assets/Login.png" alt="" class="fill-height">
              </v-col>
              <v-col cols="6" class="justify-end" style="padding-top: 4rem;">
                <div style="display: flex; align-items: center;  margin-bottom: 2rem;">
                  <span style="color: #000;">
                    <font-awesome-icon icon="shield-dog" class="iconHome" size="2x" />
                  </span>
                  <h1 style="margin-left: 10px; font-size:40px;">RescuePets</h1>
                </div>
                <v-form @submit.prevent="login" style="padding-top:1rem;">
                    <v-text-field style="margin-left: -25px !important;"
                      label="Correo"
                      outlined
                      v-model="correo"
                    ></v-text-field>
                    <v-text-field style="margin-left: -25px !important;"
                      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show2 ? 'text' : 'password'"
                      label="Contraseña"
                      @click:append="show2 = !show2"
                      outlined
                      v-model="password"
                    ></v-text-field>
                    <div class="mx-auto">
                        <v-btn color="primary" height="40" width="200" style="margin-left:15%; text-transform: capitalize;" @click="login()">Iniciar Sesión </v-btn>
                    </div>
                </v-form>
                <div style="font-size: 14px; margin-top: 20px;">
                    <p>¿Aún no estás registrado? <a href="/registro">Regístrate aquí</a></p>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  <style>
  .v-main__wrap{
      background-color: #4FCA9E;
  }
  .container{
      margin-top: 4rem;
  }
  .container--card{
      height: 500px;
  }
  /* Backgrounds */
.circle {
    position: absolute;
    top: -200px;
    left: -150px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: block;
    list-style: none;
    background-image: url(../assets/Effect.png);
}
.circle1 {
    position: absolute;
    display: block;
    list-style: none;
    width: 100%;
    height: 100%;
    background-image: url(../assets/Effect.png);
    top: 0px;
    left: 950px;
    overflow: hidden;
}
.circle3 {
    position: fixed;
    display: block;
    list-style: none;
    width: 100%;
    height: 100%;
    background-image: url(/img/Effect.5506ae72.png);
    top: 315px;
    left: 215px;
    bottom: -383px !important;
    overflow: hidden;
}
  </style>
  <script>
  import axios from 'axios';
  export default {
    data () {
      return {
        correo: '',
        show2: true,
        password: '',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Minimo 6 caracteres'
        },
      }
    },
    methods: {
      async login() {
      try {
        const response = await axios.post('/login', {
          correo: this.correo,
          contrasenia: this.password,
        });
        // Almacenar el token JWT en localStorage o cookies
        const token = response.data.token;
        localStorage.setItem('token', token); // Almacenado en localStorage
        // Redirigir a la página de inicio o realizar otras acciones necesarias
        this.$router.push('/inicio');
      } catch (error) {
        console.error(error);
      }
      },
    }
  }
</script>