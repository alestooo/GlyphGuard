<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";

import {
  open,
} from "@tauri-apps/plugin-dialog";

import {
  getCurrentWebview,
} from "@tauri-apps/api/webview";

import PageTitle from "../components/common/PageTitle.vue";

import {
  scanDirectory,
  scanFile,
  scanPath,
} from "../services/glyphguard";

import type {
  DirectoryScanResult,
  FileScanResult,
} from "../types/glyphguard";

const fileResult =
  ref<FileScanResult | null>(
    null,
  );

const directoryResult =
  ref<DirectoryScanResult | null>(
    null,
  );

const loading =
  ref(false);

const error =
  ref("");

const isDragging =
  ref(false);

const statusMessage =
  ref("");

let unlistenDragDrop:
  (() => void) | null =
    null;

const suspiciousFiles =
  computed(() => {
    if (!directoryResult.value) {
      return [];
    }

    return directoryResult.value.files
      .filter(
        (file) =>
          file.findings.length > 0,
      );
  });

async function chooseFile() {
  error.value = "";

  const selected =
    await open({
      multiple: false,
      directory: false,

      title:
        "Select a file to scan",
    });

  if (
    !selected ||
    Array.isArray(selected)
  ) {
    return;
  }

  await runFileScan(
    selected,
  );
}

async function chooseDirectory() {
  error.value = "";

  const selected =
    await open({
      multiple: false,
      directory: true,

      title:
        "Select a directory to scan",
    });

  if (
    !selected ||
    Array.isArray(selected)
  ) {
    return;
  }

  await runDirectoryScan(
    selected,
  );
}

async function runFileScan(
  path: string,
) {
  prepareScan();

  try {
    fileResult.value =
      await scanFile(
        path,
      );

    statusMessage.value =
      "File scan complete.";
  } catch (cause) {
    handleError(
      cause,
    );
  } finally {
    loading.value = false;
  }
}

async function runDirectoryScan(
  path: string,
) {
  prepareScan();

  try {
    directoryResult.value =
      await scanDirectory(
        path,
      );

    statusMessage.value =
      "Directory scan complete.";
  } catch (cause) {
    handleError(
      cause,
    );
  } finally {
    loading.value = false;
  }
}

async function runDroppedPath(
  path: string,
) {
  prepareScan();

  try {
    const result =
      await scanPath(
        path,
      );

    if (
      result.kind ===
      "file"
    ) {
      fileResult.value =
        result.file;

      statusMessage.value =
        "Dropped file scan complete.";
    } else {
      directoryResult.value =
        result.directory;

      statusMessage.value =
        "Dropped directory scan complete.";
    }
  } catch (cause) {
    handleError(
      cause,
    );
  } finally {
    loading.value = false;
  }
}

function prepareScan() {
  loading.value = true;

  error.value = "";

  statusMessage.value =
    "";

  fileResult.value =
    null;

  directoryResult.value =
    null;
}

function handleError(
  cause: unknown,
) {
  console.error(
    cause,
  );

  error.value =
    cause instanceof Error
      ? cause.message
      : String(cause);
}

onMounted(
  async () => {
    unlistenDragDrop =
      await getCurrentWebview()
        .onDragDropEvent(
          (event) => {
            if (
              event.payload.type ===
              "enter"
            ) {
              isDragging.value =
                true;

              return;
            }

            if (
              event.payload.type ===
              "leave"
            ) {
              isDragging.value =
                false;

              return;
            }

            if (
              event.payload.type ===
              "drop"
            ) {
              isDragging.value =
                false;

              const path =
                event.payload.paths[0];

              if (!path) {
                return;
              }

              void runDroppedPath(
                path,
              );
            }
          },
        );
  },
);

onBeforeUnmount(
  () => {
    unlistenDragDrop?.();
  },
);
</script>

<template>
  <section class="page">
    <PageTitle
      title="Files"
      subtitle="Scan individual UTF-8 files or entire directories recursively."
    />

    <section
      class="file-drop-zone"
      :class="{
        'file-drop-zone-active':
          isDragging,
      }"
    >
      <div class="drop-icon">
        GG
      </div>

      <h2>
        Drop a file or folder
      </h2>

      <p>
        Drag content from Windows
        Explorer directly into
        GlyphGuard.
      </p>

      <div class="picker-actions">
        <button
          class="primary-button"
          type="button"
          :disabled="loading"
          @click="chooseFile"
        >
          Select file
        </button>

        <button
          class="secondary-button"
          type="button"
          :disabled="loading"
          @click="chooseDirectory"
        >
          Select folder
        </button>
      </div>

      <span
        v-if="loading"
        class="scan-status"
      >
        Scanning...
      </span>

      <span
        v-else-if="statusMessage"
        class="scan-status"
      >
        {{ statusMessage }}
      </span>
    </section>

    <div
      v-if="error"
      class="file-error"
    >
      <strong>
        Scan failed
      </strong>

      <span>
        {{ error }}
      </span>
    </div>

    <!-- FILE RESULT -->

    <template v-if="fileResult">
      <div class="file-summary">
        <article
          class="
            panel
            summary-wide
          "
        >
          <span class="panel-label">
            File
          </span>

          <strong class="path-value">
            {{ fileResult.path }}
          </strong>
        </article>

        <article class="panel">
          <span class="panel-label">
            Encoding
          </span>

          <strong>
            {{
              fileResult.encoding
            }}
          </strong>
        </article>

        <article class="panel">
          <span class="panel-label">
            Bytes
          </span>

          <strong>
            {{
              fileResult.byteLength
            }}
          </strong>
        </article>

        <article class="panel">
          <span class="panel-label">
            UTF-8 BOM
          </span>

          <strong>
            {{
              fileResult.hasUtf8Bom
                ? "Yes"
                : "No"
            }}
          </strong>
        </article>

        <article class="panel">
          <span class="panel-label">
            Findings
          </span>

          <strong>
            {{
              fileResult
                .findings
                .length
            }}
          </strong>
        </article>
      </div>

      <section
        class="file-findings-section"
      >
        <h2>
          Findings
        </h2>

        <article
          v-if="
            fileResult
              .findings
              .length === 0
          "
          class="
            panel
            clean-result
          "
        >
          <strong>
            No suspicious Unicode
            findings detected.
          </strong>
        </article>

        <article
          v-for="
            finding
            in fileResult.findings
          "
          :key="
            `${finding.ruleId}-${finding.byteIndex}-${finding.codePoint}`
          "
          class="
            panel
            finding-row
          "
        >
          <div class="finding-top">
            <strong>
              {{ finding.ruleId }}
            </strong>

            <span>
              {{
                finding.severity
              }}
            </span>
          </div>

          <h3>
            {{
              finding.message
            }}
          </h3>

          <div class="finding-meta">
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

    <!-- DIRECTORY RESULT -->

    <template
      v-if="directoryResult"
    >
      <article
        class="
          panel
          directory-root
        "
      >
        <span class="panel-label">
          Directory
        </span>

        <strong class="path-value">
          {{
            directoryResult.root
          }}
        </strong>
      </article>

      <div
        class="
          directory-summary
        "
      >
        <article class="panel">
          <span>
            Discovered
          </span>

          <strong>
            {{
              directoryResult
                .discoveredFileCount
            }}
          </strong>
        </article>

        <article class="panel">
          <span>
            Scanned
          </span>

          <strong>
            {{
              directoryResult
                .scannedFileCount
            }}
          </strong>
        </article>

        <article class="panel">
          <span>
            Skipped
          </span>

          <strong>
            {{
              directoryResult
                .skippedFileCount
            }}
          </strong>
        </article>

        <article class="panel">
          <span>
            Suspicious files
          </span>

          <strong>
            {{
              directoryResult
                .filesWithFindings
            }}
          </strong>
        </article>

        <article class="panel">
          <span>
            Findings
          </span>

          <strong>
            {{
              directoryResult
                .findingCount
            }}
          </strong>
        </article>
      </div>

      <section
        class="
          directory-results
        "
      >
        <div class="section-heading">
          Files with findings

          <span>
            {{
              suspiciousFiles.length
            }}
          </span>
        </div>

        <article
          v-if="
            suspiciousFiles.length ===
            0
          "
          class="
            panel
            clean-result
          "
        >
          <strong>
            No suspicious Unicode
            findings were detected
            in the scanned files.
          </strong>
        </article>

        <article
          v-for="
            file
            in suspiciousFiles
          "
          :key="file.path"
          class="
            panel
            directory-file
          "
        >
          <div
            class="
              directory-file-header
            "
          >
            <div>
              <span
                class="
                  panel-label
                "
              >
                Suspicious file
              </span>

              <strong
                class="
                  directory-file-path
                "
              >
                {{ file.path }}
              </strong>
            </div>

            <span
              class="
                findings-count
              "
            >
              {{
                file.findings.length
              }}
              finding(s)
            </span>
          </div>

          <div
            class="
              directory-finding-list
            "
          >
            <div
              v-for="
                finding
                in file.findings
              "
              :key="
                `${finding.ruleId}-${finding.byteIndex}-${finding.codePoint}`
              "
              class="
                directory-finding
              "
            >
              <div>
                <strong>
                  {{
                    finding.ruleId
                  }}
                </strong>

                <span>
                  {{
                    finding.severity
                  }}
                </span>
              </div>

              <p>
                {{
                  finding.message
                }}
              </p>

              <code>
                {{
                  finding.codePointLabel
                }}
              </code>
            </div>
          </div>
        </article>
      </section>

      <section
        v-if="
          directoryResult
            .skipped.length
        "
        class="
          skipped-section
        "
      >
        <div class="section-heading">
          Skipped files

          <span>
            {{
              directoryResult
                .skipped.length
            }}
          </span>
        </div>

        <article
          class="panel"
        >
          <div
            v-for="
              skipped
              in directoryResult
                .skipped
            "
            :key="skipped.path"
            class="
              skipped-row
            "
          >
            <strong>
              {{ skipped.path }}
            </strong>

            <span>
              {{
                skipped.reason
              }}
            </span>
          </div>
        </article>
      </section>
    </template>
  </section>
</template>

<style scoped>
.file-drop-zone {
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 46px 26px;

  border:
    1px dashed
    var(--border-secondary);

  border-radius:
    var(--radius-lg);

  background:
    rgba(
      18,
      27,
      39,
      0.72
    );

  text-align: center;

  transition:
    border-color 150ms ease,
    background 150ms ease,
    transform 150ms ease;
}

.file-drop-zone-active {
  border-color:
    var(--accent-primary);

  background:
    rgba(
      34,
      184,
      255,
      0.08
    );

  transform:
    scale(1.005);
}

.drop-icon {
  display: grid;
  place-items: center;

  width: 58px;
  height: 58px;

  margin-bottom: 16px;

  border:
    1px solid
    rgba(
      34,
      184,
      255,
      0.35
    );

  border-radius: 16px;

  background:
    rgba(
      34,
      184,
      255,
      0.09
    );

  color:
    var(--accent-primary);

  font-size: 13px;
  font-weight: 800;
}

.file-drop-zone h2 {
  margin: 0;

  font-size: 20px;
}

.file-drop-zone p {
  margin:
    8px 0 20px;

  color:
    var(--text-secondary);
}

.picker-actions {
  display: flex;
  gap: 10px;
}

.scan-status {
  margin-top: 15px;

  color:
    var(--text-muted);

  font-size: 11px;
}

.file-error {
  display: flex;
  flex-direction: column;
  gap: 5px;

  margin-top: 16px;
  padding: 14px;

  border:
    1px solid
    rgba(
      255,
      101,
      119,
      0.3
    );

  border-radius: 10px;

  background:
    rgba(
      255,
      101,
      119,
      0.08
    );

  color:
    var(--danger);
}

.file-error span {
  color:
    var(--text-secondary);
}

.file-summary {
  display: grid;

  grid-template-columns:
    2fr
    repeat(
      4,
      minmax(0, 1fr)
    );

  gap: 12px;

  margin-top: 18px;
}

.file-summary strong {
  display: block;

  margin-top: 7px;
}

.path-value {
  overflow-wrap: anywhere;

  font-size: 12px;
}

.file-findings-section,
.directory-results,
.skipped-section {
  margin-top: 24px;
}

.file-findings-section > h2 {
  font-size: 17px;
}

.clean-result {
  color:
    var(--success);
}

.finding-row {
  margin-bottom: 12px;
}

.finding-top {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.finding-top strong {
  color:
    var(--accent-primary);
}

.finding-top span {
  color:
    var(--warning);

  font-size: 11px;
}

.finding-row h3 {
  margin:
    12px 0;
}

.finding-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  color:
    var(--text-muted);

  font-size: 11px;
}

.finding-row p {
  margin-bottom: 0;

  color:
    var(--text-secondary);

  font-size: 12px;
  line-height: 1.6;
}

.directory-root {
  margin-top: 18px;
}

.directory-root strong {
  display: block;

  margin-top: 7px;
}

.directory-summary {
  display: grid;

  grid-template-columns:
    repeat(
      5,
      minmax(0, 1fr)
    );

  gap: 12px;

  margin-top: 12px;
}

.directory-summary span {
  display: block;

  color:
    var(--text-muted);

  font-size: 10px;
}

.directory-summary strong {
  display: block;

  margin-top: 6px;

  font-size: 21px;
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 8px;

  margin-bottom: 12px;

  font-size: 16px;
  font-weight: 700;
}

.section-heading span {
  color:
    var(--text-muted);
}

.directory-file {
  margin-bottom: 12px;
}

.directory-file-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
}

.directory-file-path {
  display: block;

  margin-top: 6px;

  overflow-wrap: anywhere;

  font-size: 12px;
}

.findings-count {
  flex-shrink: 0;

  padding: 5px 8px;

  border-radius: 999px;

  background:
    rgba(
      255,
      157,
      102,
      0.1
    );

  color: #ff9d66;

  font-size: 10px;
}

.directory-finding-list {
  display: flex;
  flex-direction: column;
  gap: 8px;

  margin-top: 15px;
}

.directory-finding {
  padding: 12px;

  border:
    1px solid
    var(--border-primary);

  border-radius: 9px;

  background:
    var(--bg-muted);
}

.directory-finding > div {
  display: flex;
  justify-content: space-between;
}

.directory-finding strong {
  color:
    var(--accent-primary);
}

.directory-finding span {
  color:
    var(--warning);

  font-size: 10px;
}

.directory-finding p {
  margin:
    8px 0;

  color:
    var(--text-secondary);

  font-size: 12px;
}

.skipped-row {
  display: flex;
  flex-direction: column;
  gap: 4px;

  padding: 10px 0;

  border-bottom:
    1px solid
    var(--border-primary);
}

.skipped-row:last-child {
  border-bottom: 0;
}

.skipped-row strong {
  overflow-wrap: anywhere;

  font-size: 11px;
}

.skipped-row span {
  color:
    var(--text-muted);

  font-size: 10px;
}

@media (
  max-width: 1000px
) {
  .file-summary {
    grid-template-columns:
      repeat(
        2,
        minmax(0, 1fr)
      );
  }

  .directory-summary {
    grid-template-columns:
      repeat(
        3,
        minmax(0, 1fr)
      );
  }
}

@media (
  max-width: 650px
) {
  .file-summary,
  .directory-summary {
    grid-template-columns:
      1fr;
  }

  .picker-actions {
    flex-direction: column;

    width: 100%;
  }

  .directory-file-header {
    flex-direction: column;
  }
}
</style>