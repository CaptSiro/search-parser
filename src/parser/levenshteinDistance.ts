// https://www.30secondsofcode.org/js/s/levenshtein-distance/
export function levenshteinDistance(s: string, t: string): number {
    if (s.length === 0) {
        return t.length
    }

    if (t.length === 0) {
        return s.length
    }

    const array = [];

    for (let i = 0; i <= t.length; i++) {
        array[i] = [i];

        for (let j = 1; j <= s.length; j++) {
            if (i === 0) {
                array[i][j] = j;
                continue;
            }


            array[i][j] = Math.min(
                array[i - 1][j] + 1,
                array[i][j - 1] + 1,
                array[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
        }
    }

    return array[t.length][s.length];
}



export function findClosestString(string: string, options: string[]): -1 | number {
    if (options.length === 0) {
        return -1;
    }

    let min = Number.MAX_SAFE_INTEGER;
    let index = -1;

    for (let i = 0; i < options.length; i++) {
        const distance = levenshteinDistance(string, options[i]);

        if (distance > min) {
            continue;
        }

        min = distance;
        index = i;
    }

    return index;
}