<template>
  <div class="background-searching">
    <Navbar />
    <v-container>
      <!-- Cuadro de Busqueda -->
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field label="Buscar..." solo v-model="search" @input="filterAnimals">
            <template v-slot:append>
              <font-awesome-icon icon="search" />
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="2">
          <v-select v-model="sexo" :items="itemsSexo" label="Sexo" solo @input="filterAnimals"></v-select>
        </v-col>
        <v-col cols="12" sm="2">
          <v-select v-model="edad" :items="itemsEdad" label="Edad" solo @input="filterAnimals"></v-select>
        </v-col>
        <v-col cols="12" sm="2">
          <v-select v-model="tamanio" :items="itemsTamanio" label="Tamaño" solo
            @input="filterAnimals"></v-select>
        </v-col>
      </v-row>
      <v-radio-group style="margin-top: -15px;" v-model="tipo" row @change="filterAnimals">
        <v-radio label="Gato" value="Gato"></v-radio>
        <v-radio label="Perro" value="Perro"></v-radio>
        <v-radio label="Todos" value=""></v-radio>
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn elevation="1" icon dark color="black" @click="restoreFilter" style="background-color: white;" v-on="on">
              <v-icon dark>mdi-cached</v-icon>
            </v-btn>
          </template>
          <span>Refrescar</span>
        </v-tooltip>
      </v-radio-group>
      <!-- Cards -->
      <v-row no-gutters style="margin-top: -30px;">
        <v-col cols="12" sm="4" v-for="(animal, index) in animales" :key="index">
          <v-card :loading="loading" class="mx-auto my-12" max-width="374">
            <template slot="progress">
              <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
            </template>

            <v-carousel height="170" hide-delimiters>
              <v-carousel-item v-for="(imagen, index) in animal.imagenes" :key="index">
                <v-img height="170" :src="imagen" class="cover-image" @click="showImageDialog(imagen)"></v-img>
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
              <v-chip class="clasification">{{ animal.tamanio }}</v-chip>
            </v-card-text>

            <v-card-text style="padding: 25px; margin-top:-15px;">
              <p>{{ animal.descripcion }}</p>
              <div class="contact">
                <div class="location" style="color:#4F129C; font-size: 16px;">
                  <font-awesome-icon :icon="['fas', 'location-dot']" />&nbsp; {{ animal.ubicacion }}
                </div>
                <div class="whatsapp">
                  <v-btn class="btn-contact"> Contacto &nbsp; <font-awesome-icon :icon="['fab', 'whatsapp']"
                      style="color: #ffffff; font-size: 20px;" /></v-btn>
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
.background-searching {
  background-color: #dbfff2ad !important;
}

.clasification {
  border-radius: 5px !important;
  margin-right: 10px;
  margin-left: 10px;
  width: 100%;
}

.container-clasification {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.btn-contact {
  color: #fff !important;
  background-color: #13BC24 !important;
  text-transform: capitalize;
}

.contact {
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
    itemsEdad: ['Menos de 1 año', 'Entre 1 y 3 años', 'Entre 3 y 6 años', 'Más de 6 años'],
    itemsTamanio: ['Pequeño', 'Mediano', 'Grande'],
    tipo: '',
    animales: [],
    imageDialog: false,
    selectedImage: null,
    searchText: '',
    sexo: null,
    tamanio: null,
    edad: null,
    search: null
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
    getAnimales() {
      this.axios.get("/animales").then((response) => {
        this.animales = response.data;
      }).catch((e) => {
        console.log(e);
      });
    },
    restoreFilter(){
      this.search = "";
      this.edad = "";
      this.sexo = "";
      this.tamanio = "";
      this.tipo = "";
      this.filterAnimals();
    },
    async filterAnimals() {
      try {
        this.animales = [];
        const response = await this.axios.get("/animales");
        this.animales = response.data;
        this.filteredAnimals = null;

        this.filteredAnimals = this.animales.filter(animal => {
          let edadCheck = !this.edad || (
            (this.edad === "Menos de 1 año" && animal.edad >= 0 && animal.edad <= 1) ||
            (this.edad === "Entre 1 y 3 años" && animal.edad >= 1 && animal.edad <= 3) ||
            (this.edad === "Entre 3 y 6 años" && animal.edad >= 3 && animal.edad <= 6) ||
            (this.edad === "Más de 6 años" && animal.edad > 6)
          );

          let tipoCheck = !this.tipo || animal.tipo === this.tipo;
          let sexoCheck = !this.sexo || animal.sexo === this.sexo;
          let tamanioCheck = !this.tamanio || animal.tamanio === this.tamanio;
          let searchInput = !this.search || animal.nombre === this.search;

          return edadCheck && sexoCheck && tamanioCheck && tipoCheck && searchInput;
        });

        this.animales = this.filteredAnimals;
      } catch (error) {
        console.error("Error fetching animals:", error);
      }
    },
  },
  components: {
    Navbar
  }
};
</script>
