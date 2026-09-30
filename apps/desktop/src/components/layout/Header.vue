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
  localeOptions,
  setAppLocale,
} from "../../i18n";

import type {
  AppLocale,
} from "../../i18n/types";

const {
  t,
  locale,
} = useI18n({
  useScope: "global",
});

const isOpen =
  ref(false);

const languageRoot =
  ref<HTMLElement | null>(
    null,
  );

const currentLocale =
  computed(() => {
    return (
      localeOptions.find(
        (option) =>
          option.code ===
          locale.value,
      ) ??
      localeOptions[0]
    );
  });

function toggleLanguageMenu() {
  isOpen.value =
    !isOpen.value;
}

function selectLanguage(
  code: AppLocale,
) {
  setAppLocale(
    code,
  );

  isOpen.value =
    false;
}

function handleOutsideClick(
  event: MouseEvent,
) {
  const target =
    event.target as Node;

  if (
    languageRoot.value &&
    !languageRoot.value.contains(
      target,
    )
  ) {
    isOpen.value =
      false;
  }
}

onMounted(() => {
  document.addEventListener(
    "mousedown",
    handleOutsideClick,
  );
});

onBeforeUnmount(() => {
  document.removeEventListener(
    "mousedown",
    handleOutsideClick,
  );
});
</script>

<template>
  <header class="app-header">
    <div class="header-context">
      {{
        t(
          "header.localAnalysis",
        )
      }}
    </div>

    <div class="header-actions">
      <div
        ref="languageRoot"
        class="language-picker"
      >
        <button
          class="language-trigger"
          type="button"
          :aria-expanded="isOpen"
          @click="
            toggleLanguageMenu
          "
        >
          <span
            class="language-flag fi"
            :class="
              `fi-${currentLocale.flag}`
            "
          ></span>

          <span class="language-name">
            {{
              currentLocale.name
            }}
          </span>

          <span
            class="language-chevron"
            :class="{
              open:
                isOpen,
            }"
          >
            ▾
          </span>
        </button>

        <div
          v-if="isOpen"
          class="language-menu"
        >
          <button
            v-for="
              option
              in localeOptions
            "
            :key="option.code"
            class="language-option"
            :class="{
              active:
                option.code ===
                currentLocale.code,
            }"
            type="button"
            @click="
              selectLanguage(
                option.code,
              )
            "
          >
            <span
              class="
                language-option-flag
                fi
              "
              :class="
                `fi-${option.flag}`
              "
            ></span>

            <span
              class="
                language-option-name
              "
            >
              {{
                option.name
              }}
            </span>

            <span
              v-if="
                option.code ===
                currentLocale.code
              "
              class="language-check"
            >
              ✓
            </span>
          </button>
        </div>
      </div>

      <div class="engine-status">
        <span
          class="status-dot"
        ></span>

        <span>
          {{
            t(
              "header.engineReady",
            )
          }}
        </span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: relative;

  z-index: 40;

  display: flex;
  align-items: center;
  justify-content: space-between;

  min-height: 64px;

  padding: 0 24px;

  border-bottom:
    1px solid
    #213041;

  background:
    #0d141d;

  color:
    #f4f7fb;
}

.header-context {
  color:
    #8d9aab;

  font-size: 11px;

  letter-spacing:
    0.02em;
}

.header-actions {
  display: flex;
  align-items: center;

  gap: 18px;
}

.language-picker {
  position: relative;
}

.language-trigger {
  display: flex;
  align-items: center;

  gap: 9px;

  width: 170px;
  height: 36px;

  padding:
    0
    11px;

  border:
    1px solid
    #304256 !important;

  border-radius: 9px;

  background:
    #101925 !important;

  color:
    #f4f7fb !important;

  cursor: pointer;

  transition:
    border-color 140ms ease,
    background 140ms ease;
}

.language-trigger:hover {
  border-color:
    #22b8ff !important;

  background:
    #142131 !important;
}

.language-flag,
.language-option-flag {
  width: 20px;
  height: 14px;

  flex:
    0 0 auto;

  border-radius:
    2px;

  background-size:
    cover;

  box-shadow:
    0 0 0 1px
    rgba(
      255,
      255,
      255,
      0.12
    );
}

.language-name {
  flex: 1;

  overflow: hidden;

  color:
    #f4f7fb;

  font-size: 11px;

  text-align: left;

  text-overflow:
    ellipsis;

  white-space:
    nowrap;
}

.language-chevron {
  color:
    #748092;

  font-size: 11px;

  transition:
    transform 140ms ease;
}

.language-chevron.open {
  transform:
    rotate(180deg);
}

.language-menu {
  position: absolute;

  top:
    calc(
      100% + 7px
    );

  right: 0;

  z-index: 100;

  width: 215px;

  padding: 6px;

  border:
    1px solid
    #304256;

  border-radius: 10px;

  background:
    #101925;

  box-shadow:
    0 18px 45px
    rgba(
      0,
      0,
      0,
      0.45
    );
}

.language-option {
  display: flex;
  align-items: center;

  gap: 10px;

  width: 100%;

  min-height: 36px;

  padding:
    8px
    9px;

  border: 0;

  border-radius: 7px;

  background:
    transparent !important;

  color:
    #aeb9c7 !important;

  cursor: pointer;

  text-align: left;
}

.language-option:hover {
  background:
    rgba(
      34,
      184,
      255,
      0.08
    ) !important;

  color:
    #ffffff !important;
}

.language-option.active {
  background:
    rgba(
      34,
      184,
      255,
      0.14
    ) !important;

  color:
    #ffffff !important;
}

.language-option-name {
  flex: 1;

  color: inherit;

  font-size: 11px;
}

.language-check {
  color:
    #22b8ff;

  font-size: 12px;
  font-weight: 800;
}

.engine-status {
  display: flex;
  align-items: center;

  gap: 7px;

  color:
    #aeb9c7;

  font-size: 11px;

  white-space:
    nowrap;
}

.status-dot {
  width: 7px;
  height: 7px;

  border-radius:
    50%;

  background:
    #43d17a;

  box-shadow:
    0 0 0 4px
    rgba(
      67,
      209,
      122,
      0.08
    );
}

@media (
  max-width: 720px
) {
  .header-context {
    display: none;
  }

  .language-trigger {
    width: 145px;
  }
}
</style>