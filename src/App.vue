<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { api } from "boot/axios";
import { Notify } from "quasar";
import { useUserStore } from "src/stores";

const USER_STORE = useUserStore();
const ROUTER = useRouter();
const ROUTE = useRoute();

onMounted(() => {
  // const token = localStorage.getItem("AUTH_TOKEN");
  // setToken(token);
  // validateAuth(token);
  USER_STORE.refreshTokenUser();
});

// function setToken(token) {
//   api.defaults.headers.common["Authorization"] = "Bearer " + token;
// }

// function validateAuth(token) {
//   if (ROUTE.meta.requiresAuth && !token) {
//     Notify.create({
//       type: "negative",
//       message: "Você precisa fazer o login para acessar esta página.",
//     });
//     ROUTER.push("/entrar");
//   }
// }
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition>
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
