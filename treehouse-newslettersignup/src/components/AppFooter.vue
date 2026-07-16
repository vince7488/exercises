<template>
  <footer class="site-footer">
    <v-container class="site-footer__inner" fluid>
      <v-row align="center">
        <v-col cols="12" md="6">
          <p class="site-footer__eyebrow">Built by Vernard</p>
          <h2>Simple newsletter admin.<br />No mystery meat.</h2>
          <a
            class="site-footer__link"
            href="https://vernard.net"
            target="_blank"
            rel="noopener noreferrer"
          >
            vernard.net
          </a>
        </v-col>

        <v-col cols="12" md="6">
          <h3>What is under the bonnet</h3>
          <p>
            Vue 3 handles the interface, Vue Router keeps the two views properly
            linkable, and Vuetify supplies the accessible form, feedback, dialog,
            and table building blocks.
          </p>
          <p>
            The theme starts with Treehouse green, bark brown, warm black, and a
            clean white surface. A small service layer keeps API details out of the
            pages. Boring, readable, and less likely to bite later.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </footer>
</template>

<style lang="scss" scoped>
.site-footer {
  min-height: 350px;
  color: var(--colour-background-white);
  background: var(--colour-branded-black);
  border-top: 6px solid var(--colour-treehouse-green);
}

.site-footer__inner {
  width: min(100%, 1920px);
  min-height: 344px;
  margin: 0 auto;
  padding: 52px 20px;
  display: flex;
  align-items: center;
}

.site-footer h2,
.site-footer h3 {
  margin: 0 0 18px;
  color: var(--colour-background-white);
}

.site-footer h2 {
  max-width: 590px;
  font-size: clamp(1.75rem, 4vw, 2.55rem);
}

.site-footer h3 {
  font-size: 1.35rem;
}

.site-footer p {
  max-width: 700px;
  margin: 0 0 14px;
  color: #eeeae8;
}

.site-footer__eyebrow {
  color: #b9dca9 !important;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.site-footer__link {
  display: inline-block;
  color: #c9e8ba;
  font-size: 1.1rem;
  font-weight: 700;
}

@media (min-width: 960px) {
  .site-footer__inner {
    padding: 60px 30px;
  }
}
</style>
