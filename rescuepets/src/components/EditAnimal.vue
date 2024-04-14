<template>
  <v-dialog v-model="dialogVisible" max-width="600px">
    <v-card>
      <v-card-title class="headline">
        Editar Animal
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col>
              <v-text-field solo v-model="name" :counter="15" :rules="nameRules" label="Nombre" required></v-text-field>
            </v-col>
            <v-col>
              <v-text-field solo v-model="edad" label="Edad" :rules="[(v) => !!v || 'Este campo es requerido']"
                required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select solo v-model="selectTipo" :items="tipo" :rules="[(v) => !!v || 'Este campo es requerido']"
                label="Tipo" required></v-select>
            </v-col>
            <v-col>
              <v-select solo v-model="selectTamanio" :items="tamanio" :rules="[(v) => !!v || 'Este campo es requerido']"
                label="Tamaño" required></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select solo v-model="selectSexo" :items="sexo" :rules="[(v) => !!v || 'Este campo es requerido']"
                label="Sexo" required></v-select>
            </v-col>
            <v-col>
              <v-text-field solo v-model="ubicacion" label="Ubicacion"
                :rules="[(v) => !!v || 'Este campo es requerido']" required></v-text-field>
            </v-col>
          </v-row>
          <v-file-input v-model="imgs" solo counter multiple truncate-length="50" label="Imagenes"
            :rules="[(v) => !!v || 'Este campo es requerido']" required></v-file-input>
          <v-textarea v-model="descripcion" :counter="100" solo label="Descripción"
            :rules="[(v) => !!v || 'Este campo es requerido']" required>
          </v-textarea>
          <v-checkbox v-model="checkbox" :rules="[
            (v) =>
              !!v ||
              'Debes estar de acuerdo con nuestros términos y condiciones',
          ]" label="Estas de acuerdo con nuestras políticas y condiciones?" required></v-checkbox>

        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn style="color: #fff" :disabled="!valid" :counter="100" color="primaryDark" class="mr-4"
          @click="postAnimal()">
          Publicar
        </v-btn>
        <v-btn style="background-color: rgb(230, 0, 0); color: #fff" @click="reset">
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    dialogVisible: { type: Boolean, required: true },
    animalId: { type: String }
  },
  data() {
    return {
      dialog: false,
      valid: false,
      name: '',
      edad: '',
      selectTipo: '',
      selectTamanio: '',
      selectSexo: '',
      ubicacion: '',
      imgs: null,
      descripcion: '',
      checkbox: true,
      tipo: ['Perro', 'Gato'],
      tamanio: ['Pequeño', 'Mediano', 'Grande'],
      sexo: ['Macho', 'Hembra'],
      nameRules: [
        v => !!v || 'El nombre es requerido',
        v => (v && v.length <= 15) || 'El nombre debe tener menos de 15 caracteres',
      ],
    }
  },
  methods: {
    reset() {
      this.$refs.form.reset()
      this.valid = false;
      this.$emit("closeDialog");
    },
    postAnimal() {
      this.axios.
      put(`/actualizar/${this.animalId}`, {
        nombre: this.name,
        edad: this.edad,
        tipo: this.selectTipo,
        tamanio: this.selectTamanio,
        sexo: this.selectSexo,
        ubicacion: this.ubicacion,
        imagenes: this.imgs,
        descripcion: this.descripcion
      })
        .then(response => {
          console.log('Animal actualizado con éxito:', response.data);
          this.reset();
          window.location.reload();
        })
        .catch(error => {
          console.error('Error al actualizar el animal:', error.response.data);
        });
    },
    getAnimal() {
      this.axios.get(`/animal/${this.animalId}`)
        .then((response) => {
          this.name = response.data.nombre;
          this.edad = response.data.edad;
          this.selectTipo = response.data.tipo;
          this.selectTamanio = response.data.tamanio;
          this.selectSexo = response.data.sexo;
          this.ubicacion = response.data.ubicacion;
          this.imgs = response.data.imagenes;
          this.descripcion = response.data.descripcion;
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
  watch: {
    animalId() {
      this.getAnimal();
    }
  }
}
</script>