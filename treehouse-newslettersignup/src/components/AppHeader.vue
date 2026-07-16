<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import logoUrl from '../assets/images/th-marketing-logo-2021.svg';

const mobileMenuOpen = ref(false);
const headerMode = ref('static');
const stickyThreshold = 123;
const leaveDuration = 220;
let leaveTimer;

function updateHeaderMode() {
  // Switches between document flow and the compact fixed header at the requested scroll threshold.
  if (window.scrollY > stickyThreshold) {
    window.clearTimeout(leaveTimer);
    leaveTimer = undefined;
    headerMode.value = 'sticky';
    return;
  }

  if (headerMode.value === 'sticky') {
    headerMode.value = 'leaving';
    leaveTimer = window.setTimeout(() => {
      headerMode.value = 'static';
      leaveTimer = undefined;
    }, leaveDuration);
  }
}

onMounted(() => {
  updateHeaderMode();
  window.addEventListener('scroll', updateHeaderMode, { passive: true });
});

onUnmounted(() => {
  window.clearTimeout(leaveTimer);
  window.removeEventListener('scroll', updateHeaderMode);
});
</script>

<template>
  <div class="site-header-shell">
    <header
      class="site-header"
      :class="{
        'site-header--sticky': headerMode === 'sticky',
        'site-header--leaving': headerMode === 'leaving',
      }"
    >
      <div class="site-header__inner">
        <RouterLink class="site-header__brand" :to="{ name: 'manage-list' }" aria-label="Treehouse Marketing newsletter home">
          <img :src="logoUrl" alt="Treehouse Marketing" />
        </RouterLink>

        <nav class="site-header__nav" aria-label="Primary navigation">
          <RouterLink :to="{ name: 'manage-list' }">Manage List</RouterLink>
          <RouterLink :to="{ name: 'sign-up' }">Sign Up</RouterLink>
        </nav>

        <v-btn class="site-header__cta" href="https://treehousemarketing.com" target="_blank" rel="noopener noreferrer" size="large">
          Visit Treehouse Marketing
        </v-btn>

        <div class="site-header__mobile-menu">
          <v-menu v-model="mobileMenuOpen" location="bottom end" :close-on-content-click="true">
            <template #activator="{ props }">
              <v-btn v-bind="props" class="mobile-menu__trigger" color="secondary" variant="outlined" aria-label="Open navigation menu">
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
                <v-list-item :to="{ name: 'manage-list' }" @click="mobileMenuOpen = false">
                  <v-list-item-title>Lists</v-list-item-title>
                </v-list-item>
                <v-divider />
                <v-list-item :to="{ name: 'sign-up' }" @click="mobileMenuOpen = false">
                  <v-list-item-title>Sign up</v-list-item-title>
                </v-list-item>
              </v-list>

              <v-divider />
              <v-card-actions>
                <v-btn block color="primary" variant="flat" href="https://treehousemarketing.com" target="_blank" rel="noopener noreferrer">
                  Visit Treehouse
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </div>
      </div>
    </header>
  </div>
</template>

<style lang="scss" scoped>
.site-header-shell {
  height: 120px;
}

.site-header {
  position: relative;
  z-index: 100;
  height: 120px;
  background: var(--colour-background-white);
  border-bottom: 1px solid var(--colour-bark-brown);
  transition:
    height 280ms cubic-bezier(0.2, 0.8, 0.2, 1),
    box-shadow 280ms ease;
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
  transition: width 280ms cubic-bezier(0.2, 0.8, 0.2, 1);

  img {
    display: block;
    width: 100%;
    height: 74px;
    object-fit: contain;
    object-position: left center;
    transition: height 280ms cubic-bezier(0.2, 0.8, 0.2, 1);
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
  transition:
    height 280ms ease,
    min-width 280ms ease;
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
  border-top: 4px solid var(--colour-th-green);

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
  color: var(--colour-th-black);
  font-size: 1.15rem;
  font-weight: 800;
}

@media (min-width: 960px) {
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
      transition:
        color 180ms ease,
        border-color 180ms ease,
        font-size 280ms ease;
    }

    a:hover,
    a:focus-visible,
    a.router-link-exact-active {
      color: var(--colour-th-green);
      border-bottom-color: var(--colour-th-green);
    }
  }

  .site-header__cta {
    grid-column: 3;
    grid-row: 1;
    display: inline-flex;
    justify-self: end;
    min-width: 250px;
    transition:
      height 280ms ease,
      min-width 280ms ease,
      font-size 280ms ease;
  }

  .site-header__mobile-menu {
    display: none;
  }
}

.site-header--sticky,
.site-header--leaving {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 50px;
  box-shadow: 0 8px 24px rgb(72 64 62 / 14%);

  .site-header__brand {
    width: 124px;

    img {
      height: 38px;
    }
  }

  .mobile-menu__trigger {
    min-width: 46px;
    height: 40px;
    padding: 0 11px;
  }
}

.site-header--sticky {
  animation: compact-header-drop 320ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.site-header--leaving {
  animation: compact-header-lift 220ms ease-in forwards;
}

@media (min-width: 960px) {
  .site-header--sticky,
  .site-header--leaving {
    .site-header__inner {
      grid-template-columns: minmax(160px, 1fr) auto minmax(220px, 1fr);
      column-gap: 24px;
    }

    .site-header__brand {
      width: 145px;
    }

    .site-header__nav {
      gap: 28px;

      a {
        font-size: 0.9rem;
      }
    }

    .site-header__cta {
      min-width: 215px;
      height: 38px;
      font-size: 1rem !important;
    }
  }
}

@keyframes compact-header-drop {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes compact-header-lift {
  from {
    opacity: 1;
    transform: translateY(0);
  }

  to {
    opacity: 0;
    transform: translateY(-100%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .site-header,
  .site-header__brand,
  .site-header__brand img,
  .site-header__nav a,
  .site-header__cta,
  .mobile-menu__trigger {
    transition: none;
    animation: none;
  }

  .site-header--leaving {
    opacity: 0;
  }
}
</style>
