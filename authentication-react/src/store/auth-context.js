import React, {useCallback, useEffect, useState} from "react";

let logoutTimer;

export const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
});

const calculateRemainingTime = (expirationTime) => {
    const nowTime = new Date().getTime();
    const expiredTime = new Date(expirationTime).getTime();
    return expiredTime - nowTime;
}

const getStoredTokenAndTime = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationTime = localStorage.getItem('expirationTime');

    const remainingTime = calculateRemainingTime(storedExpirationTime);

    if(remainingTime <= 3600000) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null;
    }

    return {
        token: storedToken,
        expirationTime: remainingTime
    }
}

const AuthContextProvider = (props) => {

    const storedData = getStoredTokenAndTime();
    let initToken;
    if(storedData) {
        initToken = storedData.token;
    }

    const [token, setToken] = useState(initToken);

    const isLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime')

        if(logoutTimer) {
            clearTimeout(logoutTimer)
        }
    },[]);

    const loginHandler = (token, expirationTime) => {
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime);

        const remainingTime = calculateRemainingTime(expirationTime);

        logoutTimer = setTimeout(logoutHandler, remainingTime);
    }

    useEffect(() => {
        if(storedData) {
            logoutTimer = setTimeout(logoutHandler, storedData.expirationTime);
        }
    }, [storedData, logoutHandler])

    const val = {
        token, isLoggedIn, login: loginHandler, logout: logoutHandler
    }

    return (
        <AuthContext.Provider value={val}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;