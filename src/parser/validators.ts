import { SearchPropertyValidation, SearchPropertyValidator } from "./@types";



export const equalsSymbols = ["=", "==", "!="];
export const greaterThanSymbols = [">", ">="];
export const lessThanSymbols = ["<", "<="];

export const defaultRelationSymbols = [...equalsSymbols, ...greaterThanSymbols, ...lessThanSymbols];



export function textProperty(): SearchPropertyValidator {
    return (value: string, symbol: string): SearchPropertyValidation => {
        if (!(symbol === "=" || symbol === "!=" || symbol === "==")) {
            return {
                isValid: false,
                error: {
                    message: "Text can only use =, ==, != comparison symbols."
                }
            };
        }

        return {
            isValid: true,
            parsed: value
        };
    }
}



export function numberProperty(includeFloats: boolean = true): SearchPropertyValidator {
    const integerRegex = /^[0-9]+$/;

    return (value, symbol): SearchPropertyValidation => {
        if (!defaultRelationSymbols.includes(symbol)) {
            return {
                isValid: false,
                error: {
                    message: `Numbers can only use ${defaultRelationSymbols.join(", ")} comparison symbols.`
                }
            };
        }

        if (includeFloats) {
            const parsed = Number(value);
            if (isNaN(parsed)) {
                return {
                    isValid: false,
                    error: {
                        message: `'${value}' is not valid number value.`
                    }
                };
            }

            return {
                isValid: true,
                parsed
            }
        }

        if (!integerRegex.test(value)) {
            return {
                isValid: false,
                error: {
                    message: `'${value}' is not valid integer value.`
                }
            };
        }

        return {
            isValid: true,
            parsed: Number(value)
        }
    }
}