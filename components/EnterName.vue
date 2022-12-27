<template>
  <main>
    <h1 id="titleHeading">THE NAME OF THE GAME</h1>
    <div id="nameMenu" class="menu">
      <input
        v-model="name"
        @keyup.enter="startGame()"
        type="text"
        id="nameInput"
        placeholder="ENTER YOUR NAME"
      />
      <button id="big-btn" class="start-btn">START GAME</button>
    </div>
  </main>
</template>

<script>
export default {
  name: "EnterName",
  data() {
    return {
      name: "",
      nameMaxLength: 18,
    };
  },
  methods: {
    startGame() {
      const doc = document.getElementById("nameInput");
      const name = this.name.trim();
      if (name === "") {
        doc.value = "";
        doc.style.borderColor = "red";
        doc.focus();
        return;
      }
      if (name.length > this.nameMaxLength) {
        doc.value = "";
        doc.placeholder = "NAME TOO LONG";
        doc.style.borderColor = "red";
        return;
      }
      // If the input field is not empty, send the value to the parent component
      this.$emit("start-game", name);
    },
  },
  mounted() {
    // Add an event listener to the button
    document
      .getElementById("big-btn")
      .addEventListener("click", this.startGame);
    document.getElementById("nameInput").focus();
  },
};
</script>

<style scoped>
#nameMenu {
  grid-template-columns: 1fr;
}
#nameInput {
  caret-color: var(--darkgreen);
  border: 1px solid grey;
  border-radius: 3px;
  background-color: var(--barBackGround);
  text-align: center;
  height: 8vh;
  width: 80vw;
  outline: none;
  font-size: 2.5vw;
  word-spacing: -1vw;
  margin-bottom: 1vh;
  margin: 5%;
}

@media only screen and (max-width: 900px) {
  #nameInput {
    font-size: 4vw;
  }
}
</style>
