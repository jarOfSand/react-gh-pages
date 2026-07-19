const CHALLENGE_RATINGS = [
    '0',
    '1/8',
    '1/4',
    '1/2',
];

export function getCrString(crIndex: number): string {
    if (crIndex < 4) {
        return `${CHALLENGE_RATINGS[crIndex]}`;
    }
    return `${crIndex - 3}`;
}
