<script setup>
import { ref } from "vue";
import logoUrl from "../assets/images/th-marketing-logo-2021.svg";

const mobileMenuOpen = ref(false);
</script>

<template>
  <header class="site-header">
    <div class="site-header__inner">
      <RouterLink
        class="site-header__brand"
        :to="{ name: 'manage-list' }"
        aria-label="Treehouse Marketing newsletter home"
      >
        <img :src="logoUrl" alt="Treehouse Marketing" />
      </RouterLink>

      <nav class="site-header__nav" aria-label="Primary navigation">
        <RouterLink :to="{ name: 'manage-list' }">Manage List</RouterLink>
        <RouterLink :to="{ name: 'sign-up' }">Sign Up</RouterLink>
      </nav>

      <v-btn
        class="site-header__cta"
        href="https://treehousemarketing.com"
        target="_blank"
        rel="noopener noreferrer"
        size="large"
      >
        Visit Treehouse Marketing
      </v-btn>

      <div class="site-header__mobile-menu">
        <v-menu
          v-model="mobileMenuOpen"
          location="bottom end"
          :close-on-content-click="true"
        >
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              class="mobile-menu__trigger"
              color="secondary"
              variant="outlined"
              aria-label="Open navigation menu"
            >
              <span class="mobile-menu__icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </v-btn>
          </template>

          <v-card class="mobile-menu__card" min-width="280" elevation="8">
            <p class="mobile-menu__heading">Menu</p>
            <v-divider />

            <v-list nav>
              <v-list-item
                :to="{ name: 'manage-list' }"
                @click="mobileMenuOpen = false"
              >
                <v-list-item-title>Lists</v-list-item-title>
              </v-list-item>
              <v-divider />
              <v-list-item
                :to="{ name: 'sign-up' }"
                @click="mobileMenuOpen = false"
              >
                <v-list-item-title>Sign up</v-list-item-title>
              </v-list-item>
            </v-list>

            <v-divider />
            <v-card-actions>
              <v-btn
                block
                color="primary"
                variant="flat"
                href="https://treehousemarketing.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Treehouse
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.site-header {
  position: relative;
  z-index: 10;
  height: 120px;
  background: var(--colour-background-white);
  border-bottom: 1px solid var(--colour-bark-brown);
}

.site-header__inner {
  width: min(100%, 1920px);
  height: 100%;
  margin: 0 auto;
  padding: 0 16px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  column-gap: 12px;
}

.site-header__brand {
  grid-column: 1;
  grid-row: 1;
  display: inline-flex;
  width: min(180px, 100%);

  img {
    display: block;
    width: 100%;
    height: 74px;
    object-fit: contain;
    object-position: left center;
  }
}

.site-header__nav,
.site-header__cta {
  display: none;
}

.site-header__mobile-menu {
  grid-column: 2;
  grid-row: 1;
  justify-self: end;
}

.mobile-menu__trigger {
  min-width: 54px;
  height: 48px;
  padding: 0 14px;
}

.mobile-menu__icon {
  width: 24px;
  display: grid;
  gap: 5px;

  span {
    display: block;
    height: 2px;
    background: currentColor;
    border-radius: 999px;
  }
}

.mobile-menu__card {
  margin-top: 10px;
  overflow: hidden;
  border-top: 4px solid var(--colour-treehouse-green);

  :deep(.v-list) {
    padding: 0;
  }

  :deep(.v-list-item) {
    min-height: 56px;
    font-weight: 700;
  }

  :deep(.v-card-actions) {
    padding: 16px;
  }
}

.mobile-menu__heading {
  margin: 0;
  padding: 18px 20px;
  color: var(--colour-branded-black);
  font-size: 1.15rem;
  font-weight: 800;
}

@media (min-width: 760px) {
  .site-header__inner {
    padding: 0 30px;
    grid-template-columns: minmax(210px, 1fr) auto minmax(260px, 1fr);
    column-gap: 30px;
  }

  .site-header__brand {
    grid-column: 1;
    grid-row: 1;
    width: 230px;

    img {
      height: 78px;
    }
  }

  .site-header__nav {
    grid-column: 2;
    grid-row: 1;
    display: flex;
    align-items: center;
    gap: 36px;

    a {
      padding: 5px 0;
      color: var(--colour-text);
      font-size: 1rem;
      font-weight: 700;
      text-decoration: none;
      border-bottom: 3px solid transparent;
    }

    a:hover,
    a:focus-visible,
    a.router-link-exact-active {
      color: var(--colour-treehouse-green);
      border-bottom-color: var(--colour-treehouse-green);
    }
  }

  .site-header__cta {
    grid-column: 3;
    grid-row: 1;
    display: inline-flex;
    justify-self: end;
    min-width: 250px;
  }

  .site-header__mobile-menu {
    display: none;
  }
}
</style>
