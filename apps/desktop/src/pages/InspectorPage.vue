<script setup lang="ts">
import {
  ref,
} from "vue";

import {
  useI18n,
} from "vue-i18n";

import PageTitle from "../components/common/PageTitle.vue";

import {
  inspectText,
} from "../services/glyphguard";

import type {
  InspectResult,
} from "../types/glyphguard";

const {
  t,
} = useI18n({
  useScope: "global",
});

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
      t(
        "inspector.errors.failed",
      );
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="page">
    <PageTitle
      :title="
        t(
          'inspector.title',
        )
      "
      :subtitle="
        t(
          'inspector.subtitle',
        )
      "
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
              ? t(
                  "inspector.inspecting",
                )
              : t(
                  "inspector.inspectButton",
                )
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
          {{
            t(
              "inspector.scalars",
            )
          }}

          <span>
            {{
              result.scalars.length
            }}
          </span>
        </h2>

        <div class="scalar-grid">
          <article
            v-for="
              scalar in result.scalars
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
                t(
                  "common.unknown",
                )
              }}
            </span>

            <code>
              UTF-8
              {{
                scalar.utf8Hex
              }}
            </code>

            <small>
              {{
                t(
                  "inspector.scalarPosition",
                  {
                    scalar:
                      scalar.scalarIndex,
                    byte:
                      scalar.byteIndex,
                  },
                )
              }}
            </small>
          </article>
        </div>
      </section>

      <section class="inspect-section">
        <h2>
          {{
            t(
              "inspector.graphemes",
            )
          }}

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
              {{
                t(
                  "inspector.graphemeIndex",
                  {
                    index:
                      grapheme.graphemeIndex,
                  },
                )
              }}
            </div>

            <span>
              {{
                t(
                  "inspector.scalarCount",
                  {
                    count:
                      grapheme.scalarCount,
                  },
                )
              }}
            </span>

            <span>
              {{
                t(
                  "inspector.byteCount",
                  {
                    count:
                      grapheme.byteLength,
                  },
                )
              }}
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

  background:
    var(--input-bg);

  color:
    var(--text-primary);

  font-family:
    "Cascadia Code",
    Consolas,
    monospace;

  direction: ltr;

  transition:
    background-color 160ms ease,
    color 160ms ease,
    border-color 160ms ease;
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
</style>