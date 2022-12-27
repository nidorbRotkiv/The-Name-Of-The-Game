<template>
  <div id="container">
    <input
      autofocus
      id="textField"
      @keyup.enter="submitGuess()"
      type="text"
      v-model="guess"
      style="text-transform: uppercase"
    />
    <button @click="submitGuess()" id="guessButton">
      <i id="playIcon" class="fa-solid fa-play"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'InputGuess',
  data() {
    return {
      guess: '',
    }
  },
  methods: {
    submitGuess() {
      this.$emit('submitGuess', this.guess.toUpperCase())
      this.guess = ''
    },
    focus() {
      this.guess = ''
      document.getElementById('textField').focus()
    },
    changeBorderColor(color) {
      document.getElementById('container').style.borderColor = color
    },
  },
}
</script>

<style scoped>
input {
  background-color: var(--barBackGround);
  text-align: center;
  text-indent: calc(50% - 28vw);
  height: 8vh;
  float: left;
  width: 85%;
  outline: none;
  font-size: xx-large;
  word-spacing: -1vw;
}

#guessButton {
  background-color: var(--darkgreen);
  width: 15%;
  height: 8vh;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}

#guessButton:hover {
  box-shadow: 0 0.2em 1em 0.1em var(--lightgreen);
}

#playIcon {
  font-size: 4vh;
  filter: drop-shadow(1px 2px var(--barBackGround));
}

#container {
  border-top: 0.35vh;
  border-bottom: 0.35vh;
  border-color: grey;
  border-style: solid;
  background-color: var(--barBackGround);
}

@media only screen and (max-width: 700px) {
  input {
    font-size: x-large;
  }
}
</style>
