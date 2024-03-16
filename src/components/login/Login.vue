<template>
  <div class="main-box bg-white pa-4">
    <!----------- Box heading text -------------->
    <h2 class="text-h4 text-center">Login</h2>
    <!----------- Form box Start -------------------->
    <div>
      <v-form @submit.prevent="submitLogin">
        <!-----username field-------->
        <v-text-field
          class="mt-8"
          label="Username"
          v-model="user.username"
          :rules="[(v) => !!v || 'Field is required']"
        />
        <!--------password field---------->
        <v-text-field
          class="mt-4"
          v-model="user.password"
          :rules="[(v) => !!v || 'Field is required']"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          hint="At least 8 characters"
          counter
          @click:append="show1 = !show1"
        ></v-text-field>
        <!----------submit btn--------->

        <v-btn
          type="submit"
          class="w-100 mt-2 mb-3"
          color="black"
          prepend-icon="mdi-arrow-right-bold-outline"
          :disabled="disable"
        >
          Submit
        </v-btn>
      </v-form>

      <a href="#" class="text-blue mt-8">Forgot your password?</a>

      <!----------snackbar---------->
      <v-snackbar v-model="snackbar" :timeout="4000" color="red" elevation="24">
        <strong>Something Went Wrong, Try Again!!</strong
        >
      </v-snackbar>
    </div>
    <!----------- Form box end -------------------->
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import {axios, axiosLogin} from "../../store/index.js" ;
import { useRouter } from "vue-router";
import Axios from "axios";

const disable = ref(false);

const user = reactive({
  username: null,
  password: null,
});

// for showing password in field
const show1 = ref(false);
//snackbar ---- change it to true then its open
const snackbar = ref(false);

//form data setup
const formData = new FormData();

const router = useRouter();

// submit login function
const submitLogin = () => {
  disable.value = true;
  // appending form data
  formData.append("username", user.username);
  formData.append("password", user.password);

axios.post("auths/token", formData)
    .then((res) => {
      disable.value = false;
      localStorage.setItem("token", res.data.access_token);
      axios.interceptors.request.use(function (config) {
        config.headers.Authorization = "Bearer "+localStorage.getItem("token");
        return config;
      });
      router.push("/status");
    })
    .catch((err) => {
      disable.value = false;
      console.log(err);
      snackbar.value = true;
    });

};

</script>

<style scoped>
.main-box {
  width: 400px;
  height: 350px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}
</style>
