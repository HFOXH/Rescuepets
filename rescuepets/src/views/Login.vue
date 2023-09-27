<template>
    <v-container class="container">
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
                <v-form action="" style="padding-top:1rem;">
                    <v-text-field style="margin-left: -25px !important;"
                      label="Correo"
                      outlined
                    ></v-text-field>
                    <v-text-field style="margin-left: -25px !important;"
                      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show2 ? 'text' : 'password'"
                      name="input-10-2"
                      label="Repetir Contraseña"
                      @click:append="show2 = !show2"
                      outlined
                    ></v-text-field>
                    <div class="mx-auto">
                        <v-btn color="primary" height="40" width="200" style="margin-left:15%; text-transform: capitalize;">Iniciar Sesión </v-btn>
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
  </style>
  <script>
  export default {
    data () {
      return {
        show2: true,
        password: 'Password',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Minimo 6 caracteres'
        },
      }
    },
  }
</script>