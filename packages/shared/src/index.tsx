export type Game  = {
    _id?: string
    username: string
    moves?: Map<string, string>
    boardSize: number
    status?: 'win' | 'draw'
}