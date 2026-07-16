<template>
  <footer class="site-footer">
    <v-container class="site-footer__inner" fluid>
      <v-row align="center">
        <v-col cols="12" md="6">
          <h2>Simple newsletter admin.</h2>
          <v-btn
            class="site-footer__button"
            href="https://vernard.net"
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            variant="outlined"
            size="large"
          >
            vernard.net
          </v-btn>
        </v-col>

        <v-col cols="12" md="6">
          <div class="site-footer__tech-card">
            <h3>What is under the bonnet</h3>
            <p>
              Vue 3 handles the interface, Vue Router keeps both views properly linkable, and Vuetify supplies the form, feedback, dialog, and table building blocks.
            </p>
            <p>
              The theme uses 'Treehouse' green, bark brown, TH black, white, and 5 shades of grey.
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </footer>
</template>

<style lang="scss" scoped>
.site-footer {
  min-height: 350px;
  color: var(--colour-background-white);
  background: var(--colour-th-green);
  border-top: 6px solid var(--colour-th-black);
}

.site-footer__inner {
  width: min(100%, 1920px);
  min-height: 344px;
  margin: 0 auto;
  padding: 52px 20px;
  display: flex;
  align-items: center;
}

.site-footer h2 {
  max-width: 590px;
  margin: 0 0 24px;
  color: var(--colour-background-white);
  font-size: clamp(1.75rem, 4vw, 2.55rem);
}

.site-footer__button {
  color: var(--colour-th-green) !important;
  background: var(--colour-background-white) !important;
  border-color: var(--colour-th-green) !important;
}

.site-footer__button:hover,
.site-footer__button:focus-visible {
  color: var(--colour-background-white) !important;
  background: var(--colour-th-black) !important;
  border-color: var(--colour-th-black) !important;
}

.site-footer__tech-card {
  padding: 30px;
  color: var(--colour-th-black);
  background: var(--colour-background-white);
  border: 1px solid var(--colour-gray-300);
  border-radius: 18px;
  box-shadow: 0 14px 34px rgb(72 64 62 / 14%);

  h3 {
    margin: 0 0 18px;
    color: var(--colour-th-black);
    font-size: 1.35rem;
  }

  p {
    max-width: 700px;
    margin: 0 0 14px;
    color: var(--colour-th-black);
  }

  p:last-child {
    margin-bottom: 0;
  }
}

@media (min-width: 960px) {
  .site-footer__inner {
    padding: 60px 30px;
  }
}
</style>
