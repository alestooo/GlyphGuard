<script setup lang="ts">
import {
  useI18n,
} from "vue-i18n";

type PageName =
  | "dashboard"
  | "scan"
  | "files"
  | "compare"
  | "inspector"
  | "normalize"
  | "settings";

defineProps<{
  activePage: PageName;
}>();

const emit =
  defineEmits<{
    navigate: [page: PageName];
  }>();

const {
  t,
} = useI18n({
  useScope: "global",
});

const navigationItems = [
  {
    id: "dashboard" as const,
    shortLabel: "DB",
    key:
      "navigation.dashboard",
  },
  {
    id: "scan" as const,
    shortLabel: "SC",
    key:
      "navigation.scan",
  },
  {
    id: "files" as const,
    shortLabel: "FL",
    key:
      "navigation.files",
  },
  {
    id: "compare" as const,
    shortLabel: "CP",
    key:
      "navigation.compare",
  },
  {
    id: "inspector" as const,
    shortLabel: "IN",
    key:
      "navigation.inspector",
  },
  {
    id: "normalize" as const,
    shortLabel: "NM",
    key:
      "navigation.normalize",
  },
];

function navigate(
  page: PageName,
) {
  emit(
    "navigate",
    page,
  );
}
</script>

<template>
  <aside class="app-sidebar">
    <div class="brand">
        <div class="brand-mark">
        <img
            src="/glyphguard-logo.png"
            alt=""
            class="brand-logo"
        />
        </div>

      <div class="brand-copy">
        <strong>
          GlyphGuard
        </strong>

        <span>
          Unicode Security
        </span>
      </div>
    </div>

    <div class="sidebar-section-label">
      {{
        t(
          "navigation.workspace",
        )
      }}
    </div>

    <nav class="sidebar-navigation">
      <button
        v-for="
          item
          in navigationItems
        "
        :key="item.id"
        class="sidebar-item"
        :class="{
          active:
            activePage ===
            item.id,
        }"
        type="button"
        @click="
          navigate(
            item.id,
          )
        "
      >
        <span class="sidebar-icon">
          {{
            item.shortLabel
          }}
        </span>

        <span class="sidebar-item-text">
          {{
            t(
              item.key,
            )
          }}
        </span>
      </button>
    </nav>

    <div class="sidebar-footer">
      <button
        class="sidebar-item"
        :class="{
          active:
            activePage ===
            'settings',
        }"
        type="button"
        @click="
          navigate(
            'settings',
          )
        "
      >
        <span class="sidebar-icon">
          ST
        </span>

        <span class="sidebar-item-text">
          {{
            t(
              "navigation.settings",
            )
          }}
        </span>
      </button>

      <div class="sidebar-meta">
        <span>
          GlyphGuard Desktop
        </span>

        <span>
          v0.1.0
        </span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.app-sidebar {
  position: fixed;

  top: 0;
  bottom: 0;
  left: 0;

  z-index: 50;

  display: flex;
  flex-direction: column;

  width: 248px;

  padding: 20px 14px 14px;

  overflow: hidden;

  border-right:
    1px solid
    #213041;

  background:
    #0d1723;

  color:
    #f4f7fb;
}

.brand {
  display: flex;
  align-items: center;

  gap: 13px;

  min-height: 56px;

  padding: 0 6px;
}

.brand-mark {
  display: grid;
  place-items: center;

  width: 38px;
  height: 38px;

  flex: 0 0 38px;

  border:
    1px solid
    rgba(
      34,
      184,
      255,
      0.35
    );

  border-radius: 11px;

  background: transparent;

  overflow: hidden;
}

.brand-logo {
  display: block;

  width: 30px;
  height: 30px;

  object-fit: contain;
}

.brand-copy {
  display: flex;
  flex-direction: column;

  min-width: 0;
}

.brand-copy strong {
  color:
    #f4f7fb;

  font-size: 14px;
  line-height: 1.25;
}

.brand-copy span {
  margin-top: 4px;

  color:
    #8d9aab;

  font-size: 10px;
}

.sidebar-section-label {
  margin:
    25px
    10px
    10px;

  color:
    #7d8a9b;

  font-size: 9px;
  font-weight: 700;

  letter-spacing:
    0.16em;

  text-transform:
    uppercase;
}

.sidebar-navigation {
  display: flex;
  flex-direction: column;

  gap: 4px;
}

.sidebar-item {
  display: flex;
  align-items: center;

  gap: 12px;

  width: 100%;
  min-height: 46px;

  padding:
    6px
    10px;

  border:
    1px solid
    transparent;

  border-radius: 9px;

  outline: none;

  background:
    transparent !important;

  color:
    #aeb9c7 !important;

  font: inherit;
  font-size: 12px;

  cursor: pointer;

  text-align: left;

  transition:
    background 130ms ease,
    border-color 130ms ease,
    color 130ms ease;
}

.sidebar-item:hover {
  background:
    rgba(
      255,
      255,
      255,
      0.05
    ) !important;

  color:
    #ffffff !important;
}

.sidebar-item.active {
  border-color:
    rgba(
      34,
      184,
      255,
      0.42
    );

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

.sidebar-icon {
  display: grid;
  place-items: center;

  width: 28px;
  height: 28px;

  flex: 0 0 28px;

  border:
    1px solid
    #40536a;

  border-radius: 7px;

  color:
    #9cabbc;

  font-family:
    "Cascadia Code",
    Consolas,
    monospace;

  font-size: 8px;
  font-weight: 700;
}

.sidebar-item.active
.sidebar-icon {
  border-color:
    rgba(
      34,
      184,
      255,
      0.5
    );

  background:
    rgba(
      34,
      184,
      255,
      0.1
    );

  color:
    #22b8ff;
}

.sidebar-item-text {
  min-width: 0;

  overflow: hidden;

  color: inherit;

  text-overflow:
    ellipsis;

  white-space:
    nowrap;
}

.sidebar-footer {
  display: flex;
  flex-direction: column;

  gap: 10px;

  margin-top: auto;
}

.sidebar-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding:
    0
    7px;

  color:
    #748092;

  font-size: 8px;
}
</style>