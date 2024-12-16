<template>
    <h1>{{ user.username }}</h1>
    <h1>{{ user.email }}</h1>
</template>

<script>
import { useAuthStore } from "@/stores/authStore";
import { mapState } from "pinia";

    export default {
        name: "DashboardView",
        computed:{
            ...mapState(useAuthStore,['user']),
        }
    }
</script>

<style lang="scss" scoped></style>