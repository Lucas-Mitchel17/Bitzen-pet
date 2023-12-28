<script setup>
import { ref, watch, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { TheNavbar } from "src/components/ui/unique";

const ROUTE = useRoute();

const hasNavbar = ref(true);
const pageTitle = ref("");

function toggleNavbar() {
  hasNavbar.value =
    ROUTE.meta.requiresAuth !== undefined && ROUTE.meta.requiresAuth;
}

function getPageTitle() {
  pageTitle.value = ROUTE.meta.name || "";
}

onBeforeMount(() => {
  toggleNavbar();
  getPageTitle();
});

watch(
  () => ROUTE.meta.requiresAuth,
  () => {
    toggleNavbar();
  }
);

watch(
  () => ROUTE.meta.name,
  () => {
    getPageTitle();
  }
);
</script>

<template>
  <q-layout view="hHh Lpr fFf" class="main-layout">
    <TheNavbar v-if="hasNavbar" :pageTitle="pageTitle" />

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
.main-layout {
  background-color: $background;
}
</style>
