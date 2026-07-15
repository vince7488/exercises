<template>
  <main class="landing">
    <h1>Hello, Treehouse</h1>
  </main>
</template>

<style scoped>
.landing {
  min-height: 100vh;
  display: grid;
  place-items: center;
  margin: 0;
  text-align: center;
}

h1 {
  margin: 0;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 700;
  color: #1f2937;
}
</style>
