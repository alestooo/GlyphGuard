<script setup lang="ts">
import {
  ref,
} from "vue";

import PageTitle from "../components/common/PageTitle.vue";

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
      title="Settings"
      subtitle="Configure the GlyphGuard desktop experience."
    />

    <div class="settings-layout">
      <article class="panel">
        <span class="panel-label">
          Detection rules
        </span>

        <h2 class="panel-title">
          Security scanning
        </h2>

        <div class="settings-list">
          <label class="setting-row">
            <div>
              <strong>
                Mixed scripts
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
                Invisible characters
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
                Bidi controls
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
                Unicode confusables
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
                Suspicious whitespace
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
          Rule toggles are visual for now.
          Persistent configuration will
          be connected later.
        </p>
      </article>

      <article class="panel">
        <span class="panel-label">
          Appearance
        </span>

        <h2 class="panel-title">
          Theme
        </h2>

        <div class="theme-options">
          <label>
            <input
              v-model="theme"
              type="radio"
              value="system"
            />

            System
          </label>

          <label>
            <input
              v-model="theme"
              type="radio"
              value="dark"
            />

            Dark
          </label>

          <label>
            <input
              v-model="theme"
              type="radio"
              value="light"
            />

            Light
          </label>
        </div>

        <p class="settings-note">
          Dark mode is currently the
          active GlyphGuard interface.
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
}

.setting-row:last-child {
  border-bottom: 0;
}

.setting-row div {
  display: flex;
  flex-direction: column;
}

.setting-row strong {
  font-size: 13px;
}

.setting-row span {
  color: var(--text-muted);
  font-size: 10px;
}

.setting-row input {
  width: 17px;
  height: 17px;

  accent-color:
    var(--accent-primary);
}

.theme-options {
  display: flex;
  flex-direction: column;
  gap: 12px;

  margin-top: 18px;
}

.theme-options label {
  display: flex;
  align-items: center;
  gap: 9px;

  color: var(--text-secondary);
}

.theme-options input {
  accent-color:
    var(--accent-primary);
}

.settings-note {
  margin-top: 18px;

  color: var(--text-muted);

  font-size: 11px;
  line-height: 1.6;
}

@media (
  max-width: 750px
) {
  .settings-layout {
    grid-template-columns: 1fr;
  }
}
</style>