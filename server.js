const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// Beispiel URL - Amazon Produkt
const url =
  "https://www.amazon.de/ASUS-Grafikkarte-Speicher-DisplayPort-DUAL-RTX3060-O12G-V2/dp/B096658ZWP/";

axios(url)
  .then((response) => {
    // Konvertiert das HTML Gerüst der Amazon Website
    // in ein Objekt Model samt Funktionen um.
    // JQuery ähnliche Funktionen können verwendet werden
    const $ = cheerio.load(response.data);

    // Daten aus dem DOM selektieren/holen
    let title = $("#productTitle").text().replace(/\s\s+/g, "");
    let inStock = $("#availability").text().replace(/\s\s+/g, "");
    let price = $("#corePrice_feature_div").find(".a-offscreen").text();

    // Neues Datum um Zeitpunkt festzuhalten
    let date = new Date();
    let today = date.toLocaleDateString("de-DE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    // Daten entsprechend formatieren um in Datei zu speichern
    let product = `${today} | ${title} | ${inStock} | ${price} \n`;

    // Daten in Datei ablegen
    // Legt Datei an wenn es diese noch nicht gibt
    // Fügt bei bestehender Datei und Daten neue Daten hinzu
    fs.appendFile("grafikkarte.txt", product, function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
  })
  .catch((err) => {
    console.log(err);
  });
