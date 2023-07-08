import { SearchParser } from "./parser/SearchParser";
import {
    defaultRelationSymbols,
    NumberSearchProperty,
    SetSearchProperty,
    TextSearchProperty
} from "./parser/validators";
import express from 'express';
import * as path from "path";
const app = express();



const parser = new SearchParser({
    tokenDelimiter: " ",
    propertyMap: {
        artist: TextSearchProperty(),
        bpm: NumberSearchProperty(),
        tags: SetSearchProperty(["rock", "metal"], false),
        mode: SetSearchProperty(["osu", "taiko", "mania", "catch"])
    },
    relationSymbols: defaultRelationSymbols
});



app.use("/public", express.static(path.join(__dirname, "/../public")));
app.get("/", (req, res) => {
    res.redirect("/public/index.html");
});

app.get("/parse", (req, res) => {
    res.send(JSON.stringify(parser.parse(decodeURIComponent(String(req.query.q)))))
});

app.listen(7272, () => {
    console.log("listening on http://localhost:7272/");
});