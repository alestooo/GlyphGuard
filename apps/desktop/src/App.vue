<script setup lang="ts">
import {
  ref,
} from "vue";

import AppLayout from "./components/layout/AppLayout.vue";
import PageTitle from "./components/common/PageTitle.vue";

import ComparePage from "./pages/ComparePage.vue";
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
    <section
      v-if="
        activePage ===
        'dashboard'
      "
      class="page"
    >
      <PageTitle
        title="Dashboard"
        subtitle="Overview of your Unicode security workspace."
      />

      <div class="dashboard-grid">
        <article class="panel">
          <div class="panel-label">
            Quick action
          </div>

          <h2 class="panel-title">
            Scan text
          </h2>

          <p class="panel-description">
            Paste suspicious or
            multilingual text and
            inspect Unicode security
            findings.
          </p>

          <button
            class="primary-button"
            type="button"
            @click="
              setActivePage(
                'scan',
              )
            "
          >
            Open scanner
          </button>
        </article>

        <article class="panel">
          <div class="panel-label">
            Quick action
          </div>

          <h2 class="panel-title">
            Compare strings
          </h2>

          <p class="panel-description">
            Compare Unicode values,
            normalization forms and
            confusable skeletons.
          </p>

          <button
            class="secondary-button"
            type="button"
            @click="
              setActivePage(
                'compare',
              )
            "
          >
            Compare text
          </button>
        </article>

        <article
          class="
            panel
            dashboard-status-card
          "
        >
          <div class="panel-label">
            Engine status
          </div>

          <h2 class="panel-title">
            GlyphGuard Core
          </h2>

          <div class="status-row">
            <span
              class="status-dot"
            ></span>

            <span>
              Ready
            </span>
          </div>

          <div class="status-list">
            <span>
              Mixed scripts
            </span>

            <span>
              Invisible characters
            </span>

            <span>
              Bidi controls
            </span>

            <span>
              Unicode confusables
            </span>

            <span>
              Suspicious whitespace
            </span>
          </div>
        </article>
      </div>
    </section>

    <ScanPage
      v-else-if="
        activePage === 'scan'
      "
    />

    <FilesPage
      v-else-if="
        activePage === 'files'
      "
    />

    <ComparePage
      v-else-if="
        activePage === 'compare'
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