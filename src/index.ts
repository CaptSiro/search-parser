import { SearchParser } from "./parser/SearchParser";
import {
    defaultRelationSymbols,
    NumberSearchProperty,
    SetSearchProperty,
    TextSearchProperty
} from "./parser/validators";

const parser = new SearchParser({
    tokenDelimiter: " ",
    propertyMap: {
        foo: TextSearchProperty(),
        bar: NumberSearchProperty(),
        mode: SetSearchProperty(["osu", "taiko", "mania", "catch"])
    },
    relationSymbols: defaultRelationSymbols
});

console.log(parser.parse("what"));
console.log(parser.parse("foo=pog"));
console.log(parser.parse("bar=-.8"));
console.log(parser.parse("what foo=pog bar>=-.0"));
console.log(parser.parse("what foo=pog bar=nice bar=.0"));
console.log(parser.parse("what foo>pog bar=.0"));
console.log(parser.parse("what pog>pog bar=.0"));
console.log(parser.parse("what mode>pog bar=.0"));
console.log(parser.parse("what mode=taiko,osu bar=.0"));
console.log(parser.parse("what mode=taiko,osui bar=.0"));
console.log(parser.parse("what mode=taiko,osu,mania,catch,asdf bar=.0"));