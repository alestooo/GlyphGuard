<script setup lang="ts">
import {
  useI18n,
} from "vue-i18n";

import PageTitle from "../components/common/PageTitle.vue";

type PageName =
  | "dashboard"
  | "scan"
  | "files"
  | "compare"
  | "inspector"
  | "normalize"
  | "settings";

const emit =
  defineEmits<{
    navigate: [page: PageName];
  }>();

const {
  t,
} = useI18n({
  useScope: "global",
});

function navigate(
  page: PageName,
) {
  emit(
    "navigate",
    page,
  );
}
</script>

<template>
  <section class="page">
    <PageTitle
      :title="
        t(
          'dashboard.title',
        )
      "
      :subtitle="
        t(
          'dashboard.subtitle',
        )
      "
    />

    <div class="dashboard-grid">
      <article class="panel">
        <div class="panel-label">
          {{
            t(
              "dashboard.quickAction",
            )
          }}
        </div>

        <h2 class="panel-title">
          {{
            t(
              "dashboard.scanTitle",
            )
          }}
        </h2>

        <p class="panel-description">
          {{
            t(
              "dashboard.scanDescription",
            )
          }}
        </p>

        <button
          class="primary-button"
          type="button"
          @click="
            navigate(
              'scan',
            )
          "
        >
          {{
            t(
              "dashboard.openScanner",
            )
          }}
        </button>
      </article>

      <article class="panel">
        <div class="panel-label">
          {{
            t(
              "dashboard.quickAction",
            )
          }}
        </div>

        <h2 class="panel-title">
          {{
            t(
              "dashboard.compareTitle",
            )
          }}
        </h2>

        <p class="panel-description">
          {{
            t(
              "dashboard.compareDescription",
            )
          }}
        </p>

        <button
          class="secondary-button"
          type="button"
          @click="
            navigate(
              'compare',
            )
          "
        >
          {{
            t(
              "dashboard.compareText",
            )
          }}
        </button>
      </article>

      <article
        class="
          panel
          dashboard-status-card
        "
      >
        <div class="panel-label">
          {{
            t(
              "dashboard.engineStatus",
            )
          }}
        </div>

        <h2 class="panel-title">
          GlyphGuard Core
        </h2>

        <div class="status-row">
          <span class="status-dot"></span>

          <span>
            {{
              t(
                "common.ready",
              )
            }}
          </span>
        </div>

        <div class="status-list">
          <span>
            {{
              t(
                "dashboard.mixedScripts",
              )
            }}
          </span>

          <span>
            {{
              t(
                "dashboard.invisibleCharacters",
              )
            }}
          </span>

          <span>
            {{
              t(
                "dashboard.bidiControls",
              )
            }}
          </span>

          <span>
            {{
              t(
                "dashboard.unicodeConfusables",
              )
            }}
          </span>

          <span>
            {{
              t(
                "dashboard.suspiciousWhitespace",
              )
            }}
          </span>
        </div>
      </article>
    </div>
  </section>
</template>