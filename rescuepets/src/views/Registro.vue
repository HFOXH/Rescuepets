<template>
  <v-container class="container">
    <div class="circle"></div>
    <div class="bone"></div>
    <v-row class="fill-height">
      <v-col cols="12">
        <v-card class="fill-height container--card mx-auto" width="800px">
          <v-row class="fill-height">
            <v-col cols="6" class="fill-height" style="padding: 0;">
              <img src="../assets/Register.png" alt="" class="fill-height">
            </v-col>
            <v-col cols="6" class="justify-end">
              <div style="display: flex; align-items: center;">
                <span style="color: #000;">
                  <font-awesome-icon icon="shield-dog" class="iconHome" size="2x" />
                </span>
                <h1 style="margin-left: 10px; font-size:40px;">RescuePets</h1>
              </div>
              <v-form @submit.prevent="register" action="" style="padding-top:1rem;">
                <v-text-field style="margin-left: -25px !important;" label="Nombre" v-model="nombre"
                  outlined></v-text-field>
                <v-text-field style="margin-left: -25px !important;" label="Correo" v-model="correo"
                  outlined></v-text-field>
                <v-text-field style="margin-left: -25px !important;" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, v => (v && v.length >= 8) || 'Mínimo 8 caracteres']"
                  :type="show2 ? 'text' : 'password'" name="input-10-2" label="Contraseña" @click:append="show2 = !show2"
                  outlined></v-text-field>
                <v-text-field v-model="password" style="margin-left: -25px !important;" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, v => (v && v.length >= 8) || 'Mínimo 8 caracteres']"
                  :type="show2 ? 'text' : 'password'" name="input-10-2" label="Repetir Contraseña"
                  @click:append="show2 = !show2" outlined></v-text-field>
                <div class="mx-auto">
                  <v-btn @click="register()" color="primary" height="40" width="200"
                    style="margin-left:15%; text-transform: capitalize;">Registrarse &nbsp;<font-awesome-icon
                      icon="user-plus" style="color:#FFF;" class="iconHome" size="1x" /></v-btn>
                </div>
              </v-form>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
.v-main__wrap {
  background-color: #4FCA9E;
}

.container {
  margin-top: 4rem;
}

.container--card {
  height: 500px;
}

/* Efect */

.circle {
  position: absolute;
  top: -250px;
  left: -200px;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circle {
  position: absolute;
  display: block;
  list-style: none;
  width: 100%;
  height: 100%;
  background-image: url(../assets/Effect.png);
}

.bone {
  position: absolute;
  top: -75px;
  left: 750px;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.bone {
  position: absolute;
  display: block;
  list-style: none;
  width: 100%;
  height: 100%;
  background-image: url(../assets/mdi_bone.png);
}
</style>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      nombre: '',
      correo: '',
      password: '',
      confirmPassword: '',
      showPassword: true,
      showConfirmPassword: true,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Minimo 8 caracteres'
      },
      show2: ''
    };
  },
  methods: {
    register() {
      const userData = {
        nombre: this.nombre,
        correo: this.correo,
        contrasenia: this.password
      };
    
      axios.post("/register", userData)
        .then(response => {
          console.log('Usuario Registrado con Éxito', response.data);
          this.$router.push('/login');
        })
        .catch(error => {
          console.error('Error al registrar usuario:', error);
        });
    },
  },
};
</script>