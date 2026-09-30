<script setup lang="ts">
import {
  ref,
} from "vue";

import {
  useI18n,
} from "vue-i18n";

import PageTitle from "../components/common/PageTitle.vue";

import {
  compareText,
} from "../services/glyphguard";

import type {
  ComparisonResult,
} from "../types/glyphguard";

const {
  t,
} = useI18n({
  useScope: "global",
});

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
      t(
        "compare.errors.empty",
      );

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
      t(
        "compare.errors.failed",
      );
  } finally {
    loading.value = false;
  }
}

function valueLabel(
  value: boolean,
) {
  return value
    ? t(
        "common.yes",
      )
    : t(
        "common.no",
      );
}
</script>

<template>
  <section class="page">
    <PageTitle
      :title="
        t(
          'compare.title',
        )
      "
      :subtitle="
        t(
          'compare.subtitle',
        )
      "
    />

    <div class="compare-input-grid">
      <article class="panel">
        <span class="panel-label">
          {{
            t(
              "common.left",
            )
          }}
        </span>

        <textarea
          v-model="left"
          class="compare-textarea"
          spellcheck="false"
        />
      </article>

      <article class="panel">
        <span class="panel-label">
          {{
            t(
              "common.right",
            )
          }}
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
            ? t(
                "compare.comparing",
              )
            : t(
                "compare.compareButton",
              )
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
            {{
              t(
                "compare.binaryEqual",
              )
            }}
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
            {{
              t(
                "compare.nfcEqual",
              )
            }}
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
            {{
              t(
                "compare.nfkcEqual",
              )
            }}
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
            {{
              t(
                "compare.skeletonEqual",
              )
            }}
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
            {{
              t(
                "compare.leftSkeleton",
              )
            }}
          </span>

          <code>
            {{
              result.leftSkeleton
            }}
          </code>
        </article>

        <article class="panel">
          <span class="panel-label">
            {{
              t(
                "compare.rightSkeleton",
              )
            }}
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
          {{
            t(
              "compare.differences",
            )
          }}

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
            {{
              t(
                "compare.position",
                {
                  index:
                    difference.scalarIndex,
                },
              )
            }}
          </div>

          <div class="difference-grid">
            <div>
              <span>
                {{
                  t(
                    "common.left",
                  )
                }}
              </span>

              <strong>
                {{
                  difference.leftCharacter ??
                  t(
                    "common.missing",
                  )
                }}
              </strong>

              <code>
                {{
                  difference.leftCodePointLabel ??
                  "—"
                }}
              </code>

              <small>
                {{
                  difference.leftUnicodeName ??
                  "—"
                }}
              </small>
            </div>

            <div>
              <span>
                {{
                  t(
                    "common.right",
                  )
                }}
              </span>

              <strong>
                {{
                  difference.rightCharacter ??
                  t(
                    "common.missing",
                  )
                }}
              </strong>

              <code>
                {{
                  difference.rightCodePointLabel ??
                  "—"
                }}
              </code>

              <small>
                {{
                  difference.rightUnicodeName ??
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
        {{
          t(
            "compare.noDifferences",
          )
        }}
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
  direction: ltr;
}

.difference-list {
  margin-top: 22px;
}

.section-heading {
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

  background:
    var(--bg-muted);

  color:
    var(--text-primary);
}

.compare-clean {
  margin-top: 16px;
  color: var(--success);
}
</style>