import React, { useContext, useState } from "react";

const UserContext = React.createContext([]);

const useUser = () => {
    return useContext(UserContext);
}

const UserProvider = ({ defaultValue = {}, children }) => { 

    const [user, setUser] = useState( JSON.parse(localStorage.getItem('user')) || defaultValue );

    const updateLocalStorage = (newState) => {
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(newState));
    }

    const isLogged = () => {
        return user != {};
    }

    const context = {
        user, 
        isLogged
    };

    return (
        <UserContext.Provider value={ context }>
            { children }
        </UserContext.Provider>
    );
}

export { useUser, UserProvider };