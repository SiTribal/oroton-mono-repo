import { render, screen, renderHook, fireEvent } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import StartButton from '.'

const mockUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate
}))



describe('Start Button', () => {
    it('start button disabled on initial load', () => {
        render(<StartButton loggedIn={false}/>)
        const startButton = screen.getByText('Start')
        expect(startButton).toBeInTheDocument()
        expect(startButton).toBeDisabled()
    })

    it('start button should be enabled if user is logged in', () => {
        render(<StartButton loggedIn={true}/>)
        const startButton = screen.getByText('Start')
        expect(startButton).toBeInTheDocument()
        expect(startButton).toBeEnabled()
    })

})