<template>
  <div>
    <Navbar />
    <v-container style="margin-top: 5rem;">
      <v-row>
        <v-col>
          <div class="imagen__title">
            <img src="../assets/Ellipse 1.png" alt="">
          </div>
        </v-col>
        <v-col>
          <div class="contenedor__title">
            <h1>RescuePets</h1>
            <p>Somos una fundación sin animo de lucro, nuestra plataforma esta diseñada de la mejor forma; facil y eficaz para que puedas dar en adopción animales y ayudarnos a crecer.</p>
            <v-btn class="btn__title" color="primary" height="54"
          width="250" size="x-large" >Registrate Aquí &nbsp;<font-awesome-icon icon="dog" style="color:#FFF;" class="iconHome" size="2x" /></v-btn>
          </div>
        </v-col>
      </v-row>
      <div>
        <h2 style="text-align: center;margin: 3rem;">Servicios</h2>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title style="display: flex; justify-content: space-between; align-items: center;">
                <h4>Apadrinar</h4>
                <font-awesome-icon :icon="['fas', 'cat']" style="color: #ee8309"/>
              </v-card-title>
              <v-card-text>
                Puedes aportar en los procesos de cuidado y recuperación de un animal, serás su protector y confidente.
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  text
                  @click=""
                >
                  Lee mas
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col>
            <v-card>
              <v-card-title style="display: flex; justify-content: space-between; align-items: center;">
                <h4>Adoptar</h4>
                <font-awesome-icon :icon="['fas', 'heart']" style="color: #cc270a"/>
              </v-card-title>
              <v-card-text>
                No compres, adopta; existen demasiados animales callejeros sin cuidados esperando ayuda de una persona como tú.
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  text
                  @click=""
                >
                  Lee mas
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col>
            <v-card>
              <v-card-title style="display: flex; justify-content: space-between; align-items: center;">
                  <h4>Donar</h4>
                  <font-awesome-icon :icon="['fas', 'hand-holding-dollar']" style="color: #079b02"/>
              </v-card-title>
              <v-card-text>
                Funcionamos gracias a los aportes de la gente, no necesariamente debes donar plata, puedes donar alimento, juguetes, camas. etc.
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  text
                  @click=""
                >
                  Lee mas
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
    <div class="grey-box"></div>
    <div class="special-container">
      <div>
        <v-row>
          <v-col cols="12" md="6">
            <h3 class="white--text font-weight-bold">Crea una cuenta y contribuye a la comunidad</h3><br>
            <p class="white--text">Con tu ayuda podemos cambiar el mundo y hacerlo mejor para cada animalito de la calle, generando consciencia humana y mejorando la vida de los animalitos.</p><br>
            <v-btn elevation="2" large >Regístrate, es gratis &nbsp; <font-awesome-icon :icon="['fas', 'child-reaching']" /></v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <img class="img-register1" src="../assets/Cuenta.jpg" width="60%" alt="">
          </v-col>
        </v-row>
      </div>
    </div>
    <v-container>
      <h2 style="text-align: center;margin-top: 3rem;margin-bottom:0.5rem;">Necesitamos tu ayuda</h2>
      <p style="text-align: center; color:#a0a0a0;">Puedes ayudar en esta gran causa, simplemente dejanos tus datos</p><br>
      <v-row>
        <v-col cols="12" md="6">
            <img class="img-register1" src="../assets/DonaCat.jpg" width="100%" alt="">
          </v-col>
          <v-col cols="12" md="6">
            <v-form class="form-donation"
                ref="form"
                v-model="valid"
                lazy-validation
              >
              
                <v-text-field
                  v-model="name"
                  :rules="nameRules"
                  label="Nombre"
                  required
                  outlined
                ></v-text-field>

                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="Correo"
                  required
                  outlined
                ></v-text-field>
                  <v-text-field
                    v-model="phoneNumber"
                    :counter="10"
                    :error-messages="errors"
                    label="Numero de contacto"
                    required
                    outlined
                  ></v-text-field>

                <v-select
                  v-model="select"
                  :items="items"
                  :rules="[v => !!v || 'Esto es requerido']"
                  label="Tipo de Ayuda"
                  required
                  outlined
                ></v-select>

                <v-textarea
                  v-model="title"
                  label="Hola Rescuepets"
                  counter
                  maxlength="500"
                  full-width
                  single-line
                  outlined
                >
                <template v-slot:label>
                <div>
                  Especifica la ayuda...
                </div>
              </template>
              </v-textarea>

                <v-checkbox
                  v-model="checkbox"
                  :rules="[v => !!v || 'Debes estar de acuerdo para continuar!']"
                  label="Estas de acuerdo con nuestra politica de privacidad de datos?"
                  required
                ></v-checkbox>

                <div style="text-align: center;">
                  <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="validate"
                >
                  Enviar
                </v-btn>
              </div>
              </v-form>
          </v-col>
      </v-row>
    </v-container>
    <Footer />
  </div>
</template>
<style>

h1{
  font-size: 66px;
  font-weight: bold;
}
.btn__title{
  color: #fff !important;
  margin-top: 2rem;
  text-transform: capitalize !important;
}
.contenedor__title{
  margin-top: 4rem;
}
.card__title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.grey-box {
  background-color: #25c288;
  padding: 0;
  margin: -120px 0 0 0;
  height: 300px;
  width: 100%; 
  left: 0; 
  z-index: -999;
}
.special-container{
  background-color: #25c288; 
  margin: -100px 0px 0px 0px;
  padding-bottom: 4rem;
  padding-left:4rem;
  width: 100%;
}
.img-register1{
  border-radius: 2rem;
}
.form-donation{
  border-radius: 2rem;
  background-color: #fff;
  padding: 2.5rem;
  box-shadow: 0px 12px 14px 1px rgba(0,0,0,0.37);
}

@media screen and (max-width: 800px) {
  .img-register1{
    display: none;
  }
}
</style>
<script>
// @ is an alias to /src
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
export default {
  data() {
    return {
      items: [
        { text: 'Voluntariado', value: 'opcVoluntariado' },
        { text: 'Alimento', value: 'opcAlimento' },
        { text: 'Dinero', value: 'opcDinero' },
        { text: 'Otro', value: 'opcOtro' },
      ],
    };
  },
  name: 'Home',
  components: {
    Navbar,
    Footer
  }
}
</script>
