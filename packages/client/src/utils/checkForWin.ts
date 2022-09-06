import * as TYPES from './types'
import Win from './Win'

export const checkForWin = (
    boardMap: Map<string, string>,
    currentColor: 'white' | 'black',
    e: any
  ) => {
    const state: any = {
      HashMap: boardMap,
      currentColorState: currentColor
    }
    const returnRowLength = (
      total: number,
      rowDirection: TYPES.DIRECTIONCHECK
    ): number => {
      const row = new Win(state, e, rowDirection)
      return row.win + total
    }
    const winByDirection = (
      directionA: TYPES.DIRECTIONCHECK,
      directionB: TYPES.DIRECTIONCHECK
    ): boolean => {
      if (
        Object.values(TYPES.DIRECTIONCHECK)
          .filter(
            (direction: TYPES.DIRECTIONCHECK) =>
              direction === directionA || direction === directionB
          )
          .reduce(returnRowLength, 0) === 6
      ) {
        return true
      }
      return false
    }

    // horizontal win condition
    if (winByDirection(TYPES.DIRECTIONCHECK.EAST, TYPES.DIRECTIONCHECK.WEST))
      return true

    // vertical win condition
    if (winByDirection(TYPES.DIRECTIONCHECK.NORTH, TYPES.DIRECTIONCHECK.SOUTH))
      return true

    // diagonal North East - South West win condition
    if (
      winByDirection(
        TYPES.DIRECTIONCHECK.NORTHEAST,
        TYPES.DIRECTIONCHECK.SOUTHWEST
      )
    )
      return true

    // diagonal North West - South East win condition
    if (
      winByDirection(
        TYPES.DIRECTIONCHECK.NORTHWEST,
        TYPES.DIRECTIONCHECK.SOUTHEAST
      )
    )
      return true

    return false
  }