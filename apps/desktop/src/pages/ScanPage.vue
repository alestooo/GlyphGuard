<script setup lang="ts">
import {
  computed,
  ref,
} from "vue";

import {
  useI18n,
} from "vue-i18n";

import PageTitle from "../components/common/PageTitle.vue";

import {
  scanText,
} from "../services/glyphguard";

import type {
  Finding,
} from "../types/glyphguard";

const {
  t,
} = useI18n({
  useScope: "global",
});

const text =
  ref("");

const findings =
  ref<Finding[]>([]);

const isScanning =
  ref(false);

const errorMessage =
  ref("");

const hasScanned =
  ref(false);

const findingCount =
  computed(
    () =>
      findings.value.length,
  );

async function runScan() {
  errorMessage.value = "";
  findings.value = [];
  hasScanned.value = false;

  if (!text.value) {
    errorMessage.value =
      t(
        "scan.errors.empty",
      );

    return;
  }

  isScanning.value = true;

  try {
    findings.value =
      await scanText(
        text.value,
      );

    hasScanned.value = true;
  } catch (error) {
    console.error(error);

    errorMessage.value =
      t(
        "scan.errors.failed",
      );
  } finally {
    isScanning.value = false;
  }
}

function clearText() {
  text.value = "";
  findings.value = [];
  hasScanned.value = false;
  errorMessage.value = "";
}

function severityClass(
  severity: Finding["severity"],
) {
  return `finding-severity-${severity.toLowerCase()}`;
}
</script>

<template>
  <section class="page">
    <PageTitle
      :title="
        t(
          'scan.title',
        )
      "
      :subtitle="
        t(
          'scan.subtitle',
        )
      "
    />

    <div class="scan-layout">
      <section
        class="
          panel
          scan-input-panel
        "
      >
        <div class="scan-input-header">
          <div>
            <span class="panel-label">
              {{
                t(
                  "scan.input",
                )
              }}
            </span>

            <h2 class="panel-title">
              {{
                t(
                  "scan.textToAnalyze",
                )
              }}
            </h2>
          </div>

          <button
            v-if="text"
            class="scan-clear-button"
            type="button"
            @click="clearText"
          >
            {{
              t(
                "common.clear",
              )
            }}
          </button>
        </div>

        <textarea
          v-model="text"
          class="scan-textarea"
          spellcheck="false"
          :placeholder="
            t(
              'scan.placeholder',
            )
          "
        />

        <div class="scan-actions">
          <span class="scan-character-count">
            {{
              t(
                "scan.characters",
                {
                  count:
                    text.length,
                },
              )
            }}
          </span>

          <button
            class="primary-button"
            type="button"
            :disabled="isScanning"
            @click="runScan"
          >
            {{
              isScanning
                ? t(
                    "common.scanning",
                  )
                : t(
                    "scan.scanButton",
                  )
            }}
          </button>
        </div>
      </section>

      <p
        v-if="errorMessage"
        class="scan-error"
      >
        {{ errorMessage }}
      </p>

      <section
        v-if="
          hasScanned &&
          findingCount === 0
        "
        class="
          panel
          scan-clean-result
        "
      >
        <div class="scan-clean-icon">
          ✓
        </div>

        <div>
          <span class="panel-label">
            {{
              t(
                "scan.complete",
              )
            }}
          </span>

          <h2 class="panel-title">
            {{
              t(
                "scan.noFindings",
              )
            }}
          </h2>

          <p class="panel-description">
            {{
              t(
                "scan.noFindingsDescription",
              )
            }}
          </p>
        </div>
      </section>

      <section
        v-if="findingCount > 0"
        class="scan-results"
      >
        <div class="scan-results-header">
          <div>
            <span class="panel-label">
              {{
                t(
                  "common.results",
                )
              }}
            </span>

            <h2 class="panel-title">
              {{
                t(
                  "scan.findingCount",
                  {
                    count:
                      findingCount,
                  },
                )
              }}
            </h2>
          </div>
        </div>

        <article
          v-for="
            finding in findings
          "
          :key="
            `${finding.ruleId}-${finding.byteIndex}-${finding.codePoint}`
          "
          class="
            panel
            finding-card
          "
        >
          <div class="finding-card-header">
            <div class="finding-rule">
              {{
                finding.ruleId
              }}
            </div>

            <span
              class="finding-severity"
              :class="
                severityClass(
                  finding.severity,
                )
              "
            >
              {{
                finding.severity
              }}
            </span>
          </div>

          <h3 class="finding-message">
            {{
              finding.message
            }}
          </h3>

          <div class="finding-details">
            <div class="finding-detail">
              <span>
                {{
                  t(
                    "common.character",
                  )
                }}
              </span>

              <strong>
                {{
                  finding.character ||
                  finding.escapedCharacter
                }}
              </strong>
            </div>

            <div class="finding-detail">
              <span>
                {{
                  t(
                    "common.codePoint",
                  )
                }}
              </span>

              <strong>
                {{
                  finding.codePointLabel
                }}
              </strong>
            </div>

            <div class="finding-detail">
              <span>
                {{
                  t(
                    "common.unicodeName",
                  )
                }}
              </span>

              <strong>
                {{
                  finding.unicodeName ??
                  t(
                    "common.unknown",
                  )
                }}
              </strong>
            </div>

            <div class="finding-detail">
              <span>
                {{
                  t(
                    "common.scalarIndex",
                  )
                }}
              </span>

              <strong>
                {{
                  finding.scalarIndex
                }}
              </strong>
            </div>

            <div class="finding-detail">
              <span>
                {{
                  t(
                    "common.byteIndex",
                  )
                }}
              </span>

              <strong>
                {{
                  finding.byteIndex
                }}
              </strong>
            </div>

            <div class="finding-detail">
              <span>
                {{
                  t(
                    "common.escaped",
                  )
                }}
              </span>

              <code>
                {{
                  finding.escapedCharacter
                }}
              </code>
            </div>
          </div>

          <div class="finding-explanation">
            <span>
              {{
                t(
                  "common.whyThisMatters",
                )
              }}
            </span>

            <p>
              {{
                finding.explanation
              }}
            </p>
          </div>
        </article>
      </section>
    </div>
  </section>
</template>

<style scoped>
.scan-layout {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.scan-input-panel {
  padding: 0;
  overflow: hidden;
}

.scan-input-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 22px 14px;
}

.scan-clear-button {
  padding: 7px 10px;
  border: 1px solid var(--border-primary);
  border-radius: 8px;
  background: var(--bg-muted);
  color: var(--text-secondary);
  cursor: pointer;
}

.scan-textarea {
  display: block;
  width: 100%;
  min-height: 230px;
  resize: vertical;
  padding: 18px 22px;
  border: 0;
  border-top: 1px solid var(--border-primary);
  border-bottom: 1px solid var(--border-primary);
  outline: none;
  background: #0a1018;
  color: var(--text-primary);
  font-family:
    "Cascadia Code",
    Consolas,
    monospace;
  font-size: 14px;
  line-height: 1.7;
  direction: ltr;
}

.scan-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 22px;
}

.scan-character-count {
  color: var(--text-muted);
  font-size: 11px;
}

.scan-error {
  margin: 0;
  padding: 12px 14px;
  border: 1px solid rgba(255, 101, 119, 0.3);
  border-radius: var(--radius-md);
  background: rgba(255, 101, 119, 0.08);
  color: #ff9aa7;
}

.scan-clean-result {
  display: flex;
  align-items: center;
  gap: 18px;
}

.scan-clean-icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  color: var(--success);
}

.scan-results {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.finding-card {
  padding: 20px 22px;
}

.finding-card-header {
  display: flex;
  justify-content: space-between;
}

.finding-rule {
  color: var(--accent-primary);
  font-weight: 800;
}

.finding-severity {
  padding: 5px 9px;
  border-radius: 999px;
  font-size: 10px;
  text-transform: uppercase;
}

.finding-details {
  display: grid;
  grid-template-columns:
    repeat(
      3,
      minmax(0, 1fr)
    );
  gap: 10px;
}

.finding-detail {
  padding: 11px 12px;
  border: 1px solid var(--border-primary);
  border-radius: 9px;
  background: var(--bg-muted);
}

.finding-detail span {
  display: block;
  margin-bottom: 4px;
  color: var(--text-muted);
  font-size: 10px;
}

.finding-explanation {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--border-primary);
}

.finding-explanation p {
  color: var(--text-secondary);
}
</style>