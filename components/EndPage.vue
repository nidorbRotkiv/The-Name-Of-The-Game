<script setup>
import RankingPage from "../components/RankingPage.vue";
</script>
<template>
  <main>
    <!-- Rank page -->
    <div v-if="rankWindow">
      <RankingPage :ranking="ranking" />
    </div>
    <!-- End page -->
    <div v-if="endWindow">
      <h1 id="titleHeading">THE NAME OF THE GAME</h1>
      <h2 class="h2Menu">
        YOUR TOTAL SCORE IS: <br />
        {{ totalPoints }} POINTS
      </h2>
      <div class="menu">
        <button @click="mainMenu()" class="start-btn">PLAY AGAIN</button>
        <button @click="rankingPage()" class="start-btn">SEE RANKING</button>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "EndPage",
  comments: {
    RankingPage,
  },
  data() {
    return {
      rankWindow: false,
      ranking: [],
      endWindow: true,
    };
  },
  methods: {
    mainMenu() {
      location.reload();
    },
    rankingPage() {
      this.endWindow = false;
      this.rankWindow = true;
    },
  },
  props: {
    totalPoints: Number,
  },
};
</script>
