import { SearchPropertyValidation, SearchConfig, SearchProperty } from "./@types";



type ComparisonExtractionTrue = {
    isPresent: true,
    start: number,
    symbol: string
};

type ComparisonExtractionFalse = {
    isPresent: false,
};

type ComparisonExtraction = ComparisonExtractionFalse | ComparisonExtractionTrue



export class SearchParser {
    private config: SearchConfig;

    constructor(config: SearchConfig) {
        this.config = config;
        this.config.relationSymbols = [...this.config.relationSymbols];
        this.config.relationSymbols.sort((a, b) => b.length - a.length);
    }

    parse(query: string) {
        const tokens = query.trim().split(this.config.tokenDelimiter);
        const unnamed: string[] = [];
        const properties: SearchProperty[] = [];

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i].trim();

            if (token === "") {
                continue;
            }

            const extracted = this.extractComparison(token);

            if (!extracted.isPresent) {
                unnamed.push(token);
                continue;
            }

            const [prop, value] = this.split(token, extracted);
            const validation = this.validateProperty(prop, value, extracted.symbol);

            if (!validation.isValid) {
                const slice = tokens.slice(0, i);
                const index = slice.join(this.config.tokenDelimiter);
                const start = slice.length !== 0
                    ? index.length + this.config.tokenDelimiter.length
                    : index.length

                return {
                    query,
                    error: {
                        message: validation.error.message,
                        start,
                        end: start + token.length
                    }
                }
            }

            properties.push({
                prop,
                symbol: extracted.symbol,
                value: validation.parsed
            });
        }

        return {
            query,
            unnamed,
            properties,
            delimiter: this.config.tokenDelimiter
        };
    }

    private extractComparison(token: string): ComparisonExtraction {
        for (let i = 0; i < this.config.relationSymbols.length; i++) {
            const index = token.indexOf(this.config.relationSymbols[i]);

            if (index === -1) {
                continue;
            }

            return {
                isPresent: true,
                start: index,
                symbol: this.config.relationSymbols[i]
            }
        }

        return {
            isPresent: false
        };
    }

    private split(token: string, extraction: ComparisonExtractionTrue): [string, string] {
        return [
            token.substring(0, extraction.start),
            token.substring(extraction.start + extraction.symbol.length)
        ];
    }

    private validateProperty(property: string, value: string, comparison: string): SearchPropertyValidation {
        if (this.config.propertyMap[property] === undefined) {
            return {
                isValid: false,
                error: {
                    message: `'${property}' is not supported`
                }
            };
        }

        return this.config.propertyMap[property](value, comparison);
    }
}