<script setup lang="ts">
import {
  ref,
} from "vue";

import PageTitle from "../components/common/PageTitle.vue";

import {
  normalizeText,
} from "../services/glyphguard";

import type {
  NormalizationResult,
} from "../types/glyphguard";

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
      "GlyphGuard could not normalize this text.";
  } finally {
    loading.value = false;
  }
}

function yesNo(
  value: boolean,
) {
  return value
    ? "Changed"
    : "Unchanged";
}
</script>

<template>
  <section class="page">
    <PageTitle
      title="Normalize"
      subtitle="Inspect NFC, NFD, NFKC and NFKD representations."
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
              ? "Normalizing..."
              : "Normalize text"
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
      <article class="panel normalization-card">
        <span class="panel-label">
          Original
        </span>

        <strong>
          {{ result.original }}
        </strong>
      </article>

      <article class="panel normalization-card">
        <div class="normalization-header">
          <span class="panel-label">
            NFC
          </span>

          <span>
            {{
              yesNo(
                result.nfcChanged,
              )
            }}
          </span>
        </div>

        <strong>
          {{ result.nfc }}
        </strong>
      </article>

      <article class="panel normalization-card">
        <div class="normalization-header">
          <span class="panel-label">
            NFD
          </span>

          <span>
            {{
              yesNo(
                result.nfdChanged,
              )
            }}
          </span>
        </div>

        <strong>
          {{ result.nfd }}
        </strong>
      </article>

      <article class="panel normalization-card">
        <div class="normalization-header">
          <span class="panel-label">
            NFKC
          </span>

          <span>
            {{
              yesNo(
                result.nfkcChanged,
              )
            }}
          </span>
        </div>

        <strong>
          {{ result.nfkc }}
        </strong>
      </article>

      <article class="panel normalization-card">
        <div class="normalization-header">
          <span class="panel-label">
            NFKD
          </span>

          <span>
            {{
              yesNo(
                result.nfkdChanged,
              )
            }}
          </span>
        </div>

        <strong>
          {{ result.nfkd }}
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

  border:
    1px solid
    var(--border-primary);

  border-radius: 10px;

  resize: vertical;
  outline: none;

  background: #0a1018;
  color: var(--text-primary);

  font-family:
    "Cascadia Code",
    Consolas,
    monospace;
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

  font-size: 21px;
}

.normalization-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.normalization-header > span:last-child {
  color: var(--text-muted);

  font-size: 10px;
}

@media (
  max-width: 700px
) {
  .normalization-grid {
    grid-template-columns: 1fr;
  }
}
</style>