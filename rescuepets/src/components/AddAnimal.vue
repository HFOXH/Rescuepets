<template>
  <div>
    <v-expansion-panels class="mb-6">
      <v-expansion-panel>
        <v-expansion-panel-header disable-icon-rotate>
          <b>Agregar Nuevo Animal en Adopción</b>
          <template v-slot:actions>
            <font-awesome-icon :icon="['fas', 'paw']" style="color: #00ad2b" />
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- Formulario para agregar -->
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col>
                <v-text-field solo v-model="name" :counter="15" :rules="nameRules" label="Nombre"
                  required></v-text-field>
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
                <v-select solo v-model="selectTamanio" :items="tamanio"
                  :rules="[(v) => !!v || 'Este campo es requerido']" label="Tamaño" required></v-select>
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
                'Debes estar de acuerdo con nuestros terminos y condiciones',
            ]" label="Estas de a cuerdo con nuestras politicas y condiciones?" required
              @click="validate()"></v-checkbox>

            <v-btn style="color: #fff" :disabled="!valid" :counter="100" color="primaryDark" class="mr-4"
              @click="postAnimal()">
              Publicar
            </v-btn>

            <v-btn style="background-color: rgb(230, 0, 0); color: #fff" @click="reset">
              Cancelar
            </v-btn>
          </v-form>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script>
export default {
  data() {
    return {
      valid: false,
      name: "",
      nameRules: [(v) => !!v || "El nombre es requerido"],
      select: null,
      sexo: ["Macho", "Hembra"],
      tamanio: ["Pequeño", "Mediano", "Grande"],
      tipo: ["Perro", "Gato"],
      checkbox: false,
      ubicacion: "",
      edad: "",
      imgs: [],
      selectTipo: "",
      selectTamanio: "",
      selectSexo: "",
      descripcion: "",
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate(valid => {
        this.valid = valid;
      });

      let fieldsComplete = this.name.trim() !== "" &&
        this.selectTipo.trim() !== "" &&
        this.selectTamanio.trim() !== "" &&
        this.selectSexo.trim() !== "" &&
        this.descripcion.trim() !== "" &&
        this.imgs.length > 0 &&
        this.edad !== "" &&
        this.ubicacion.trim() !== "";

        console.log(fieldsComplete)
        console.log(this.valid)

      this.valid = this.valid && fieldsComplete;
    },

    reset() {
      this.$refs.form.reset();
    },
    postAnimal() {
      const formData = new FormData();
      formData.append('nombre', this.name);
      formData.append('edad', this.edad);
      formData.append('tipo', this.selectTipo);
      formData.append('tamanio', this.selectTamanio);
      formData.append('sexo', this.selectSexo);
      formData.append('ubicacion', this.ubicacion);
      formData.append('descripcion', this.descripcion);
      formData.append('usuario', localStorage.getItem('name'));
      formData.append('estado', 'activo');

      for (let i = 0; i < this.imgs.length; i++) {
        const file = this.imgs[i];
        formData.append('imagenes', file);
      }

      console.log(formData);

      // Realizar la solicitud POST utilizando Axios con FormData
      this.axios
        .post("/nuevo-animal", formData)
        .then(response => {
          console.log('Animal agregado con éxito:', response.data);
          this.reset();
          window.location.reload();
        })
        .catch(error => {
          console.error('Error al agregar el animal:', error);
        });
    }
  },
};
</script>