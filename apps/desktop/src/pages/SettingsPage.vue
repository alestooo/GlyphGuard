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
  localeOptions,
  setAppLocale,
} from "../i18n";

import type {
  AppLocale,
} from "../i18n/types";

const {
  t,
  locale,
} = useI18n({
  useScope: "global",
});

const selectedLocale =
  computed({
    get() {
      return locale.value as AppLocale;
    },

    set(value: AppLocale) {
      setAppLocale(value);
    },
  });

const mixedScripts =
  ref(true);

const invisibleCharacters =
  ref(true);

const bidiControls =
  ref(true);

const confusables =
  ref(true);

const suspiciousWhitespace =
  ref(true);

const theme =
  ref("system");
</script>

<template>
  <section class="page">
    <PageTitle
      :title="
        t(
          'settings.title',
        )
      "
      :subtitle="
        t(
          'settings.subtitle',
        )
      "
    />

    <div class="settings-layout">
      <article class="panel">
        <span class="panel-label">
          {{
            t(
              "settings.language",
            )
          }}
        </span>

        <h2 class="panel-title">
          {{
            t(
              "settings.languageTitle",
            )
          }}
        </h2>

        <p class="settings-description">
          {{
            t(
              "settings.languageDescription",
            )
          }}
        </p>

        <select
          v-model="selectedLocale"
          class="settings-language-select"
        >
          <option
            v-for="
              option in localeOptions
            "
            :key="option.code"
            :value="option.code"
          >
            {{
              option.flag
            }}
            {{
              option.name
            }}
          </option>
        </select>
      </article>

      <article class="panel">
        <span class="panel-label">
          {{
            t(
              "settings.detectionRules",
            )
          }}
        </span>

        <h2 class="panel-title">
          {{
            t(
              "settings.securityScanning",
            )
          }}
        </h2>

        <div class="settings-list">
          <label class="setting-row">
            <div>
              <strong>
                {{
                  t(
                    "dashboard.mixedScripts",
                  )
                }}
              </strong>

              <span>
                GG001
              </span>
            </div>

            <input
              v-model="mixedScripts"
              type="checkbox"
            />
          </label>

          <label class="setting-row">
            <div>
              <strong>
                {{
                  t(
                    "dashboard.invisibleCharacters",
                  )
                }}
              </strong>

              <span>
                GG002
              </span>
            </div>

            <input
              v-model="
                invisibleCharacters
              "
              type="checkbox"
            />
          </label>

          <label class="setting-row">
            <div>
              <strong>
                {{
                  t(
                    "dashboard.bidiControls",
                  )
                }}
              </strong>

              <span>
                GG003
              </span>
            </div>

            <input
              v-model="bidiControls"
              type="checkbox"
            />
          </label>

          <label class="setting-row">
            <div>
              <strong>
                {{
                  t(
                    "dashboard.unicodeConfusables",
                  )
                }}
              </strong>

              <span>
                GG004
              </span>
            </div>

            <input
              v-model="confusables"
              type="checkbox"
            />
          </label>

          <label class="setting-row">
            <div>
              <strong>
                {{
                  t(
                    "dashboard.suspiciousWhitespace",
                  )
                }}
              </strong>

              <span>
                GG005
              </span>
            </div>

            <input
              v-model="
                suspiciousWhitespace
              "
              type="checkbox"
            />
          </label>
        </div>

        <p class="settings-note">
          {{
            t(
              "settings.rulesNote",
            )
          }}
        </p>
      </article>

      <article class="panel">
        <span class="panel-label">
          {{
            t(
              "settings.appearance",
            )
          }}
        </span>

        <h2 class="panel-title">
          {{
            t(
              "settings.theme",
            )
          }}
        </h2>

        <div class="theme-options">
          <label>
            <input
              v-model="theme"
              type="radio"
              value="system"
            />

            {{
              t(
                "settings.system",
              )
            }}
          </label>

          <label>
            <input
              v-model="theme"
              type="radio"
              value="dark"
            />

            {{
              t(
                "settings.dark",
              )
            }}
          </label>

          <label>
            <input
              v-model="theme"
              type="radio"
              value="light"
            />

            {{
              t(
                "settings.light",
              )
            }}
          </label>
        </div>

        <p class="settings-note">
          {{
            t(
              "settings.themeNote",
            )
          }}
        </p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.settings-layout {
  display: grid;
  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );
  gap: 16px;
}

.settings-description,
.settings-note {
  color: var(--text-muted);
  line-height: 1.6;
}

.settings-language-select {
  width: 100%;
  margin-top: 14px;
  padding: 10px 12px;
  border: 1px solid var(--border-primary);
  border-radius: 9px;
  background: var(--bg-muted);
  color: var(--text-primary);
}

.settings-list {
  display: flex;
  flex-direction: column;
  margin-top: 18px;
}

.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 0;
  border-bottom: 1px solid var(--border-primary);
}

.setting-row div {
  display: flex;
  flex-direction: column;
}

.setting-row span {
  color: var(--text-muted);
}

.setting-row input,
.theme-options input {
  accent-color: var(--accent-primary);
}

.theme-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 18px;
}
</style>