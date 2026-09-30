<script setup lang="ts">
import Header from "./Header.vue";
import Sidebar from "./Sidebar.vue";

type PageName =
  | "dashboard"
  | "scan"
  | "files"
  | "compare"
  | "inspector"
  | "normalize"
  | "settings";

defineProps<{
  activePage: PageName;
}>();

const emit = defineEmits<{
  navigate: [page: PageName];
}>();
</script>

<template>
  <div class="app-shell">
    <Sidebar
      :active-page="activePage"
      @navigate="emit('navigate', $event)"
    />

    <div class="app-main">
      <Header />

      <main class="app-content">
        <slot />
      </main>
    </div>
  </div>
</template>