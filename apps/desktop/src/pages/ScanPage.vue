<script setup lang="ts">
import {
  computed,
  ref,
} from "vue";

import PageTitle from "../components/common/PageTitle.vue";

import {
  scanText,
} from "../services/glyphguard";

import type {
  Finding,
} from "../types/glyphguard";

const text = ref("");
const findings = ref<Finding[]>([]);

const isScanning = ref(false);

const errorMessage = ref("");

const hasScanned = ref(false);

const findingCount = computed(
  () => findings.value.length,
);

async function runScan() {
  errorMessage.value = "";
  findings.value = [];
  hasScanned.value = false;

  if (!text.value) {
    errorMessage.value =
      "Enter text before running a scan.";

    return;
  }

  isScanning.value = true;

  try {
    findings.value =
      await scanText(text.value);

    hasScanned.value = true;
  } catch (error) {
    console.error(error);

    errorMessage.value =
      "GlyphGuard could not analyze the text.";
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
      title="Scan Text"
      subtitle="Analyze text for suspicious Unicode characters, scripts and controls."
    />

    <div class="scan-layout">
      <section class="panel scan-input-panel">
        <div class="scan-input-header">
          <div>
            <span class="panel-label">
              Input
            </span>

            <h2 class="panel-title">
              Text to analyze
            </h2>
          </div>

          <button
            v-if="text"
            class="scan-clear-button"
            type="button"
            @click="clearText"
          >
            Clear
          </button>
        </div>

        <textarea
          v-model="text"
          class="scan-textarea"
          spellcheck="false"
          placeholder="Paste or type text here..."
        />

        <div class="scan-actions">
          <span class="scan-character-count">
            {{ text.length }} characters
          </span>

          <button
            class="primary-button"
            type="button"
            :disabled="isScanning"
            @click="runScan"
          >
            {{
              isScanning
                ? "Scanning..."
                : "Scan text"
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
        class="panel scan-clean-result"
      >
        <div class="scan-clean-icon">
          ✓
        </div>

        <div>
          <span class="panel-label">
            Scan complete
          </span>

          <h2 class="panel-title">
            No findings
          </h2>

          <p class="panel-description">
            GlyphGuard did not detect
            suspicious Unicode patterns
            in this text.
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
              Results
            </span>

            <h2 class="panel-title">
              {{ findingCount }}
              {{
                findingCount === 1
                  ? "finding"
                  : "findings"
              }}
            </h2>
          </div>
        </div>

        <article
          v-for="finding in findings"
          :key="
            `${finding.ruleId}-${finding.byteIndex}-${finding.codePoint}`
          "
          class="panel finding-card"
        >
          <div class="finding-card-header">
            <div class="finding-rule">
              {{ finding.ruleId }}
            </div>

            <span
              class="finding-severity"
              :class="
                severityClass(
                  finding.severity,
                )
              "
            >
              {{ finding.severity }}
            </span>
          </div>

          <h3 class="finding-message">
            {{ finding.message }}
          </h3>

          <div class="finding-details">
            <div class="finding-detail">
              <span>
                Character
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
                Code point
              </span>

              <strong>
                {{
                  finding.codePointLabel
                }}
              </strong>
            </div>

            <div class="finding-detail">
              <span>
                Unicode name
              </span>

              <strong>
                {{
                  finding.unicodeName ??
                  "Unknown"
                }}
              </strong>
            </div>

            <div class="finding-detail">
              <span>
                Scalar index
              </span>

              <strong>
                {{
                  finding.scalarIndex
                }}
              </strong>
            </div>

            <div class="finding-detail">
              <span>
                Byte index
              </span>

              <strong>
                {{
                  finding.byteIndex
                }}
              </strong>
            </div>

            <div class="finding-detail">
              <span>
                Escaped
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
              Why this matters
            </span>

            <p>
              {{ finding.explanation }}
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

.scan-clear-button:hover {
  color: var(--text-primary);
  border-color: var(--border-secondary);
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
    "JetBrains Mono",
    Consolas,
    monospace;

  font-size: 14px;
  line-height: 1.7;
}

.scan-textarea::placeholder {
  color: var(--text-muted);
}

.scan-textarea:focus {
  background: #0b121b;
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

.primary-button:disabled {
  opacity: 0.55;
  cursor: wait;
  transform: none;
}

.scan-error {
  margin: 0;

  padding: 12px 14px;

  border: 1px solid rgba(
    255,
    101,
    119,
    0.3
  );

  border-radius: var(--radius-md);

  background: rgba(
    255,
    101,
    119,
    0.08
  );

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

  flex: 0 0 auto;

  border: 1px solid rgba(
    67,
    209,
    122,
    0.3
  );

  border-radius: 14px;

  background: rgba(
    67,
    209,
    122,
    0.09
  );

  color: var(--success);

  font-size: 21px;
  font-weight: 800;
}

.scan-clean-result
.panel-description {
  margin-bottom: 0;
}

.scan-results {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.scan-results-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 2px;
}

.finding-card {
  padding: 20px 22px;
}

.finding-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.finding-rule {
  color: var(--accent-primary);

  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.finding-severity {
  padding: 5px 9px;

  border: 1px solid var(--border-primary);
  border-radius: 999px;

  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
}

.finding-severity-info {
  color: #8ad7ff;
  background: rgba(
    34,
    184,
    255,
    0.08
  );
}

.finding-severity-warning {
  color: var(--warning);
  background: rgba(
    246,
    196,
    83,
    0.08
  );
}

.finding-severity-suspicious {
  color: #ff9d66;
  background: rgba(
    255,
    157,
    102,
    0.08
  );
}

.finding-severity-highrisk {
  color: var(--danger);
  background: rgba(
    255,
    101,
    119,
    0.08
  );
}

.finding-message {
  margin: 14px 0 16px;

  font-size: 17px;
  font-weight: 700;
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
  min-width: 0;

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

.finding-detail strong {
  display: block;

  overflow: hidden;
  text-overflow: ellipsis;

  color: var(--text-primary);

  font-size: 12px;
  font-weight: 600;
}

.finding-detail code {
  display: inline-block;

  max-width: 100%;

  overflow: hidden;
  text-overflow: ellipsis;
}

.finding-explanation {
  margin-top: 14px;

  padding-top: 14px;

  border-top: 1px solid var(--border-primary);
}

.finding-explanation > span {
  color: var(--text-muted);

  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
}

.finding-explanation p {
  margin: 7px 0 0;

  color: var(--text-secondary);

  font-size: 12px;
  line-height: 1.65;
}

@media (max-width: 900px) {
  .finding-details {
    grid-template-columns:
      repeat(
        2,
        minmax(0, 1fr)
      );
  }
}

@media (max-width: 620px) {
  .finding-details {
    grid-template-columns: 1fr;
  }
}
</style>