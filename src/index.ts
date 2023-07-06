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

// console.log(parser.parse("what"));
// console.log(parser.parse("foo=pog"));
// console.log(parser.parse("bar=-.8"));
// console.log(parser.parse("what foo=pog bar>=-.0"));
// console.log(parser.parse("what foo=pog bar=nice bar=.0"));
// console.log(parser.parse("what foo>pog bar=.0"));
// console.log(parser.parse("what pog>pog bar=.0"));
// console.log(parser.parse("what mode>pog bar=.0"));
// console.log(parser.parse("what mode=taiko,osu bar=.0"));
// console.log(parser.parse("what mode=taiko,osui bar=.0"));
// console.log(parser.parse("what mode=taiko,osu,mania,catch,asdf bar=.0"));

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