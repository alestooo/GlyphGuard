<script setup lang="ts">
import {
  ref,
} from "vue";

import {
  open,
} from "@tauri-apps/plugin-dialog";

import PageTitle from "../components/common/PageTitle.vue";

import {
  scanFile,
} from "../services/glyphguard";

import type {
  FileScanResult,
} from "../types/glyphguard";

const result =
  ref<FileScanResult | null>(
    null,
  );

const loading =
  ref(false);

const error =
  ref("");

async function chooseFile() {
  error.value = "";

  const selected =
    await open({
      multiple: false,
      directory: false,
      title:
        "Select a text file to scan",
    });

  if (
    !selected ||
    Array.isArray(selected)
  ) {
    return;
  }

  loading.value = true;

  try {
    result.value =
      await scanFile(selected);
  } catch (cause) {
    console.error(cause);

    error.value =
      String(cause);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="page">
    <PageTitle
      title="Files"
      subtitle="Open and scan UTF-8 text files with GlyphGuard Core."
    />

    <article class="panel file-picker">
      <div class="file-picker-icon">
        FILE
      </div>

      <h2>
        Scan a file
      </h2>

      <p>
        Select a UTF-8 text or
        source-code file from your
        computer.
      </p>

      <button
        class="primary-button"
        type="button"
        :disabled="loading"
        @click="chooseFile"
      >
        {{
          loading
            ? "Scanning..."
            : "Choose file"
        }}
      </button>
    </article>

    <p
      v-if="error"
      class="file-error"
    >
      {{ error }}
    </p>

    <template v-if="result">
      <div class="file-summary">
        <article class="panel">
          <span class="panel-label">
            Path
          </span>

          <strong class="file-path">
            {{ result.path }}
          </strong>
        </article>

        <article class="panel">
          <span class="panel-label">
            Encoding
          </span>

          <strong>
            {{ result.encoding }}
          </strong>
        </article>

        <article class="panel">
          <span class="panel-label">
            Bytes
          </span>

          <strong>
            {{ result.byteLength }}
          </strong>
        </article>

        <article class="panel">
          <span class="panel-label">
            UTF-8 BOM
          </span>

          <strong>
            {{
              result.hasUtf8Bom
                ? "Yes"
                : "No"
            }}
          </strong>
        </article>
      </div>

      <section class="file-findings">
        <div class="file-findings-heading">
          Findings

          <span>
            {{
              result.findings.length
            }}
          </span>
        </div>

        <article
          v-if="
            !result.findings.length
          "
          class="
            panel
            file-clean
          "
        >
          No findings detected.
        </article>

        <article
          v-for="
            finding
            in result.findings
          "
          :key="
            `${finding.ruleId}-${finding.byteIndex}-${finding.codePoint}`
          "
          class="
            panel
            file-finding
          "
        >
          <div class="file-finding-header">
            <strong>
              {{ finding.ruleId }}
            </strong>

            <span>
              {{ finding.severity }}
            </span>
          </div>

          <h3>
            {{ finding.message }}
          </h3>

          <div class="file-finding-meta">
            <code>
              {{
                finding.codePointLabel
              }}
            </code>

            <span>
              {{
                finding.unicodeName ??
                "Unknown"
              }}
            </span>

            <span>
              byte
              {{
                finding.byteIndex
              }}
            </span>
          </div>

          <p>
            {{
              finding.explanation
            }}
          </p>
        </article>
      </section>
    </template>
  </section>
</template>

<style scoped>
.file-picker {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 42px 24px;

  text-align: center;
}

.file-picker-icon {
  display: grid;
  place-items: center;

  width: 58px;
  height: 58px;

  margin-bottom: 15px;

  border:
    1px solid
    rgba(
      34,
      184,
      255,
      0.25
    );

  border-radius: 16px;

  background:
    var(--accent-soft);

  color:
    var(--accent-primary);

  font-size: 10px;
  font-weight: 800;
}

.file-picker h2 {
  margin: 0;
}

.file-picker p {
  max-width: 480px;

  margin: 8px 0 20px;

  color: var(--text-secondary);
}

.file-error {
  padding: 12px;

  border-radius: 10px;

  background:
    rgba(
      255,
      101,
      119,
      0.08
    );

  color: var(--danger);
}

.file-summary {
  display: grid;

  grid-template-columns:
    2fr 1fr 1fr 1fr;

  gap: 12px;

  margin-top: 18px;
}

.file-summary strong {
  display: block;

  margin-top: 7px;
}

.file-path {
  overflow-wrap: anywhere;
}

.file-findings {
  margin-top: 22px;
}

.file-findings-heading {
  margin-bottom: 12px;

  font-size: 16px;
  font-weight: 700;
}

.file-findings-heading span {
  color: var(--text-muted);
}

.file-clean {
  color: var(--success);
}

.file-finding {
  margin-bottom: 12px;
}

.file-finding-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.file-finding-header strong {
  color: var(--accent-primary);
}

.file-finding-header span {
  color: var(--warning);
  font-size: 11px;
}

.file-finding h3 {
  margin: 12px 0;
}

.file-finding-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  color: var(--text-secondary);

  font-size: 11px;
}

.file-finding p {
  margin-bottom: 0;

  color: var(--text-secondary);

  font-size: 12px;
  line-height: 1.6;
}

@media (
  max-width: 850px
) {
  .file-summary {
    grid-template-columns:
      repeat(
        2,
        minmax(0, 1fr)
      );
  }
}

@media (
  max-width: 550px
) {
  .file-summary {
    grid-template-columns: 1fr;
  }
}
</style>