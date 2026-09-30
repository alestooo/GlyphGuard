<script setup lang="ts">
import {
  ref,
} from "vue";

import {
  useI18n,
} from "vue-i18n";

import PageTitle from "../components/common/PageTitle.vue";

import {
  normalizeText,
} from "../services/glyphguard";

import type {
  NormalizationResult,
} from "../types/glyphguard";

const {
  t,
} = useI18n({
  useScope: "global",
});

const text =
  ref("é");

const result =
  ref<NormalizationResult | null>(
    null,
  );

const loading =
  ref(false);

const error =
  ref("");

async function runNormalize() {
  error.value = "";

  if (!text.value) {
    result.value = null;
    return;
  }

  loading.value = true;

  try {
    result.value =
      await normalizeText(
        text.value,
      );
  } catch (cause) {
    console.error(cause);

    error.value =
      t(
        "normalize.errors.failed",
      );
  } finally {
    loading.value = false;
  }
}

function changeLabel(
  value: boolean,
) {
  return value
    ? t(
        "common.changed",
      )
    : t(
        "common.unchanged",
      );
}
</script>

<template>
  <section class="page">
    <PageTitle
      :title="
        t(
          'normalize.title',
        )
      "
      :subtitle="
        t(
          'normalize.subtitle',
        )
      "
    />

    <article class="panel">
      <textarea
        v-model="text"
        class="normalize-textarea"
        spellcheck="false"
      />

      <div class="normalize-actions">
        <button
          class="primary-button"
          type="button"
          :disabled="loading"
          @click="runNormalize"
        >
          {{
            loading
              ? t(
                  "normalize.normalizing",
                )
              : t(
                  "normalize.normalizeButton",
                )
          }}
        </button>
      </div>
    </article>

    <p
      v-if="error"
      class="normalize-error"
    >
      {{ error }}
    </p>

    <div
      v-if="result"
      class="normalization-grid"
    >
      <article
        class="
          panel
          normalization-card
        "
      >
        <span class="panel-label">
          {{
            t(
              "normalize.original",
            )
          }}
        </span>

        <strong>
          {{
            result.original
          }}
        </strong>
      </article>

      <article
        v-for="
          item in [
            {
              name: 'NFC',
              value: result.nfc,
              changed: result.nfcChanged,
            },
            {
              name: 'NFD',
              value: result.nfd,
              changed: result.nfdChanged,
            },
            {
              name: 'NFKC',
              value: result.nfkc,
              changed: result.nfkcChanged,
            },
            {
              name: 'NFKD',
              value: result.nfkd,
              changed: result.nfkdChanged,
            },
          ]
        "
        :key="item.name"
        class="
          panel
          normalization-card
        "
      >
        <div class="normalization-header">
          <span class="panel-label">
            {{ item.name }}
          </span>

          <span>
            {{
              changeLabel(
                item.changed,
              )
            }}
          </span>
        </div>

        <strong>
          {{ item.value }}
        </strong>
      </article>
    </div>
  </section>
</template>

<style scoped>
.normalize-textarea {
  width: 100%;
  min-height: 130px;
  padding: 15px;
  border: 1px solid var(--border-primary);
  border-radius: 10px;
  resize: vertical;
  outline: none;
  background: #0a1018;
  color: var(--text-primary);
  font-family:
    "Cascadia Code",
    Consolas,
    monospace;
  direction: ltr;
}

.normalize-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 14px;
}

.normalize-error {
  color: var(--danger);
}

.normalization-grid {
  display: grid;
  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );
  gap: 14px;
  margin-top: 18px;
}

.normalization-card strong {
  display: block;
  margin-top: 12px;
  overflow-wrap: anywhere;
  font-family:
    "Cascadia Code",
    Consolas,
    monospace;
  direction: ltr;
}

.normalization-header {
  display: flex;
  justify-content: space-between;
}
</style>