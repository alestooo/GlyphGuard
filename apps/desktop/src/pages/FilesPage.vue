<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";

import {
  useI18n,
} from "vue-i18n";

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

const {
  t,
} = useI18n({
  useScope: "global",
});

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
    if (
      !directoryResult.value
    ) {
      return [];
    }

    return directoryResult
      .value
      .files
      .filter(
        (file) =>
          file.findings.length >
          0,
      );
  });

async function chooseFile() {
  error.value = "";

  const selected =
    await open({
      multiple: false,
      directory: false,
      title:
        t(
          "files.dialogFile",
        ),
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
        t(
          "files.dialogDirectory",
        ),
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
      await scanFile(path);

    statusMessage.value =
      t(
        "files.fileComplete",
      );
  } catch (cause) {
    handleError(cause);
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
      t(
        "files.directoryComplete",
      );
  } catch (cause) {
    handleError(cause);
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
      await scanPath(path);

    if (
      result.kind ===
      "file"
    ) {
      fileResult.value =
        result.file;

      statusMessage.value =
        t(
          "files.fileComplete",
        );
    } else {
      directoryResult.value =
        result.directory;

      statusMessage.value =
        t(
          "files.directoryComplete",
        );
    }
  } catch (cause) {
    handleError(cause);
  } finally {
    loading.value = false;
  }
}

function prepareScan() {
  loading.value = true;
  error.value = "";
  statusMessage.value = "";
  fileResult.value = null;
  directoryResult.value = null;
}

function handleError(
  cause: unknown,
) {
  console.error(cause);

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
      :title="
        t(
          'files.title',
        )
      "
      :subtitle="
        t(
          'files.subtitle',
        )
      "
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
        {{
          t(
            "files.dropTitle",
          )
        }}
      </h2>

      <p>
        {{
          t(
            "files.dropDescription",
          )
        }}
      </p>

      <div class="picker-actions">
        <button
          class="primary-button"
          type="button"
          :disabled="loading"
          @click="chooseFile"
        >
          {{
            t(
              "files.selectFile",
            )
          }}
        </button>

        <button
          class="secondary-button"
          type="button"
          :disabled="loading"
          @click="chooseDirectory"
        >
          {{
            t(
              "files.selectFolder",
            )
          }}
        </button>
      </div>

      <span
        v-if="loading"
        class="scan-status"
      >
        {{
          t(
            "common.scanning",
          )
        }}
      </span>

      <span
        v-else-if="
          statusMessage
        "
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
        {{
          t(
            "files.scanFailed",
          )
        }}
      </strong>

      <span>
        {{ error }}
      </span>
    </div>

    <template v-if="fileResult">
      <div class="file-summary">
        <article
          class="
            panel
            summary-wide
          "
        >
          <span class="panel-label">
            {{
              t(
                "files.file",
              )
            }}
          </span>

          <strong class="path-value">
            {{
              fileResult.path
            }}
          </strong>
        </article>

        <article class="panel">
          <span class="panel-label">
            {{
              t(
                "files.encoding",
              )
            }}
          </span>

          <strong>
            UTF-8
          </strong>
        </article>

        <article class="panel">
          <span class="panel-label">
            {{
              t(
                "common.bytes",
              )
            }}
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
                ? t(
                    "common.yes",
                  )
                : t(
                    "common.no",
                  )
            }}
          </strong>
        </article>

        <article class="panel">
          <span class="panel-label">
            {{
              t(
                "common.findings",
              )
            }}
          </span>

          <strong>
            {{
              fileResult.findings.length
            }}
          </strong>
        </article>
      </div>

      <section class="file-findings-section">
        <h2>
          {{
            t(
              "common.findings",
            )
          }}
        </h2>

        <article
          v-if="
            fileResult.findings.length ===
            0
          "
          class="
            panel
            clean-result
          "
        >
          <strong>
            {{
              t(
                "files.noFindings",
              )
            }}
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
                t(
                  "common.unknown",
                )
              }}
            </span>

            <span>
              {{
                t(
                  "files.bytePosition",
                  {
                    index:
                      finding.byteIndex,
                  },
                )
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

    <template
      v-if="
        directoryResult
      "
    >
      <article
        class="
          panel
          directory-root
        "
      >
        <span class="panel-label">
          {{
            t(
              "files.directory",
            )
          }}
        </span>

        <strong class="path-value">
          {{
            directoryResult.root
          }}
        </strong>
      </article>

      <div class="directory-summary">
        <article class="panel">
          <span>
            {{
              t(
                "files.discovered",
              )
            }}
          </span>

          <strong>
            {{
              directoryResult.discoveredFileCount
            }}
          </strong>
        </article>

        <article class="panel">
          <span>
            {{
              t(
                "files.scanned",
              )
            }}
          </span>

          <strong>
            {{
              directoryResult.scannedFileCount
            }}
          </strong>
        </article>

        <article class="panel">
          <span>
            {{
              t(
                "files.skipped",
              )
            }}
          </span>

          <strong>
            {{
              directoryResult.skippedFileCount
            }}
          </strong>
        </article>

        <article class="panel">
          <span>
            {{
              t(
                "files.suspiciousFiles",
              )
            }}
          </span>

          <strong>
            {{
              directoryResult.filesWithFindings
            }}
          </strong>
        </article>

        <article class="panel">
          <span>
            {{
              t(
                "common.findings",
              )
            }}
          </span>

          <strong>
            {{
              directoryResult.findingCount
            }}
          </strong>
        </article>
      </div>

      <section class="directory-results">
        <div class="section-heading">
          {{
            t(
              "files.filesWithFindings",
            )
          }}

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
            {{
              t(
                "files.directoryClean",
              )
            }}
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
          <div class="directory-file-header">
            <div>
              <span class="panel-label">
                {{
                  t(
                    "files.suspiciousFile",
                  )
                }}
              </span>

              <strong class="directory-file-path">
                {{
                  file.path
                }}
              </strong>
            </div>

            <span class="findings-count">
              {{
                t(
                  "files.findingCount",
                  {
                    count:
                      file.findings.length,
                  },
                )
              }}
            </span>
          </div>

          <div class="directory-finding-list">
            <div
              v-for="
                finding
                in file.findings
              "
              :key="
                `${finding.ruleId}-${finding.byteIndex}-${finding.codePoint}`
              "
              class="directory-finding"
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
          directoryResult.skipped.length
        "
        class="skipped-section"
      >
        <div class="section-heading">
          {{
            t(
              "files.skippedFiles",
            )
          }}

          <span>
            {{
              directoryResult.skipped.length
            }}
          </span>
        </div>

        <article class="panel">
          <div
            v-for="
              skipped
              in directoryResult.skipped
            "
            :key="skipped.path"
            class="skipped-row"
          >
            <strong>
              {{
                skipped.path
              }}
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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 46px 26px;
  border: 1px dashed var(--border-secondary);
  border-radius: var(--radius-lg);
  text-align: center;
}

.file-drop-zone-active {
  border-color: var(--accent-primary);
}

.drop-icon {
  display: grid;
  place-items: center;
  width: 58px;
  height: 58px;
  margin-bottom: 16px;
  border-radius: 16px;
  color: var(--accent-primary);
}

.picker-actions {
  display: flex;
  gap: 10px;
}

.scan-status {
  margin-top: 15px;
  color: var(--text-muted);
}

.file-error {
  margin-top: 16px;
  padding: 14px;
  color: var(--danger);
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

.path-value {
  overflow-wrap: anywhere;
}

.file-findings-section,
.directory-results,
.skipped-section {
  margin-top: 24px;
}

.clean-result {
  color: var(--success);
}

.finding-row,
.directory-file {
  margin-bottom: 12px;
}

.finding-top,
.directory-file-header {
  display: flex;
  justify-content: space-between;
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

.section-heading {
  margin-bottom: 12px;
  font-weight: 700;
}
</style>