<script setup lang="ts">
import {
  ref,
} from "vue";

import AppLayout from "./components/layout/AppLayout.vue";

import ComparePage from "./pages/ComparePage.vue";
import DashboardPage from "./pages/DashboardPage.vue";
import FilesPage from "./pages/FilesPage.vue";
import InspectorPage from "./pages/InspectorPage.vue";
import NormalizePage from "./pages/NormalizePage.vue";
import ScanPage from "./pages/ScanPage.vue";
import SettingsPage from "./pages/SettingsPage.vue";

type PageName =
  | "dashboard"
  | "scan"
  | "files"
  | "compare"
  | "inspector"
  | "normalize"
  | "settings";

const activePage =
  ref<PageName>(
    "dashboard",
  );

function setActivePage(
  page: PageName,
) {
  activePage.value = page;
}
</script>

<template>
  <AppLayout
    :active-page="activePage"
    @navigate="setActivePage"
  >
    <DashboardPage
      v-if="
        activePage ===
        'dashboard'
      "
      @navigate="setActivePage"
    />

    <ScanPage
      v-else-if="
        activePage ===
        'scan'
      "
    />

    <FilesPage
      v-else-if="
        activePage ===
        'files'
      "
    />

    <ComparePage
      v-else-if="
        activePage ===
        'compare'
      "
    />

    <InspectorPage
      v-else-if="
        activePage ===
        'inspector'
      "
    />

    <NormalizePage
      v-else-if="
        activePage ===
        'normalize'
      "
    />

    <SettingsPage
      v-else
    />
  </AppLayout>
</template>