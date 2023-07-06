export type SearchQueryError = {
    query: string,
    error: {
        message: string,
        start?: number,
        end?: number
    },
}

export type SearchProperty = {
    prop: string,
    symbol: string,
    value: any
}

export type SearchQuery = SearchQueryError | {
    query: string,
    unnamed: string[],
    properties: SearchProperty[],
    delimiter: string
}



export type SearchConfig = {
    tokenDelimiter: string,
    relationSymbols: string[],
    propertyMap: SearchPropertyMap
}

export type SearchPropertyValidation = {
    isValid: false,
    error: {
        message: string,
        valueSuggestion?: string[]
    }
} | {
    isValid: true,
    parsed: any
}

export type SearchPropertyValidator = (value: string, symbol: string) => SearchPropertyValidation

export type SearchPropertyMap = {
    [key: string]: SearchPropertyValidator
}