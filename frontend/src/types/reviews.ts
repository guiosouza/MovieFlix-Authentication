export type Review = {
    id: number,
    text: string,
    movieId: number,
    user: {
        id: number,
        name: string,
        email: string
    }
}