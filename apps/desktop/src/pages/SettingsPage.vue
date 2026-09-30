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

import {
  applyTheme,
  getStoredTheme,
} from "../theme";

import type {
  ThemeMode,
} from "../theme";

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
  ref<ThemeMode>(
    getStoredTheme(),
  );

function setTheme(
  value: ThemeMode,
) {
  theme.value = value;

  applyTheme(value);
}
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
      <!-- LANGUAGE -->

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
              option
              in localeOptions
            "
            :key="option.code"
            :value="option.code"
          >
            {{
              option.name
            }}
          </option>
        </select>
      </article>

      <!-- RULES -->

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

      <!-- APPEARANCE -->

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
          <label
            class="theme-option"
            :class="{
              active:
                theme ===
                'system',
            }"
          >
            <input
              type="radio"
              name="theme"
              value="system"
              :checked="
                theme ===
                'system'
              "
              @change="
                setTheme(
                  'system',
                )
              "
            />

            <div class="theme-option-copy">
              <strong>
                {{
                  t(
                    "settings.system",
                  )
                }}
              </strong>
            </div>
          </label>

          <label
            class="theme-option"
            :class="{
              active:
                theme ===
                'dark',
            }"
          >
            <input
              type="radio"
              name="theme"
              value="dark"
              :checked="
                theme ===
                'dark'
              "
              @change="
                setTheme(
                  'dark',
                )
              "
            />

            <div class="theme-option-copy">
              <strong>
                {{
                  t(
                    "settings.dark",
                  )
                }}
              </strong>
            </div>
          </label>

          <label
            class="theme-option"
            :class="{
              active:
                theme ===
                'light',
            }"
          >
            <input
              type="radio"
              name="theme"
              value="light"
              :checked="
                theme ===
                'light'
              "
              @change="
                setTheme(
                  'light',
                )
              "
            />

            <div class="theme-option-copy">
              <strong>
                {{
                  t(
                    "settings.light",
                  )
                }}
              </strong>
            </div>
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
  color:
    var(--text-muted);

  font-size: 11px;
  line-height: 1.6;
}

.settings-language-select {
  width: 100%;

  margin-top: 14px;

  padding: 10px 12px;

  border:
    1px solid
    var(--border-primary);

  border-radius: 9px;

  outline: none;

  background:
    var(--bg-muted);

  color:
    var(--text-primary);

  cursor: pointer;
}

.settings-language-select:hover {
  border-color:
    var(--border-secondary);
}

.settings-language-select:focus {
  border-color:
    var(--accent-primary);
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

  gap: 18px;

  padding: 13px 0;

  border-bottom:
    1px solid
    var(--border-primary);

  cursor: pointer;
}

.setting-row:last-child {
  border-bottom: 0;
}

.setting-row > div {
  display: flex;
  flex-direction: column;

  gap: 3px;
}

.setting-row strong {
  color:
    var(--text-primary);

  font-size: 13px;
}

.setting-row span {
  color:
    var(--text-muted);

  font-size: 10px;
}

.setting-row input {
  width: 17px;
  height: 17px;

  accent-color:
    var(--accent-primary);

  cursor: pointer;
}

.theme-options {
  display: grid;

  grid-template-columns:
    repeat(
      3,
      minmax(0, 1fr)
    );

  gap: 10px;

  margin-top: 18px;
}

.theme-option {
  display: flex;
  align-items: center;

  gap: 9px;

  min-height: 54px;

  padding: 12px;

  border:
    1px solid
    var(--border-primary);

  border-radius: 10px;

  background:
    var(--bg-muted);

  color:
    var(--text-secondary);

  cursor: pointer;

  transition:
    border-color 140ms ease,
    background 140ms ease,
    color 140ms ease;
}

.theme-option:hover {
  border-color:
    var(--border-secondary);

  color:
    var(--text-primary);
}

.theme-option.active {
  border-color:
    var(--accent-primary);

  background:
    var(--accent-soft);

  color:
    var(--text-primary);
}

.theme-option input {
  margin: 0;

  accent-color:
    var(--accent-primary);

  cursor: pointer;
}

.theme-option-copy {
  display: flex;
  flex-direction: column;
}

.theme-option-copy strong {
  font-size: 12px;
}

.settings-note {
  margin-top: 18px;
}

@media (
  max-width: 850px
) {
  .settings-layout {
    grid-template-columns:
      1fr;
  }
}

@media (
  max-width: 550px
) {
  .theme-options {
    grid-template-columns:
      1fr;
  }
}
</style>