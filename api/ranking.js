import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function getRanking() {
  const { data, error } = await supabase.from("ranking").select();
  return data;
}

async function insert(nameOfPlayer, score) {
  const { error } = await supabase
    .from("ranking")
    .insert({ name: nameOfPlayer, points: score });
}

async function update(idOfPlayer, score) {
  const { error } = await supabase
    .from("ranking")
    .update({ points: score })
    .eq("id", idOfPlayer);
}

async function deletePlayer(idOfPlayer) {
  const { error } = await supabase.from("ranking").delete().eq("id", idOfPlayer);
}

function getLeastPoints(arr) {
  let smallest = arr[0].points;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].points < smallest) {
      smallest = arr[i].points;
    }
  }
  return smallest;
}

module.exports = (req, res) => {
  async function handle() {
    const entries = await getRanking();
    if (req.method === "POST") {
      for (let i = 0; i < entries.length; i++) {
        if (entries[i].name === req.body.name) {
          if (req.body.points > entries[i].points) {
            update(entries[i].id, req.body.points);
            res.json({ action: "updated" });
            return;
          } else {
            res.json({ action: "none" });
            return;
          }
        }
      }
      if (entries.length < 10) {
        insert(req.body.name, req.body.points);
        res.json({ action: "added" });
        return;
      } else if (req.body.points > getLeastPoints(entries)) {
        let smallest = getLeastPoints(entries);
        for (let i = 0; i < entries.length; i++) {
          if (entries[i].points === smallest) {
            deletePlayer(entries[i].id);
            insert(req.body.name, req.body.points);
            res.json({ action: "added and deleted" });
            return;
          }
        }
      } else {
        res.json({ action: "none" });
      }
    } else if (req.method === "GET") {
      res.json(entries);
    } else {
      res.json({ action: "method is not valid" });
    }
  }
  handle();
};
