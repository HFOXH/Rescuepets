<template>
  <div style="background-color: #4FCA9E !important;">
    <v-container>
    <div class="circle"></div>
    <div class="circle1"></div>
    <div class="circle3"></div>
    <v-card width="800px" class="mx-auto rounded-xl">
      <div style="display: flex;">
        <img src="../assets/Login.png" id="imgLogin" alt="" class="fill-height" style="flex: 0 0 auto; width: 350px;">
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
            <v-form @submit.prevent="login">
              <v-text-field label="Correo" outlined v-model="correo"></v-text-field>
              <v-text-field :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
                :type="show2 ? 'text' : 'password'" label="Contraseña" @click:append="show2 = !show2" outlined
                v-model="password"></v-text-field>
              <v-btn color="primary" height="40" width="200" style="text-transform: capitalize" @click="login()">Iniciar
                Sesión
              </v-btn>
            </v-form>
            <div style="font-size: 14px; margin-top: 20px">
              <p>
                ¿Aún no estás registrado? <a href="/registro">Regístrate aquí</a>
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
  padding-bottom: 4rem;
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

@media screen and (max-width: 1000px) {
  .circle1, #imgLogin {
    display: none;
  }
}
</style>
<script>
import swal from 'sweetalert';
import axios from "axios";
export default {
  data() {
    return {
      correo: "",
      show2: true,
      password: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Minimo 6 caracteres",
      },
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("/login", {
          correo: this.correo,
          contrasenia: this.password,
        });
        // Almacenar el token JWT en localStorage o cookies
        const token = response.data.token;
        localStorage.setItem("token", token); // Almacenado en localStorage
        localStorage.setItem("name", response.data.userName);
        localStorage.setItem("celular", response.data.celular);
        this.$router.push("/cuenta");
      } catch (error) {
        swal("Error al iniciar sesión", "Datos erroneos", "error");
        console.error(error);
      }
    },
  },
};
</script>