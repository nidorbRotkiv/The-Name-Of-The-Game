<template>
  <main>
    <h1 id="titleHeading">THE NAME OF THE GAME</h1>
    <div class="spinning-ring"></div>
  </main>
</template>

<script>
export default {
  name: 'LoadPage',
}
</script>

<style scoped>
.spinning-ring {
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.spinning-ring:after {
  content: ' ';
  display: block;
  width: 30vh;
  height: 30vh;
  margin: 20px;
  border-radius: 50%;
  border: 3vw double;
  filter: drop-shadow(0 0 1rem var(--darkgreen));
  box-shadow: 0 0.2em 1em 0.2em var(--lightgreen);
  border-color: var(--lightgreen) transparent var(--lightgreen) transparent;
  animation: spinning-ring 1.4s ease infinite, colorChange 2.8s ease infinite;
}

@keyframes colorChange {
  0% {
    filter: drop-shadow(0 0 1rem var(--darkgreen));
    box-shadow: 0 0.2em 1em 0.2em var(--lightgreen);
  }
  50% {
    filter: drop-shadow(0 0 1rem yellow);
    box-shadow: 0 0.4em 2em 0.4em yellow;
    border-color: yellow transparent yellow transparent;
  }
}

@keyframes spinning-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
