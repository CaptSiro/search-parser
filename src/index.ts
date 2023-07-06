import { SearchParser } from "./parser/SearchParser";
import { defaultRelationSymbols, numberProperty, textProperty } from "./parser/validators";

const parser = new SearchParser({
    tokenDelimiter: " ",
    propertyMap: {
        foo: textProperty(),
        bar: numberProperty()
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
