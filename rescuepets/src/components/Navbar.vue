<template>
    <v-app-bar color="primary" scroll-behavior="hide">
        <v-app-bar-title style="display: flex; align-items: center;">
            <font-awesome-icon @click="redirectToHome" icon="shield-dog" style="color:#FFF;" class="iconHome"
                size="2x" />
            <!-- <v-icon color="#0077b6">fas fa-paw</v-icon> -->
        </v-app-bar-title>

        <v-spacer></v-spacer>
        <v-col cols="auto">
            <v-btn class="btn--menu flat" color="primaryDark" @click="redirectToDonation"> Dona </v-btn>
        </v-col>
        <v-col cols="auto">
            <v-btn class="btn--menu flat" color="primaryDark" @click="redirectToAdopt"> Adopta </v-btn>
        </v-col>
        <v-col cols="auto">
            <v-btn class="btn--menu flat" color="primaryDark" @click="redirectToLogin"> {{ textLogin }} </v-btn>
        </v-col>
    </v-app-bar>
</template>
<style>
.btn--menu.flat {
    border: none;
    color: #fff !important;
    padding: 0.5rem 1rem;
    transition: background-color 0.3s ease-in-out;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0);
}

.btn--menu.flat:hover {
    background-color: rgba(0, 0, 0, 0.1);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
}

.iconHome:hover {
    cursor: pointer;
}
</style>
<script>
export default {
    data(){
        return {
            textLogin: ""
        }
    },
    mounted() {
        this.textLogin = localStorage.getItem("name") && localStorage.getItem("token") ? "Cuenta" : "Iniciar Sesión";
    },
    methods: {
        redirectToHome() {
            this.$router.push('/');
        },
        redirectToAdopt() {
            this.$router.push('/adoptar');
        },
        redirectToLogin() {
            if (localStorage.getItem("name") && localStorage.getItem("token")) {
                this.$router.push('/cuenta');
            } else {
                this.$router.push('/login');
            }
        },
        redirectToDonation(){
            window.location.href = "https://paypal.me/santiagocardenas789?country.x=CO&locale.x=es_XC";
        }
    }
};
</script>
