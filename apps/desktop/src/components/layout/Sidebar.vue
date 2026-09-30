<script setup lang="ts">
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

const emit = defineEmits<{
  navigate: [page: PageName];
}>();

type NavigationItem = {
  id: PageName;
  label: string;
  shortLabel: string;
};

const navigationItems: NavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    shortLabel: "DB",
  },
  {
    id: "scan",
    label: "Scan Text",
    shortLabel: "SC",
  },
  {
    id: "files",
    label: "Files",
    shortLabel: "FL",
  },
  {
    id: "compare",
    label: "Compare",
    shortLabel: "CP",
  },
  {
    id: "inspector",
    label: "Inspector",
    shortLabel: "IN",
  },
  {
    id: "normalize",
    label: "Normalize",
    shortLabel: "NM",
  },
];

function navigate(page: PageName) {
  emit("navigate", page);
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-brand">
      <div class="sidebar-logo">
        G
      </div>

      <div class="sidebar-brand-text">
        <strong>GlyphGuard</strong>
        <span>Unicode Security</span>
      </div>
    </div>

    <div class="sidebar-section">
      <span class="sidebar-section-title">
        Workspace
      </span>

      <nav class="sidebar-navigation">
        <button
          v-for="item in navigationItems"
          :key="item.id"
          class="sidebar-link"
          :class="{
            'sidebar-link-active':
              activePage === item.id,
          }"
          type="button"
          @click="navigate(item.id)"
        >
          <span class="sidebar-link-icon">
            {{ item.shortLabel }}
          </span>

          <span>
            {{ item.label }}
          </span>
        </button>
      </nav>
    </div>

    <div class="sidebar-footer">
      <button
        class="sidebar-link"
        :class="{
          'sidebar-link-active':
            activePage === 'settings',
        }"
        type="button"
        @click="navigate('settings')"
      >
        <span class="sidebar-link-icon">
          ST
        </span>

        <span>
          Settings
        </span>
      </button>

      <div class="sidebar-version">
        GlyphGuard Desktop
        <span>v0.1.0</span>
      </div>
    </div>
  </aside>
</template>