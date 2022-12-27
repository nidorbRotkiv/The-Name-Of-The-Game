import { fetchFromIGDB } from "./igdb";

function getIDS(minValue, maxValue, amount) {
  let arr = [];
  while (arr.length < amount) {
    const num = Math.floor(Math.random() * maxValue) + minValue;
    if (!arr.includes(num)) {
      arr.push(num);
    }
  }
  return arr;
}

module.exports = (req, res) => {
  async function sendData() {
    let category = req.query.category;
    // category is a decade
    if (!isNaN(category)) {
      category = category.toString();
      let from = 0;
      let to = 0;
      // giving every decade a unix timestamp
      switch (category) {
        case "80":
          from = 315532800;
          to = 631065599;
          break;
        case "90":
          from = 631152000;
          to = 946598399;
          break;
        case "00":
          from = 946684800;
          to = 1262217599;
          break;
        case "10":
          from = 1262304000;
          to = 1577836800;
          break;
        default:
          res.end();
      }
      let data = await fetchFromIGDB(
        "https://api.igdb.com/v4/games",
        `fields *; where parent_game = null & first_release_date > ${from} & first_release_date < ${to} & 
        id = (${getIDS(1,10000,100)});`);
      res.json(data);
    } else {
      // no category filter
      let data = await fetchFromIGDB(
        "https://api.igdb.com/v4/games",
        `fields *; where parent_game = null & id = (${getIDS(1, 2000, 20)});`
      );
      res.json(data);
    }
  }
  sendData();
};