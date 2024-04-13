<template>
  <div style="background-color: #fff !important;">
    <Navbar />
    <v-container style="margin-top: 2rem">
      <v-row class="main-row">
        <div class="img-account">
          <img src="../assets/Woman.jpg" alt="" />
        </div>
        <v-card class="main-card"><br>
          <h3>Usuario: {{ userName }}</h3>
          <h3>Correo: {{ correo }}</h3><br>
          <h4 class="text-center"><i>“{{ frases[showedFrase] }}”</i></h4>
          <div class="text-end">
            <v-btn elevation="2" large class="text-capitalize mt-8" @click="logOut">Cerrar Sesión</v-btn>
          </div>
        </v-card>
      </v-row>
      <v-row style="margin-top: 2rem">
        <v-col>
          <h2 style="text-align: center; color: #00a66a; margin: 2rem">
            Mascotas en Adopción
          </h2>
        </v-col>
      </v-row>
    </v-container>
    <div class="pets">
      <v-container>
        <v-row>
          <v-col cols="12" sm="4" md="3" v-for="animal in animales" v-bind:key="animal._id" class="ma-1">
            <v-card>
              <v-row>
                <v-col cols="12" sm="4" md="3" class="icono_animal pl-6">
                  <font-awesome-icon :icon="animal.tipo === 'Perro' ? ['fas', 'dog'] : ['fas', 'cat']"
                    :style="{ color: animal.tipo === 'Perro' ? '#006eff' : '#ff8800' }" size="2x" />
                </v-col>
                <v-col cols="12" sm="6" class="text-center py-2">
                  <h3 class="text-center">{{ animal.nombre }}</h3><br>
                  <v-btn variant="tonal" class="mb-1" style="text-transform: none;" color="primary"
                    @click="showAnimalDetails(animal)">Detalles</v-btn>
                </v-col>
                <v-col cols="12" sm="3">
                  <div class="text-info">
                    <div>
                      <v-btn icon plain color="#F59100" @click="editAnimal(animal._id)"><font-awesome-icon
                          :icon="['fas', 'pencil']" style="color: #F59100"></font-awesome-icon></v-btn>
                      &nbsp;&nbsp;
                      <v-btn icon plain color="#e60000" @click="deleteAnimal(animal._id)"><font-awesome-icon
                          :icon="['fas', 'trash-can']" style="color: #e60000"></font-awesome-icon></v-btn>
                    </div>
                  </div>
                </v-col>
                <v-dialog v-model="animal.dialog" width="auto">
                  <v-card max-width="400">
                    <v-card-title>Detalles de la Mascota</v-card-title>
                    <v-card-text>
                      <p><b>Descripción:</b> {{ animal.descripcion }}</p>
                      <p><b>Sexo:</b> {{ animal.sexo }}</p>
                      <p><b>Tamaño:</b> {{ animal.tamanio }}</p>
                      <p><b>Ubicación:</b> {{ animal.ubicacion }}</p>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn class="ms-auto" @click="animal.dialog = false">Ok</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <AddAnimal />
        <EditAnimal :dialogVisible="showEditDialog" :animalId="animalToEdit" @closeDialog="showEditDialog = false"/>
      </v-container>
      <Footer />
    </div>
  </div>
</template>
<style>
.marin-row{
  margin-left: 7rem
}
.main-card{
  background-color: #00a66a !important;
  color: #fff !important;
  padding: 50px !important;
  z-index: 5 !important;
  width: 60%;
}
.img-account {
  width: 326px;
  height: 326px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-account img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 999;
}

.text-info {
  display: flex;
  align-items: top;
  justify-content: space-between;
  padding-left: 0;
  padding-right: 30px;
  text-align: center;
}

.pets {
  background-color: #dbfff2;
  padding-top: 2rem;
}

.icono_animal {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 1200px) {
  .img-account {
    display: none;
  }
  .main-card{
    width: 90%;
  }
  .main-row{
    margin-left: 1rem;
  }
}

@media screen and (max-width: 600px) {
  .text-info{
    display: flex;
    justify-content: flex-end;
  }
}
</style>
<script>
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AddAnimal from "../components/AddAnimal";
import EditAnimal from "../components/EditAnimal";

export default {
  data() {
    return {
      animales: [],
      dialog: false,
      userName: "",
      correo: "",
      frases: [
        "Sé la persona que tu perro cree que eres",
        "Trata a los animales como te gustaría ser tratado",
        "Un ronroneo vale más que mil palabras",
        "Los amigos no se compran, se adoptan",
        "La lealtad de un animal no conoce límites",
        "Mi corazón está lleno de huellas",
        "Mi raza favorita es: adoptado",
        "Los animales nos enseñan el valor de la vida",
        "No hay animal más traicionero que el ser humano",
        "Errar es de humanos, perdonar es de perros",
        "No hay mejor regalo que la mirada de un animal agradecido",
        "El mejor terapeuta tiene cola y cuatro patas",
      ],
      showedFrase: 0,
      showEditDialog: false,
      animalToEdit: ""
    }
  },
  components: {
    Navbar,
    Footer,
    AddAnimal,
    EditAnimal
  },
  mounted() {
    this.showedFrase = Math.floor(Math.random() * this.frases.length);
    this.getUserInfo();
    this.getAnimales();
  },
  methods: {
    //Obtención usuario
    getUserInfo() {
      let user = localStorage.getItem("name");
      this.axios
        .get(`/usuarios/${user}`)
        .then((response) => {
          this.userName = response.data[0].nombre;
          this.correo = response.data[0].correo;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    //Obtención animales por usuario
    getAnimales() {
      let user = localStorage.getItem("name");
      this.axios
        .get(`/animales/${user}`)
        .then((response) => {
          this.animales = response.data.map(animal => ({
            ...animal,
            dialog: false
          }));
        })
        .catch((e) => {
          console.log(e);
        });
    },
    showAnimalDetails(animal) {
    this.showEditDialog = false;
    this.$set(animal, 'dialog', true);
  },
    editAnimal(id){
      this.animales.forEach(animal => {
        animal.dialog = false;
      });
      this.showEditDialog = true;
      this.animalToEdit = id;
    },
    deleteAnimal(id) {
      this.axios.delete(`/eliminar/${id}`)
        .then(response => {
          console.log('Animal eliminado con éxito:');
          this.getAnimales();
        })
        .catch(error => {
          console.error('Error al eliminar el animal:');
        });
    },
    logOut(){
      localStorage.clear();
      window.location.href = "/";
    }
  },
};
</script>