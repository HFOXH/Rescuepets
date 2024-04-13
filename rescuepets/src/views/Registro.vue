<template>
  <div style="background-color: #4FCA9E !important;">
    <v-container>
    <div class="circle"></div>
    <div class="bone"></div>
    <v-card width="1000px" class="mx-auto rounded-xl">
      <div style="display: flex;">
        <img src="../assets/Register.png" id="imgLogin" alt="" class="fill-height" style="flex: 0 0 auto; width: 400px;">
        <div style="flex: 1; align-content: center;">
          <v-card-title style="display: flex; justify-content: center;">
            <div style="display: flex; align-items: center;">
              <span style="color: #000">
                <font-awesome-icon icon="shield-dog" class="iconHome" size="2x" />
              </span>
              <h1 style="margin-left: 10px; font-size: 40px">RescuePets</h1>
            </div>
          </v-card-title>
          <v-card-text class="text-center">
            <v-form @submit.prevent="register" action="" style="padding-top:1rem;">
                <v-text-field label="Nombre" v-model="nombre"
                  outlined></v-text-field>
                <v-text-field label="Correo" v-model="correo"
                  outlined></v-text-field>
                <v-text-field :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, v => (v && v.length >= 8) || 'Mínimo 8 caracteres']"
                  :type="show2 ? 'text' : 'password'" name="input-10-2" label="Contraseña" @click:append="show2 = !show2"
                  outlined></v-text-field>
                <v-text-field v-model="password" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, v => (v && v.length >= 8) || 'Mínimo 8 caracteres']"
                  :type="show2 ? 'text' : 'password'" name="input-10-2" label="Repetir Contraseña"
                  @click:append="show2 = !show2" outlined></v-text-field>
                <div class="mx-auto">
                  <v-btn @click="register()" color="primary" height="40" width="200"
                    style="text-transform: capitalize;">Registrarse &nbsp;<font-awesome-icon
                      icon="user-plus" style="color:#FFF;" class="iconHome" size="1x" /></v-btn>
                </div>
              </v-form>
            <div style="font-size: 14px; margin-top: 20px">
              <p>
                ¿Ya tienes cuenta? <a href="/login">Ingresa aquí</a>
              </p>
            </div>
          </v-card-text>
        </div>
      </div>
    </v-card>
  </v-container>
  </div>
</template>

<style>

.container {
  padding-top: 4rem;
  padding-bottom: 2rem;
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

@media screen and (max-width: 1000px) {
  #imgLogin {
    display: none;
  }
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