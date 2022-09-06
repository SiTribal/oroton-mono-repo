import { object, string, number, array, TypeOf } from 'zod'

const startGamePayload = {
    body: object({
        userId: string({
            required_error: 'User ID is required'
        }),
    })
}


const updateGamePayload = {
    gameId: string({
        required_error: 'Game ID is required'
    }),
    moveLocation: string({
        required_error: 'move location is required'
    }),
    moveColor: string({
        required_error: 'move location is required'
    })
}

export const createInitialGamePayload = object({
    ...startGamePayload
})