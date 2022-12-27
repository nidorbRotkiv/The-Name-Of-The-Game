<template>
  <main>
    <h1 id="titleHeading">THE NAME OF THE GAME</h1>
    <div class="menu">
      <button id="big-btn" class="start-btn" @click="categoryChoice('noCategory')">ALL GAMES</button>
      <button class="start-btn" @click="categoryChoice('80')">1980s</button>
      <button class="start-btn" @click="categoryChoice('90')">1990s</button>
      <button class="start-btn" @click="categoryChoice('00')">2000s</button>
      <button class="start-btn" @click="categoryChoice('10')">2010s</button>
    </div>
  </main>
</template>

<script>
export default {
  name: 'MenuPage',
  data() {
    return {
      category: '',
    }
  },
  methods: {
    categoryChoice(category) {
      this.$emit('categoryChoice', category)
    },
  },
}
</script>
