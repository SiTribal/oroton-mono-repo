import {render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Form from '.'


const user = {
    username: 'admin',
    password: 'admin'
}

const formHandler = jest.fn()
const setLoggedInCB = jest.fn()
const mockUseNavigate = jest.fn()


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate
}))

const mockUseContext = jest.fn()
React.useContext = mockUseContext
const mockUpdateState = jest.fn()
React.useState.toString = mockUpdateState
const mockSaveUser = jest.fn()
jest.mock('../../hooks', () => ({
  useLocalStorage: () => [[], mockSaveUser],
}))


describe('Form Component', () => {
    

    it('check if form is in the document', () => {
        render(<Form register={false}/>)
        const button = screen.getByText('Login')
        const inputElUsername = screen.getByTestId("username");
        const inputElPassword = screen.getByTestId("password");
        expect(inputElUsername).toBeInTheDocument()
        expect(inputElPassword).toBeInTheDocument()
        expect(button).toBeEnabled()
        fireEvent.click(button)
    })
    it('check if the form validation works', () => {
        render(<Form register={false} />)
        const button = screen.getByText('Login')
        const inputElUsername = screen.getByTestId("username");
        const inputElPassword = screen.getByTestId("password");
        userEvent.type(inputElPassword, "admin")
        userEvent.type(inputElUsername, "admin")
        // fireEvent.click(button)
    })
})

