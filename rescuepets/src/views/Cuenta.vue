<template>
  <div>
    <Navbar />
    <v-container style="margin-top: 2rem;">
      <v-row style="margin-left: 7rem;">
        <div class="img-account">
          <img src="../assets/Woman.jpg" alt="">
        </div>
        <v-card style="background-color: #00A66A; color: #FFF;padding:50px; z-index: 5; width: 60%;">
          <v-card-title>Nombre Completo</v-card-title>
          <v-card-title>Correo</v-card-title>
          <v-card-title>Celular</v-card-title>
          <v-card-title>Ubicación</v-card-title>
        </v-card>
      </v-row>
      <v-row style="margin-top: 2rem;">
        <v-col>
          <h2 style="text-align: center; color: #00A66A; margin: 2rem;">Mascotas en Adopción</h2>
        </v-col>
      </v-row>
    </v-container>
    <div class="pets">
      <v-container>
        <v-row>
        <v-col cols="12" sm="4">
          <v-card>
            <v-row>
              <v-col cols="12" sm="3" class="icono_animal">
                <font-awesome-icon :icon="['fas', 'cat']" style="color: #ff8800;" size="2x"/>
              </v-col>
              <v-col cols="12" sm="9" style="padding:0px;">
                <v-card-title>Lorem ipsum</v-card-title>
            <div class="text-info">
              <p>Vistas</p>
              <p>Estado</p>
              <div>
                <font-awesome-icon :icon="['fas', 'pencil']" style="color: #ffdd00;"></font-awesome-icon>&nbsp;&nbsp;
                <font-awesome-icon :icon="['fas', 'trash-can']" style="color: #e60000;"></font-awesome-icon>
              </div>
            </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card>
            <v-row>
              <v-col cols="12" sm="3" class="icono_animal">
                <font-awesome-icon :icon="['fas', 'dog']" style="color: #006eff;" size="2x"/>
              </v-col>
              <v-col cols="12" sm="9" style="padding:0px;">
                <v-card-title>Lorem ipsum</v-card-title>
            <div class="text-info">
              <p>Vistas</p>
              <p>Estado</p>
              <div>
                <font-awesome-icon :icon="['fas', 'pencil']" style="color: #ffdd00;"></font-awesome-icon>&nbsp;&nbsp;
                <font-awesome-icon :icon="['fas', 'trash-can']" style="color: #e60000;"></font-awesome-icon>
              </div>
            </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          
        </v-col>

      </v-row>
      </v-container>
      <v-container>
        <AddAnimal/>
      </v-container>
      <Footer />
    </div>
  
  </div>
</template>
<style>
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
  padding-left: 20px;
  padding-right: 30px;
  text-align: center; 
}
.pets{
  background-color: #DBFFF2;
  padding-top: 2rem;
}
.icono_animal{
    display: flex;
    justify-content: center;
    align-items: center;
    }
</style>
<script>
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AddAnimal from '../components/AddAnimal'

export default {
  data() {
  },
  components: {
    Navbar,
    Footer,
    AddAnimal
  },
  methods: {
    //Obtención animales por usuario
    getAnimales(){
      this.axios.get("/animales").then((response)=>{
        this.animales = response.data;
      }).catch((e)=>{
        console.log(e);
      });
    }
    //Agregar nuevo animal
    
  }
}
</script>
  