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
        value="radio-3"
      ></v-radio>
    </v-radio-group>
    <!-- Cards -->
    <v-row no-gutters style="margin-top: -30px;">
      <v-col
        cols="12"
        sm="4" v-for="(animal, index) in animales" :key="index"
      >
      <v-card :loading="loading" class="mx-auto my-12" max-width="374">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-carousel height="170" hide-delimiters>
        <v-carousel-item v-for="(imagen, index) in animal.imagenes" :key="index">
          <v-img
            height="170"
            :src="imagen"
            class="cover-image"
            @click="showImageDialog(imagen)"
          ></v-img>
        </v-carousel-item>
      </v-carousel>

      <!-- Diálogo para mostrar la imagen en zoom -->
    <v-dialog v-model="imageDialog" max-width="50%">
      <v-card>
        <v-img :src="selectedImage" max-height="50%" />
        <v-card-actions>
          <v-btn text @click="imageDialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

      <v-card-title>{{ animal.nombre }}</v-card-title>
      
      <v-card-text class="container-clasification">
          <v-chip class="clasification">{{ animal.sexo }}</v-chip>
          <v-chip class="clasification">{{ animal.edad }} años</v-chip>
          <v-chip class="clasification">{{ animal.tamaño }}</v-chip>
      </v-card-text>

      <v-card-text style="padding: 25px; margin-top:-15px;">
        <p>{{ animal.descripcion }}</p>
        <div class="contact">
          <div class="location" style="color:#4F129C; font-size: 16px;">
            <font-awesome-icon :icon="['fas', 'location-dot']"/>&nbsp; {{ animal.ubicacion }}
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
    row: '',
    animales: [],
    imageDialog: false,
    selectedImage: null,
  }),
  mounted() {
    this.getAnimales();
  },
  methods: {
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
    showImageDialog(image) {
      this.selectedImage = image;
      this.imageDialog = true;
    },
    getAnimales(){
      this.axios.get("/animales").then((response)=>{
        this.animales = response.data;
        console.log(this.animales);
      }).catch((e)=>{
        console.log(e);
      });
    }
  },
  components: {
    Navbar
  }
};
</script>
