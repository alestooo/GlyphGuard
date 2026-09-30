<script setup lang="ts">
import {
  ref,
} from "vue";

import PageTitle from "../components/common/PageTitle.vue";

import {
  inspectText,
} from "../services/glyphguard";

import type {
  InspectResult,
} from "../types/glyphguard";

const text =
  ref("👨‍💻 café");

const result =
  ref<InspectResult | null>(
    null,
  );

const loading =
  ref(false);

const error =
  ref("");

async function inspect() {
  error.value = "";

  if (!text.value) {
    result.value = null;
    return;
  }

  loading.value = true;

  try {
    result.value =
      await inspectText(
        text.value,
      );
  } catch (cause) {
    console.error(cause);

    error.value =
      "GlyphGuard could not inspect this text.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="page">
    <PageTitle
      title="Inspector"
      subtitle="Inspect Unicode scalars, code points, bytes and grapheme clusters."
    />

    <article class="panel">
      <textarea
        v-model="text"
        class="inspect-textarea"
        spellcheck="false"
      />

      <div class="inspect-actions">
        <button
          class="primary-button"
          type="button"
          :disabled="loading"
          @click="inspect"
        >
          {{
            loading
              ? "Inspecting..."
              : "Inspect text"
          }}
        </button>
      </div>
    </article>

    <p
      v-if="error"
      class="inspect-error"
    >
      {{ error }}
    </p>

    <template v-if="result">
      <section class="inspect-section">
        <h2>
          Scalars
          <span>
            {{
              result.scalars.length
            }}
          </span>
        </h2>

        <div class="scalar-grid">
          <article
            v-for="
              scalar
              in result.scalars
            "
            :key="
              scalar.scalarIndex
            "
            class="
              panel
              scalar-card
            "
          >
            <div class="scalar-character">
              {{
                scalar.character
              }}
            </div>

            <strong>
              {{
                scalar.codePointLabel
              }}
            </strong>

            <span>
              {{
                scalar.unicodeName ??
                "Unknown Unicode name"
              }}
            </span>

            <code>
              UTF-8
              {{
                scalar.utf8Hex
              }}
            </code>

            <small>
              scalar
              {{
                scalar.scalarIndex
              }}
              · byte
              {{
                scalar.byteIndex
              }}
            </small>
          </article>
        </div>
      </section>

      <section class="inspect-section">
        <h2>
          Grapheme clusters
          <span>
            {{
              result.graphemes.length
            }}
          </span>
        </h2>

        <div class="grapheme-list">
          <article
            v-for="
              grapheme
              in result.graphemes
            "
            :key="
              grapheme.graphemeIndex
            "
            class="
              panel
              grapheme-card
            "
          >
            <strong>
              {{
                grapheme.value
              }}
            </strong>

            <div>
              Grapheme
              {{
                grapheme
                  .graphemeIndex
              }}
            </div>

            <span>
              {{
                grapheme.scalarCount
              }}
              scalar(s)
            </span>

            <span>
              {{
                grapheme.byteLength
              }}
              byte(s)
            </span>
          </article>
        </div>
      </section>
    </template>
  </section>
</template>

<style scoped>
.inspect-textarea {
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

  font-size: 15px;
}

.inspect-actions {
  display: flex;
  justify-content: flex-end;

  margin-top: 14px;
}

.inspect-error {
  color: var(--danger);
}

.inspect-section {
  margin-top: 24px;
}

.inspect-section h2 {
  font-size: 17px;
}

.inspect-section h2 span {
  color: var(--text-muted);
}

.scalar-grid {
  display: grid;

  grid-template-columns:
    repeat(
      auto-fill,
      minmax(220px, 1fr)
    );

  gap: 12px;
}

.scalar-card {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.scalar-character {
  font-size: 30px;
}

.scalar-card span,
.scalar-card small {
  color: var(--text-muted);
}

.grapheme-list {
  display: grid;

  grid-template-columns:
    repeat(
      auto-fill,
      minmax(180px, 1fr)
    );

  gap: 12px;
}

.grapheme-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.grapheme-card strong {
  font-size: 28px;
}

.grapheme-card span {
  color: var(--text-secondary);
  font-size: 11px;
}
</style>