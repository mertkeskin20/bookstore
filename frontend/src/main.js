import "bootstrap/dist/css/bootstrap.min.css";
import "@/assets/styles.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/index.js";
import { createPinia } from "pinia";
import { useBookStore } from "./stores/bookStore";
import { useAuthStore } from "./stores/authStore";
import axios from "axios";
import Toast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";
import { useToast } from "vue-toast-notification";

const toast = useToast();

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faThumbsUp,
  faArrowLeft,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp as farThumbsUp,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";

/* add icons to the library */
library.add(faArrowLeft, faThumbsUp, faPenToSquare, faTrash, farThumbsUp);

const pinia = createPinia();
const authStore = useAuthStore(pinia);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      //Display toast message
      toast.error("Your token has expired, forwarding login page.", {
        position: "top-right",
        timeout: 3000,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
      setTimeout(() => {
        authStore.logout();
        router.push("/login");
      }, 3000);
    }
  }
);

const storedUser = localStorage.getItem("user");

if (storedUser) {
  const userData = JSON.parse(storedUser);
  useAuthStore(pinia).user = userData.user;

  const token = userData.token;

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}

const bookStore = useBookStore(pinia);

bookStore.fetchBooks().then(() => {
  const app = createApp(App);
  app
    .use(pinia)
    .use(router)
    .component("font-awesome-icon", FontAwesomeIcon)
    .use(Toast)
    .mount("#app");
});
