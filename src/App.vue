<template>
  <header>
    <top-bar v-if="isAuthenticated"></top-bar>
  </header>
  <main class="container">
    <router-view></router-view>
  </main>
</template>

<script>
export default {
  name: "TechMenta",
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  beforeCreate() {
    this.$store.getters.firebaseAuth.onAuthStateChanged((user) => {
      this.$store.dispatch("fetchUser", user);
    });
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

:root {
  --blue: #384cfc;
  --green: #01e64d;
  --red: #fd4d4d;
  --orange: #fd6868;

  --font: "Poppins", sans-serif;

  --light: 300;
  --regular: 400;
  --medium: 500;
  --semibold: 600;
  --bold: 700;

  --danger-color: var(--red);
  --success-color: var(--green);
  --warning-color: var(--orange);

  --primary-color-000: #ffffff;
  --primary-color-100: #dee3ea;
  --primary-color-200: #b2bdcd;
  --primary-color-300: #5d7290;
  --primary-color-600: #323d4d;
  --primary-color-700: #242c37;
  --primary-color-800: #151a21;
  --primary-color-900: #0b0e11;

  --text-color: var(--primary-color-000);
  --text-color-alt: var(--primary-color-900);
  --background-color: var(--primary-color-900);
  --background-color-alt: var(--primary-color-000);

  --accent-color-000: #fafafa;
  --accent-color-100: #c6c8d8;
  --accent-color-200: #daddf5;
  --accent-color-300: #c2c7f3;
  --accent-color-400: #a0a8f0;
  --accent-color-500: #8c97fa;
  --accent-color-600: #6f7dfa;
  --accent-color-700: #4d5ffd;
  --accent-color-800: #4e5fff;
  --accent-color-900: #384cfc;
}

.container {
  width: 1200px;
  margin: 0px auto;
}

.flex {
  display: flex;
}

.subtitle {
  font-size: 20px;
  font-weight: var(--semibold);
}

body {
  margin: 0px;
  padding: 0px;
  background: var(--background-color);
  font-family: var(--font);
  color: var(--text-color);
}

main {
  margin-top: 30px !important;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0px;
}

p {
  margin: 0px;
}

a {
  text-decoration: none;
  color: var(--text-color);
}

button {
  padding: 10px 25px;
  background: var(--accent-color-900);
  font-family: var(--font);
  color: #ffffff;
  border: none;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: var(--semibold);
}
</style>
