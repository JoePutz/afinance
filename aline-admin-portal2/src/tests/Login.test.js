import React from 'react';
import {act, cleanup, render, screen} from '@testing-library/react';
import Login from '../pages/Login'
import userEvent from '@testing-library/user-event';
import axiosMock from 'axios';
import renderWithRouter from './utils/RenderWithRouter';

jest.mock('axios')

afterEach(cleanup)

describe('Login page should', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    })

    it('render login form', async () => {
        const {getByTestId} = render(<Login/>)

        getByTestId('username');
        getByTestId('password')
    })

    it('render missing credentials message when submitting without username or password', () => {

        render(<Login/>)

        const submitBtn = screen.getByTestId('loginSubmit')
        userEvent.click(submitBtn)

        const missingLabelDiv = screen.getByTestId('loginError')

        expect(missingLabelDiv).toBeVisible()
        expect(screen.getByText('Please enter credentials.')).toBeInTheDocument()

    })

    it('render invalid credentials message when response status is 403', async () => {
        axiosMock.post.mockResolvedValue(
            {
                status: 403,
                message: 'Invalid Credentials'
            })

        render(<Login/>)

        const usernameInput = screen.getByTestId('username');
        const passwordInput = screen.getByTestId('password');
        userEvent.type(usernameInput, 'admin');
        userEvent.type(passwordInput, 'admin');
        await act(async () => {
            const submitBtn = screen.getByTestId('loginSubmit')
            userEvent.click(submitBtn)
        })
        const ErrorMessageEl = screen.getByTestId('loginError')

        expect(ErrorMessageEl).toBeVisible();
        expect(ErrorMessageEl.textContent).toBe('Invalid Credentials')

    })

    it('render server error message when response status is 500 series', async () => {
        axiosMock.post.mockResolvedValue(
            {
                status: 500,
                message: 'Oops! We\'re checking what the problem is.'
            })

        render(<Login/>)

        const usernameInput = screen.getByTestId('username');
        const passwordInput = screen.getByTestId('password');
        userEvent.type(usernameInput, 'admin');
        userEvent.type(passwordInput, 'password');
        await act(async () => {
            const submitBtn = screen.getByTestId('loginSubmit')
            userEvent.click(submitBtn);
            expect(axiosMock.post).toHaveBeenCalled()
        })

        const ErrorMessageEl = screen.getByTestId('loginError')

        expect(ErrorMessageEl).toBeVisible();
        expect(ErrorMessageEl.textContent).toBe('Oops! We\'re checking what the problem is.')

    })

    it('redirect on successful login with authorization token in header response', async () => {
        axiosMock.post.mockResolvedValue(
            {
                status: 200,
                headers: {
                    Authorization: 'Bearer 123456'
                }
            })

        const {history} = renderWithRouter(<Login/>)

        userEvent.type(screen.getByTestId('username'), 'admin');
        userEvent.type(screen.getByTestId('password'), 'password');
        await act(async () => {
            const submitBtn = screen.getByTestId('loginSubmit')
            userEvent.click(submitBtn)

            expect(axiosMock.post).toHaveBeenCalledWith('/api/login', {
                'username': 'admin',
                'password': 'password'
            });
        })

        expect(history.location.pathname).toEqual('/');
    })

    it('renders error message when an error occurs with axios call', async () => {
        const networkError = new Error('Network not available');
        axiosMock.post.mockRejectedValue(networkError)

        render(<Login/>)

        userEvent.type(screen.getByTestId('username'), 'admin');
        userEvent.type(screen.getByTestId('password'), 'password');
        const submitBtn = screen.getByTestId('loginSubmit')

        await act(async () =>{
            userEvent.click(submitBtn)
        })

        expect(screen.getByText('Oops, there seems to be an error!')).toBeVisible();

    })

})
