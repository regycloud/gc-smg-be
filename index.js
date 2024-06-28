const express = require("express");
const { google } = require("googleapis");
require('dotenv').config();

const app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get("/req", async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: './cr.json',
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({version: "v4", auth: client});

    const spreadSheetId = "1GQtdjXpqIvGWwBh-8cIrqLIM9S_iPYRHkkAX1jUekWs";

    const metaData = await googleSheets.spreadsheets.get({
        auth: auth,
        spreadsheetId: spreadSheetId

    })

    // Limbah B3 Pelumas Bekas
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: spreadSheetId,
        range: "Sheet1!A1:H11"
    })

    // Limbah B3 non Pelumas Bekas
    const getRows2 = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: spreadSheetId,
        range: "Sheet1!A14:H21"
    })

    // Pelumas Bekas
    const getRows3 = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: spreadSheetId,
        range: "Sheet1!K1:M12"
    })

    const getRows4 = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: spreadSheetId,
        range: "Sheet1!k14:m22"
    })

    const getRunningText = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: spreadSheetId,
        range: "Sheet1!O2"
    })

    res.send([getRows.data.values, getRows2.data.values, getRows3.data.values, getRows4.data.values, getRunningText.data.values]);
})

app.listen(1337, (req, res) => console.log("running on 1337"));
