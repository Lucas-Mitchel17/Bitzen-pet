<script setup>
import { ref, watch, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { TheNavbar } from "src/components/ui/unique";

const hasNavbar = ref(true);
const ROUTE = useRoute();

function toggleNavbar() {
  hasNavbar.value =
    ROUTE.meta.requiresAuth !== undefined && ROUTE.meta.requiresAuth;
}

// Call toggleNavbar initially on component mount
onBeforeMount(toggleNavbar);

// Watch for changes in route meta fields
watch(
  () => ROUTE.meta.requiresAuth,
  () => {
    toggleNavbar();
  }
);
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
