import {renderHook, act} from '@testing-library/react'
import useLocalStorage from './useLocalStorage'

const key = 'stored-value'
const initialState = {"user":{"username":"123","password":"123"}}

describe('use Local Storage Hook', () => {
    const {result} = renderHook(() => useLocalStorage(key, initialState))
    const [storedValue] = result.current
    expect(storedValue).toEqual(initialState)
})

it('should return a setValue function that can store the value as serialised json in local storage', () => {
    const {result} = renderHook(() => useLocalStorage(key, initialState))
    const [_, setValue] = result.current
    const newValue = {"user":{"username":"1234","password":"1234"}}
    act(() => {
        setValue(newValue)
    })
    const [storedValue] = result.current
    expect(storedValue).toEqual(newValue)
    expect(localStorage.getItem(key)).toEqual(JSON.stringify(newValue))
})