<script setup>
import { onMounted } from "vue";
import { useUserStore } from "src/stores";

const USER_STORE = useUserStore();

onMounted(() => {
  USER_STORE.refreshTokenUser();
});
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
