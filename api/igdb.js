import fetch from "node-fetch";

const IGDBclientId = process.env.IGDB_CLIENT_ID; // your client id goes here
const IGDBauthorization = process.env.IGDB_AUTHORIZATION; // your authorization goes here

export async function fetchFromIGDB(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": IGDBclientId,
      Authorization: "Bearer " + IGDBauthorization,
    },
    body: data,
  });
   return await response.json();
}
