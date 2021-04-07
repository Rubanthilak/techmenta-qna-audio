<template>
  <header>
    <nav-bar></nav-bar>
  </header>
  <main>
    <home-view></home-view>
  </main>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

:root {
  --blue: #384cfc;
  --green: #01e64d;
  --red: #d41a23;
  --orange: #f16c13;
  --white: #ffffff;
  --black: #0b0e11;

  --font: 'Poppins',sans-serif;

  --light: 300;
  --regular:400;
  --medium: 500;
  --semibold: 600;
  --bold :700;

  --text-color: var(--white);
  --text-color-alt : var(--black);

  --background-color : var(--black);
  --background-color-alt : var(--white);

  --danger-color : var(--red);
  --success-color : var(--green);
  --warning-color : var(--orange);

  --primary-color-100: #dee3ea;
  --primary-color-200: #b2bdcd;
  --primary-color-300: #5d7290;
  --primary-color-600: #323d4d;
  --primary-color-700: #242c37;
  --primary-color-800: #151a21;
  --primary-color-900: #0b0e11;


  --accent-color-900 : var(--blue);


}

.container {
  width: 1200px;
  margin: 0px auto;
}

.flex {
  display: flex;
}

.subtitle{
  font-size: 20px;
  font-weight: var(--semibold);
}

body {
  margin: 0px;
  padding: 0px;
  background: var(--background-color);
  font-family: var(--font);
  color: var(--text-color)
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
  color: var(--text-color);
  border: none;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: var(--semibold);
}

</style>
