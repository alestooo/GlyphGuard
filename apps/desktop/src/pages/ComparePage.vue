<script setup lang="ts">
import {
  ref,
} from "vue";

import PageTitle from "../components/common/PageTitle.vue";

import {
  compareText,
} from "../services/glyphguard";

import type {
  ComparisonResult,
} from "../types/glyphguard";

const left =
  ref("paypal");

const right =
  ref("раypal");

const result =
  ref<ComparisonResult | null>(
    null,
  );

const loading =
  ref(false);

const error =
  ref("");

async function compare() {
  error.value = "";
  result.value = null;

  if (
    !left.value &&
    !right.value
  ) {
    error.value =
      "Enter at least one string.";

    return;
  }

  loading.value = true;

  try {
    result.value =
      await compareText(
        left.value,
        right.value,
      );
  } catch (cause) {
    console.error(cause);

    error.value =
      "GlyphGuard could not compare the strings.";
  } finally {
    loading.value = false;
  }
}

function valueLabel(
  value: boolean,
) {
  return value
    ? "Yes"
    : "No";
}
</script>

<template>
  <section class="page">
    <PageTitle
      title="Compare"
      subtitle="Compare two strings using Unicode normalization and confusable skeletons."
    />

    <div class="compare-input-grid">
      <article class="panel">
        <span class="panel-label">
          Left
        </span>

        <textarea
          v-model="left"
          class="compare-textarea"
          spellcheck="false"
        />
      </article>

      <article class="panel">
        <span class="panel-label">
          Right
        </span>

        <textarea
          v-model="right"
          class="compare-textarea"
          spellcheck="false"
        />
      </article>
    </div>

    <div class="compare-action">
      <button
        class="primary-button"
        type="button"
        :disabled="loading"
        @click="compare"
      >
        {{
          loading
            ? "Comparing..."
            : "Compare strings"
        }}
      </button>
    </div>

    <p
      v-if="error"
      class="compare-error"
    >
      {{ error }}
    </p>

    <template v-if="result">
      <div class="comparison-summary">
        <article class="panel metric">
          <span>
            Binary equal
          </span>

          <strong>
            {{
              valueLabel(
                result.binaryEqual,
              )
            }}
          </strong>
        </article>

        <article class="panel metric">
          <span>
            NFC equal
          </span>

          <strong>
            {{
              valueLabel(
                result.nfcEqual,
              )
            }}
          </strong>
        </article>

        <article class="panel metric">
          <span>
            NFKC equal
          </span>

          <strong>
            {{
              valueLabel(
                result.nfkcEqual,
              )
            }}
          </strong>
        </article>

        <article class="panel metric">
          <span>
            Skeleton equal
          </span>

          <strong>
            {{
              valueLabel(
                result.confusableSkeletonEqual,
              )
            }}
          </strong>
        </article>
      </div>

      <div class="compare-skeletons">
        <article class="panel">
          <span class="panel-label">
            Left skeleton
          </span>

          <code>
            {{
              result.leftSkeleton
            }}
          </code>
        </article>

        <article class="panel">
          <span class="panel-label">
            Right skeleton
          </span>

          <code>
            {{
              result.rightSkeleton
            }}
          </code>
        </article>
      </div>

      <section
        v-if="
          result.differences.length
        "
        class="difference-list"
      >
        <div class="section-heading">
          Differences

          <span>
            {{
              result.differences.length
            }}
          </span>
        </div>

        <article
          v-for="
            difference
            in result.differences
          "
          :key="
            difference.scalarIndex
          "
          class="
            panel
            difference-card
          "
        >
          <div class="difference-index">
            Position
            {{
              difference.scalarIndex
            }}
          </div>

          <div class="difference-grid">
            <div>
              <span>
                Left
              </span>

              <strong>
                {{
                  difference
                    .leftCharacter ??
                  "<missing>"
                }}
              </strong>

              <code>
                {{
                  difference
                    .leftCodePointLabel ??
                  "—"
                }}
              </code>

              <small>
                {{
                  difference
                    .leftUnicodeName ??
                  "—"
                }}
              </small>
            </div>

            <div>
              <span>
                Right
              </span>

              <strong>
                {{
                  difference
                    .rightCharacter ??
                  "<missing>"
                }}
              </strong>

              <code>
                {{
                  difference
                    .rightCodePointLabel ??
                  "—"
                }}
              </code>

              <small>
                {{
                  difference
                    .rightUnicodeName ??
                  "—"
                }}
              </small>
            </div>
          </div>
        </article>
      </section>

      <article
        v-else
        class="
          panel
          compare-clean
        "
      >
        No scalar differences.
      </article>
    </template>
  </section>
</template>

<style scoped>
.compare-input-grid,
.compare-skeletons,
.comparison-summary {
  display: grid;
  gap: 16px;
}

.compare-input-grid,
.compare-skeletons {
  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );
}

.comparison-summary {
  grid-template-columns:
    repeat(
      4,
      minmax(0, 1fr)
    );

  margin-top: 20px;
}

.compare-textarea {
  width: 100%;
  min-height: 130px;

  margin-top: 10px;
  padding: 14px;

  resize: vertical;

  border:
    1px solid
    var(--border-primary);

  border-radius: 10px;

  outline: none;

  background: #0a1018;
  color: var(--text-primary);

  font-family:
    "Cascadia Code",
    Consolas,
    monospace;
}

.compare-action {
  display: flex;
  justify-content: flex-end;

  margin-top: 16px;
}

.compare-error {
  color: var(--danger);
}

.metric span {
  display: block;

  color: var(--text-muted);

  font-size: 11px;
}

.metric strong {
  display: block;

  margin-top: 7px;

  font-size: 19px;
}

.compare-skeletons {
  margin-top: 16px;
}

.compare-skeletons code {
  display: block;

  margin-top: 8px;
}

.difference-list {
  margin-top: 22px;
}

.section-heading {
  display: flex;
  gap: 8px;

  margin-bottom: 12px;

  font-size: 16px;
  font-weight: 700;
}

.difference-card {
  margin-bottom: 12px;
}

.difference-index {
  margin-bottom: 13px;

  color: var(--accent-primary);

  font-size: 11px;
  font-weight: 800;
}

.difference-grid {
  display: grid;

  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );

  gap: 12px;
}

.difference-grid > div {
  display: flex;
  flex-direction: column;
  gap: 7px;

  padding: 13px;

  border:
    1px solid
    var(--border-primary);

  border-radius: 10px;

  background: var(--bg-muted);
}

.difference-grid span,
.difference-grid small {
  color: var(--text-muted);
}

.difference-grid strong {
  font-size: 24px;
}

.compare-clean {
  margin-top: 16px;

  color: var(--success);
}

@media (
  max-width: 850px
) {
  .comparison-summary {
    grid-template-columns:
      repeat(
        2,
        minmax(0, 1fr)
      );
  }
}

@media (
  max-width: 650px
) {
  .compare-input-grid,
  .compare-skeletons,
  .difference-grid {
    grid-template-columns:
      1fr;
  }
}
</style>