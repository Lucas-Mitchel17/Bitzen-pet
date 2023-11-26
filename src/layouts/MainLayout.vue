<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { TheNavbar } from "src/components/ui/unique";

const hasNavbar = ref(true);
const ROUTE = useRoute();

onMounted(() => toggleNavbar());

function toggleNavbar() {
  if (!ROUTE.meta.requiresAuth) {
    hasNavbar.value = false;
  }
}
</script>

<template>
  <q-layout view="hHh Lpr fFf">
    <TheNavbar v-if="hasNavbar" />

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition>
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>

    <q-page-scroller
      position="bottom-right"
      :scroll-offset="150"
      :offset="[18, 18]"
    >
      <q-btn fab icon="keyboard_arrow_up" class="top-btn" />
    </q-page-scroller>
  </q-layout>
</template>

<style lang="scss">
.top-btn {
  background-color: $blue;
  color: white;
}
</style>
