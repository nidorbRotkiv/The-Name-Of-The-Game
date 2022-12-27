<template>
  <div id="buttonDiv">
    <button @click="skip()" id="skipButton">SKIP</button>
  </div>
</template>

<script>
export default {
  name: 'SkipButton',
  methods: {
    skip() {
      this.$emit('skip-btn-click')
    },
  },
}
</script>

<style scoped>
#skipButton {
  letter-spacing: 3px;
  border: 0.5vh;
  border-style: solid;
  background-color: var(--darkgreen);
  text-align: center;
  text-shadow: -2px -2px var(--lightgreen);
  color: rgb(255, 255, 255);
  -webkit-border-radius: 7px;
  -moz-border-radius: 7px;
  -o-border-radius: 7px;
  border-radius: 7px;
  box-shadow: 0 0.1em 0.5em 0.075em var(--lightgreen);
  cursor: pointer;
  padding: 1.2vh;
}

#skipButton:hover {
  box-shadow: none;
}

#buttonDiv {
  text-align: center;
  margin-top: 3vh;
}
</style>
