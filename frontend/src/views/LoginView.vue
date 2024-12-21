<template>
  <section class="full-section-height">
    <div class="container">
      <div class="d-flex justify-content-center">
        <h1>Login</h1>
      </div>
      <form @submit.prevent="submitForm">
        <div class="row justify-content-center">
          <!-- Email Field (Medium and Larger Screens) -->
          <div class="col-md-6 col-8 mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              v-model.lazy.trim="formData.email"
              required
              autocomplete="off"
              :class="{
                'is-valid': isEmailValid,
                'is-invalid':
                  (!isEmailValid && showEmailWarningMessage) ||
                  notFoundEmail === formData.email,
              }"
              @focus="showEmailWarningMessage = true"
              @blur="showEmailWarningMessage = false"
            />
            <span
              v-if="showEmailWarningMessage && !isEmailValid"
              class="text-danger small"
              >Please provide a valid email!</span
            >
            <span
              v-if="notFoundEmail === formData.email"
              class="text-danger small"
              >{{ `${notFoundEmail} is not found!` }}</span
            >
          </div>
        </div>

        <!-- Password Field -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              name="password"
              v-model.lazy.trim="formData.password"
              required
              :class="{
                'is-valid': isPasswordValid,
                'is-invalid':
                  (!isPasswordValid && showPasswordWarningMessage) ||
                  !isPasswordMatch,
              }"
              @focus="showPasswordWarningMessage = true"
              @blur="showPasswordWarningMessage = false"
              @input="isPasswordMatch = true"
            />
            <span
              v-if="showPasswordWarningMessage && !isPasswordValid"
              class="text-danger small"
              >Password must be between 4 and 10 characters!</span
            >
            <span v-if="!isPasswordMatch" class="text-danger small"
              >Password is not true!</span
            >
          </div>
        </div>

        <!-- Submit Button -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <button type="submit" class="btn btn-primary w-100">Login</button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { useAuthStore } from "@/stores/authStore";
import { faLess } from "@fortawesome/free-brands-svg-icons";
import { mapActions } from "pinia";
import { useToast } from "vue-toast-notification";

export default {
  name: "LoginView",
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
      showEmailWarningMessage: false,
      showPasswordWarningMessage: false,
      notFoundEmail: null,
      isPasswordMatch: true,
    };
  },
  methods: {
    ...mapActions(useAuthStore, ["login"]),
    async submitForm() {
      try {
        await this.login(this.formData);

        const toast = useToast();

        toast.success("You will be redirected to the dashboard page.", {
          position: "top-right",
          timeout: 3500,
          closeButton: "button",
          icon: "fas fa-rocket",
        });

        setTimeout(() => {
          this.$router.push("/dashboard");
        }, 3000);
      } catch (data) {
        const { error } = data;

        if (error === "User not found!") {
          this.notFoundEmail = this.formData.email;
        } else if (error === "Password is not true!") {
          this.isPasswordMatch = false;
        }
      }
    },
  },

  computed: {
    isFormValid() {
      return this.isEmailValid && this.isPasswordValid;
    },
    isEmailValid() {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email);
    },
    isPasswordValid() {
      return (
        this.formData.password.length >= 4 &&
        this.formData.password.length <= 10
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
