<script setup>
import Timer from "../components/Timer.vue";
import AmountCompleted from "../components/AmountCompleted.vue";
import Points from "../components/Points.vue";
import Hint from "../components/Hint.vue";
import GameCover from "../components/GameCover.vue";
import InputGuess from "../components/InputGuess.vue";
import SkipButton from "../components/SkipButton.vue";
import MenuPage from "../components/MenuPage.vue";
import LoadPage from "../components/LoadPage.vue";
import EndPage from "../components/EndPage.vue";
import EnterName from "../components/EnterName.vue";
</script>

<template>
  <main>
    <!-- Enter name page -->
    <div v-if="enterNameWindow" class="enterNameWindow">
      <EnterName @start-game="enterName" />
    </div>
    <!--Menu page -->
    <div v-if="menuWindow" class="menuWindow">
      <MenuPage @categoryChoice="play" />
    </div>
    <!-- Load page -->
    <div v-if="loadWindow" class="loadWindow">
      <LoadPage />
    </div>
    <!-- End page -->
    <div v-if="endWindow" class="endWindow">
      <EndPage :totalPoints="points" />
    </div>
    <!--Game page -->
    <div v-if="gameWindow" class="gameWindow">
      <Timer ref="timer" @updateBlur="updateBlur" />
      <div class="infoBar">
        <AmountCompleted :numberOfGames="games.length" :completed="gameIndex" />
        <Points :points="points" />
        <Hint :showHint="showHint" :hint="hint" @giveHint="giveHint" />
      </div>
      <GameCover :blur="blurValue" :imageURL="imageURL" />
      <InputGuess ref="inputGuess" @submitGuess="submitGuess" />
      <SkipButton @skip-btn-click="setSkipButton" />
    </div>
  </main>
</template>

<script>
export default {
  name: "IndexPage",
  components: {
    EnterName,
    Timer,
    AmountCompleted,
    Points,
    Hint,
    GameCover,
    InputGuess,
    SkipButton,
    MenuPage,
    LoadPage,
    EndPage,
  },
  data() {
    return {
      nameOfUser: sessionStorage.getItem("name") || undefined,
      blurValue: 20,
      imageURL: undefined,
      namesOfGame: [],
      games: [],
      gameIndex: 0,
      hint: undefined,
      showHint: false,
      enterNameWindow: true,
      menuWindow: false,
      loadWindow: false,
      gameWindow: false,
      endWindow: false,
      category: undefined,
      points: 0,
      potentialPoints: 20,
      time: 20000,
      skip: false,
      correctGuess: false,
      sameGame: false,
    };
  },
  methods: {
    enterName(name) {
      this.nameOfUser = name;
      this.enterNameWindow = false;
      this.menuWindow = true;
      sessionStorage.setItem("name", name);
    },
    async play(category) {
      this.menuWindow = false;
      this.loadWindow = true;
      this.category = category;
      await this.fetchGames();
      this.getNewGame();
      this.loadWindow = false;
      this.gameWindow = true;
    },
    setSkipButton() {
      this.skip = true;
    },
    updateBlur(val) {
      this.blurValue = val;
    },
    submitGuess(guess) {
      for (const title of this.namesOfGame) {
        if (this.stringSimilarity(guess, title.toString()) > 0.8) {
          this.$refs.inputGuess.changeBorderColor("var(--lightgreen)");
          this.correctGuess = true;
          this.points += this.potentialPoints;
          break;
        } else {
          this.$refs.inputGuess.changeBorderColor("red");
        }
      }
    },
    stringSimilarity(s1, s2) {
      var longer = s1;
      var shorter = s2;
      if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
      }
      var longerLength = longer.length;
      if (longerLength == 0) {
        return 1.0;
      }
      return (
        (longerLength - this.editDistance(longer, shorter)) /
        parseFloat(longerLength)
      );
    },
    editDistance(s1, s2) {
      s1 = s1.toLowerCase();
      s2 = s2.toLowerCase();

      var costs = new Array();
      for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
          if (i == 0) costs[j] = j;
          else {
            if (j > 0) {
              var newValue = costs[j - 1];
              if (s1.charAt(i - 1) != s2.charAt(j - 1))
                newValue =
                  Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
              costs[j - 1] = lastValue;
              lastValue = newValue;
            }
          }
        }
        if (i > 0) costs[s2.length] = lastValue;
      }
      return costs[s2.length];
    },
    async endGame() {
      this.gameWindow = false;
      this.loadWindow = true;
      await fetch("/api/ranking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.nameOfUser,
          points: this.points,
        }),
      }).then((res) => res.json());
      await new Promise((resolve) => setTimeout(resolve, 300)); // wait for the ranking to be updated
      this.loadWindow = false;
      this.endWindow = true;
    },
    async getNewGame() {
      this.sameGame = false;
      if (this.gameIndex > 9) {
        this.endGame();
        return;
      }
      this.blurValue = 20;
      const gameObj = this.games[this.gameIndex];
      (async () => {
        const url = `https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${gameObj.imageID}.jpg`
        this.imageURL = url;
        const img = new Image();
        img.src = url;
        await img.decode();
      })();
      this.namesOfGame = [];
      this.namesOfGame.push(gameObj.name);
      this.handleAltTitles(gameObj);
      this.handleHint(gameObj);
      this.gameIndex++;
      await new Promise((resolve) => setTimeout(resolve, 400)); // giving the user time to see the new game
      this.startTimer();
    },
    async startTimer() {
      let level = 5;
      let blurVal = 19;
      for (let i = 0; i <= 21; i++) {
        if (this.skip || i === 21 || this.correctGuess) {
          this.showHint = false;
          this.$refs.inputGuess.changeBorderColor("grey");
          this.$refs.inputGuess.focus();
          this.skip = false;
          this.correctGuess = false;
          this.level = 5;
          this.handleTimer(0, 20);
          this.getNewGame();
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, this.time / 20));
        this.handleTimer(level, blurVal);
        level += 5;
        blurVal -= 1;
      }
    },
    handleTimer(level, blurVal) {
      this.blurValue = blurVal;
      this.potentialPoints = blurVal;
      this.$refs.timer.updateTimer(level, blurVal);
    },
    giveHint() {
      if (this.showHint) {
        this.showHint = false;
        this.$refs.inputGuess.focus();
        return;
      }
      const name = this.namesOfGame[0];
      this.showHint = true;
      this.$refs.inputGuess.focus();
      if (this.hint === "no hint for this game...") {
        this.$refs.inputGuess.guess = name.slice(0, 5);
      } else {
        this.$refs.inputGuess.guess = name.slice(0, 3);
      }
      // only removes points one time per game
      if (!this.sameGame) {
        this.points -= 2;
        this.sameGame = true;
      }
    },
    handleHint(gameObj) {
      if (gameObj.summary === undefined) {
        this.hint = "no hint for this game...";
        return;
      }
      const split = gameObj.summary.split(".");
      this.hint = split[0];
      const hintLength = 90;
      if (this.hint.length > hintLength) {
        let arr = this.hint.split(" ");
        this.hint = "";
        for (const word of arr) {
          this.hint += word + " ";
          if (this.hint.length > hintLength) {
            this.hint = this.hint.slice(0, this.hint.length - 1);
            this.hint += "...";
            break;
          }
        }
      }
      if (this.hint.toLowerCase().includes(this.namesOfGame[0].toLowerCase())) {
        this.hint = this.hint.replace(this.namesOfGame[0], "this game");
      }
    },
    async handleAltTitles(gameObj) {
      const res = await this.$axios.get("/api/alternative_names", {
        params: { id: gameObj.gameID },
      });
      const data = await res.data;
      data.forEach((obj) => {
        this.namesOfGame.push(obj.name);
      });
    },
    async fetchGames() {
      let games = [];
      let gamesID = [];

      while (games.length < 10) {
        const gameRes = await fetch(`/api/games?category=${this.category}`, {
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((data) => {
            return data;
          });
        gameRes.forEach((game) => {
          if (!gamesID.includes(game.id) && games.length < 10) {
            gamesID.push(game.id);
            games.push(game);
          }
        });
        // api restriction is 4 calls per second
        await new Promise((resolve) => setTimeout(resolve, 260));
      }

      // get covers
      let covers = [];
      while (covers.length < 10) {
        const coverRes = await fetch(`/api/covers?id=${gamesID}`, {
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((data) => {
            return data;
          });
        coverRes.forEach((cover) => {
          if (!covers.includes(cover)) {
            covers.push(cover);
            gamesID.splice(gamesID.indexOf(cover.game), 1);
          }
        });
      }

      // create array of games with all it's data
      for (let i = 0; i < games.length; i++) {
        const coverIndex = covers.findIndex((object) => {
          return object.game === games[i].id;
        });
        const game = {
          name: games[i].name,
          gameID: games[i].id,
          imageID: covers[coverIndex].image_id,
          summary: games[i].summary,
        };
        this.games.push(game);
      }
    },
  },
  mounted() {
    if (sessionStorage.getItem("name") !== null) {
      this.enterNameWindow = false;
      this.menuWindow = true;
    }
  },
};
</script>

<style>
.infoBar {
  padding-top: 1vh;
  padding-bottom: 1vh;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px;
  border-color: grey;
  border-style: solid;
  filter: drop-shadow(1px 2px var(--lightgreen));
}
</style>
