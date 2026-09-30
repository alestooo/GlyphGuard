<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>

<template>
  <div class="page-title-block">
    <div>
      <h1 class="page-title">
        {{ title }}
      </h1>

      <p
        v-if="subtitle"
        class="page-subtitle"
      >
        {{ subtitle }}
      </p>
    </div>

    <slot name="actions" />
  </div>
</template>