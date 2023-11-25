<script setup>
import { computed } from "vue";
import { TAGS_ENUM } from "./types";

const props = defineProps({
  tag: {
    type: String,
    default: "p",
    validator: (value) => Object.values(TAGS_ENUM).includes(value),
  },
});

const classes = computed(() => {
  const defaultTextClass = `text-${props.tag}`;

  return [defaultTextClass];
});
</script>

<template>
  <component :is="tag" :class="classes" class="text">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.text {
  line-height: 1.15;
  margin: 0;
}
.text-h1 {
  font-size: 35px;
  color: $neutral900;
  margin: 40px 0 0;
  font-weight: 600;
  line-height: 60px;

  @media (min-width: $md) {
    font-size: 40px;
  }
}

.text-h2 {
  font-size: 24px;
  font-weight: 600;
  line-height: 36px;
}

.text-h3 {
  font-size: 30px;
  margin: 0 0 10px;
}
.text-h4 {
  font-size: 20px;
  margin: 0 0 10px;
}

.is-blue {
  color: $blue;
}
</style>
