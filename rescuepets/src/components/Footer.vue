<template>
    <v-footer
    dark
    padless
    style="margin-top: 4rem;"
  >
    <v-card
      flat
      tile
      class="white--text text-center"
      color="primaryDark"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">
            <font-awesome-icon :icon="['fab', 'facebook']" />
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        <b>Rescuepets</b> es una plataforma web de código abierto desarrollada en Vue.js que tiene como objetivo facilitar la adopción de animales, así como permitir a las personas dar en adopción, apadrinar y donar para ayudar a los animales necesitados. Nuestra misión es promover la protección y el bienestar de los animales al conectar a amantes de los animales de todo el mundo con oportunidades para hacer una diferencia en las vidas de los animales.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        © {{ new Date().getFullYear() }} — <strong>SC, Brayan, Eddy</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
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
}
</script>