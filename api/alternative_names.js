import { fetchFromIGDB } from "./igdb";

module.exports = (req, res) => {
  (async () => {
    let data = await fetchFromIGDB(
      "https://api.igdb.com/v4/alternative_names",
      `fields *; where game = (${req.query.id});`
    );
    res.json(data);
  })();
};
