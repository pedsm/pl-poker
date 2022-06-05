export interface IDeck {
    name: string
    cards: string[] | number[]
}

export const DECK_LIST: IDeck[] = [
    {
        name: 'Fibonacci',
        cards: [1, 2, 3, 5, 8, 13, 21, 52],
    },
    {
        name: 'T-Shirt',
        cards: ['XS', 'S', 'M', 'L', 'XL'],
    },
    {
        name: 'Classic',
        cards: [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100]
    },
]