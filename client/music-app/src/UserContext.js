import React, { useContext, useState } from 'react'

const UserDetailsContext = React.createContext()
const UpdateUserContext = React.createContext()

export function useUserDetails() {

    return useContext(UserDetailsContext)
}

export function useUpdateUser() {

    return useContext(UpdateUserContext)
}

function UserProvider({ children }) {

    const [UserDetails, setUserDetails] = useState({})

    function updateUserDetails(newUser) {

        setUserDetails(newUser)
    }

    return (
        <UserDetailsContext.Provider value={UserDetails}>
            <UpdateUserContext.Provider value={updateUserDetails}>
                {children}
            </UpdateUserContext.Provider>
        </UserDetailsContext.Provider>
    );
}

export default UserProvider;