<template>
  <div>
    <Navbar />
  <v-container>
    
    <!-- Cuadro de Busqueda -->
    <v-row>
      <v-col cols="12" sm="6">
      <v-text-field label="Buscar..." solo>
        <template v-slot:append>
          <font-awesome-icon icon="search" />
        </template>
      </v-text-field>
    </v-col>
    <v-col cols="12" sm="2">
      <v-select
          :items="itemsSexo"
          label="Sexo"
          solo
        ></v-select>
    </v-col>
    <v-col cols="12" sm="2">
      <v-select
          :items="itemsEdad"
          label="Edad"
          solo
        ></v-select>
    </v-col>
    <v-col cols="12" sm="2">
      <v-select
          :items="itemsTamanio"
          label="Tamaño"
          solo
        ></v-select>
    </v-col>
    </v-row>
    <v-radio-group style="margin-top: -15px;"
      v-model="row"
      row
    >
      <v-radio
        label="Gato"
        value="radio-1"
      ></v-radio>
      <v-radio
        label="Perro"
        value="radio-2"
      ></v-radio>
      <v-radio
        label="Todos"
        value="radio-2"
      ></v-radio>
    </v-radio-group>
    <!-- Cards -->
    <v-row no-gutters style="margin-top: -30px;">
      <v-col
        cols="12"
        sm="4"
      >
      <v-card :loading="loading" class="mx-auto my-12" max-width="374">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img
        height="170"
        src="../assets/CatAdopt.png"
      ></v-img>

      <v-card-title>Lorem ipsum dolor sit amet</v-card-title>

      
      <v-card-text class="container-clasification">
          <v-chip class="clasification">Sexo</v-chip>
          <v-chip class="clasification">Edad</v-chip>
          <v-chip class="clasification">Tamaño</v-chip>
      </v-card-text>

      <v-card-text style="padding: 25px; margin-top:-15px;">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet erat lacus. Donec varius ante ut quam consectetur, sagittis venenatis tellus tempor. Aenean at congue mauris, eleifend faucibus ipsum. </p>
        <div class="contact">
          <div class="location" style="color:#4F129C; font-size: 16px;">
            <font-awesome-icon :icon="['fas', 'location-dot']"/>&nbsp; Location
          </div>
          <div class="whatsapp">
             <v-btn class="btn-contact"> Contacto &nbsp; <font-awesome-icon :icon="['fab', 'whatsapp']" style="color: #ffffff; font-size: 20px;"/></v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>
      </v-col>
    </v-row>
  </v-container>
  </div>
</template>
<style>
.v-main__wrap {
  background-color: #dbfff2;
}
.clasification{
  border-radius: 5px !important;
  margin-right: 10px;
  margin-left: 10px;
  width: 100%;
}
.container-clasification{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.btn-contact{
  color:#fff !important;
  background-color: #13BC24 !important;
  text-transform: capitalize;
}
.contact{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
<script>
import Navbar from '../components/Navbar'
export default {
  data: () => ({
    loading: false,
    selection: 1,
    itemsSexo: ['Macho', 'Hembra'],
    itemsEdad: ['Menos de 1 año', 'Entre 1 y 3 años', 'Entre 3 y 6 años','Más de 6 años'],
    itemsTamanio: ['Pequeño', 'Mediano', 'Grande'],
  }),

  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
  },
  components: {
    Navbar
  }
};
</script>
