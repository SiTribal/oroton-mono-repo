export type GameSetupType = {
    boardSize: number | undefined,
    setBoardSizeCB: (length: number) => void
    gameId?: string
    setGameIdCB?: (id:string) => void
}