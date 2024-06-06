import React, {createContext, useContext, useEffect, useState} from 'react';
import jwt_decode from 'jwt-decode';
import PropTypes from 'prop-types';

/**
 * Context for User Session to be used throughout the application
 * @type {React.Context<{logoutMethod: logoutMethod, expired: boolean, loggedIn: boolean, authorities: {}, token: string}>}
 */
export const UserSessionContext = createContext({
    authorities: {},
    logoutMethod: () => {
    },
    loggedIn: false,
    token: '',
    expired: true,
    user: ''
})

/** Context to hold method to update UserContext*/
export const UpdateUserSessionContext = createContext({
    updateUser: () => {
    }
})

const userTokenInitialState = {
    jwt: '',
    authority: {},
    loggedIn: false,
    expired: true,
    user: ''
}

/** Custom Hook to retrieve user details */
export function UseUserSession() {
    const {authority, logoutMethod, loggedIn, token, expired, user} = useContext(UserSessionContext);
    return {authority, logoutMethod, loggedIn, token, expired, user}
}

/** Custom Hook to access function that updates the user context from stored token */
export function UpdateUserSession() {
    const {updateUser} = useContext(UpdateUserSessionContext);
    return {updateUser}
}

/**
 * Provider that holds User details and authority to access and use the site. <br/>
 * Inside nested is the UpdateUserContextProvider that can be used to access the
 * updateUser method to update UserContext.
 *
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export default function UserSessionProvider({children}) {
    const STORAGE_NAME = process.env.REACT_APP_TOKEN_NAME;
    const [token, setToken] = useState(userTokenInitialState);

    const fetchTokenFromStorage = () => {
        if (STORAGE_NAME in localStorage) {
            let fullToken = localStorage.getItem(STORAGE_NAME);
            try {
                const decodedJWT = jwt_decode(fullToken.replace('Bearer ', ''));
                let isExpired = (Date.now() >= decodedJWT.exp * 1000);
                if(isExpired) localStorage.removeItem(STORAGE_NAME)
                let isLoggedIn = !isExpired && fullToken.includes('Bearer ') && decodedJWT.authority==='administrator';

                setToken({
                    jwt: fullToken,
                    authority: decodedJWT.authority,
                    expired: isExpired,
                    loggedIn: isLoggedIn,
                    user: decodedJWT.sub
                })
            } catch (e) {
                setToken({...userTokenInitialState, checkedStorage: true});
            }
        }
    }

    useEffect(() => {
        fetchTokenFromStorage()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const logout = () => {
        if (STORAGE_NAME in localStorage) localStorage.removeItem(STORAGE_NAME);
        setToken(userTokenInitialState);
    }

    return (
        <UserSessionContext.Provider
            value={{
                authorities: token.authority,
                logoutMethod: logout,
                loggedIn: token.loggedIn,
                token: token.jwt,
                expired: token.expired,
                user: token.user
            }}
        >
            <UpdateUserSessionContext.Provider
                value={{updateUser: fetchTokenFromStorage}}
            >
                {children}
            </UpdateUserSessionContext.Provider>
        </UserSessionContext.Provider>
    )

}

UserSessionProvider.propTypes = {
    children: PropTypes.element
}
