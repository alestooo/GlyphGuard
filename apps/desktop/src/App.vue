<script setup lang="ts">
import { ref } from "vue";

import AppLayout from "./components/layout/AppLayout.vue";
import PageTitle from "./components/common/PageTitle.vue";

type PageName =
  | "dashboard"
  | "scan"
  | "files"
  | "compare"
  | "inspector"
  | "normalize"
  | "settings";

const activePage = ref<PageName>("dashboard");

function setActivePage(page: PageName) {
  activePage.value = page;
}
</script>

<template>
  <AppLayout
    :active-page="activePage"
    @navigate="setActivePage"
  >
    <template #default>
      <section v-if="activePage === 'dashboard'" class="page">
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
              Paste suspicious or multilingual text and inspect
              Unicode security findings.
            </p>

            <button
              class="primary-button"
              type="button"
              @click="setActivePage('scan')"
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
              Compare Unicode values, normalization forms and
              confusable skeletons.
            </p>

            <button
              class="secondary-button"
              type="button"
              @click="setActivePage('compare')"
            >
              Compare text
            </button>
          </article>

          <article class="panel dashboard-status-card">
            <div class="panel-label">
              Engine status
            </div>

            <h2 class="panel-title">
              GlyphGuard Core
            </h2>

            <div class="status-row">
              <span class="status-dot"></span>
              <span>Ready</span>
            </div>

            <div class="status-list">
              <span>Mixed scripts</span>
              <span>Invisible characters</span>
              <span>Bidi controls</span>
              <span>Unicode confusables</span>
              <span>Suspicious whitespace</span>
            </div>
          </article>
        </div>
      </section>

      <section v-else-if="activePage === 'scan'" class="page">
        <PageTitle
          title="Scan Text"
          subtitle="Analyze text for suspicious Unicode characters and script combinations."
        />

        <div class="panel placeholder-panel">
          <h2>Text scanner</h2>

          <p>
            This page will connect to
            <code>glyphguard-core::rules::scan_text()</code>.
          </p>
        </div>
      </section>

      <section v-else-if="activePage === 'files'" class="page">
        <PageTitle
          title="Files"
          subtitle="Inspect UTF-8 text files for Unicode security findings."
        />

        <div class="panel placeholder-panel">
          <h2>File scanner</h2>

          <p>
            Drag and drop support and file findings will be
            connected here.
          </p>
        </div>
      </section>

      <section v-else-if="activePage === 'compare'" class="page">
        <PageTitle
          title="Compare"
          subtitle="Compare two strings at the Unicode level."
        />

        <div class="panel placeholder-panel">
          <h2>Unicode comparison</h2>

          <p>
            This page will use
            <code>compare_strings()</code>
            from GlyphGuard Core.
          </p>
        </div>
      </section>

      <section v-else-if="activePage === 'inspector'" class="page">
        <PageTitle
          title="Inspector"
          subtitle="Inspect code points, UTF-8 bytes and grapheme clusters."
        />

        <div class="panel placeholder-panel">
          <h2>Unicode inspector</h2>

          <p>
            Scalar and grapheme information will appear here.
          </p>
        </div>
      </section>

      <section v-else-if="activePage === 'normalize'" class="page">
        <PageTitle
          title="Normalize"
          subtitle="Inspect NFC, NFD, NFKC and NFKD representations."
        />

        <div class="panel placeholder-panel">
          <h2>Normalization</h2>

          <p>
            Unicode normalization results will appear here.
          </p>
        </div>
      </section>

      <section v-else class="page">
        <PageTitle
          title="Settings"
          subtitle="Configure the GlyphGuard desktop experience."
        />

        <div class="panel placeholder-panel">
          <h2>Settings</h2>

          <p>
            Rule configuration and appearance settings will be
            added later.
          </p>
        </div>
      </section>
    </template>
  </AppLayout>
</template>