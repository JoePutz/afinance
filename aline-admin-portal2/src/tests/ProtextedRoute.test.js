import ProtectedRoute from '../components/ProtectedRoute';
import {UserSessionContext} from '../utils/UserContext';
import {cleanup, render, screen} from '@testing-library/react';
import {MemoryRouter, Route} from 'react-router-dom';
import Login from '../pages/Login'
import Home from '../pages/Home'

afterEach(cleanup)

describe('Protected Route shou1d use the UserSessionContext and', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    })

    it('redirect the user that is not logged in and does not have a local storage token', () => {
        render(
            <UserSessionContext.Provider value={{
                authorities: '',
                logoutMethod: () => {
                },
                loggedIn: false,
                token: 'Bearer asdf;lkj',
                expired: false,
            }}>
                <MemoryRouter initialEntries={['/']}>
                    <Route path='/login' component={Login}/>
                    <ProtectedRoute path='/' component={Home}/>
                </MemoryRouter>
            </UserSessionContext.Provider>
        )

        expect(screen.getByLabelText('Username')).toBeInTheDocument();

        expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    it('allow for logged in users with the right authority to view homepage', function () {
        render(
            <UserSessionContext.Provider value={{
                authorities: 'administrator',
                logoutMethod: () => {
                },
                loggedIn: true,
                token: 'Bearer asdf;lkj',
                expired: false,
            }}>
                <MemoryRouter initialEntries={['/']}>
                    <ProtectedRoute path='/' component={Home}/>
                </MemoryRouter>
            </UserSessionContext.Provider>
        )

        expect(screen.getByTestId('homepage')).toBeInTheDocument();
    });

})
