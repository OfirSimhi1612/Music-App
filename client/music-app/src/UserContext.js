import React, { useContext, useState } from 'react'

const UserDetailsContext = React.createContext()
const UpdateUserContext = React.createContext()
const BottomPlayerContext = React.createContext()
const UpdateBottomPlayerContext = React.createContext()

export function useUserDetails() {

    return useContext(UserDetailsContext)
}

export function useBottomPlayer() {

    return useContext(BottomPlayerContext)
}

export function useUpdateBottomPlayer() {

    return useContext(UpdateBottomPlayerContext)
}

export function useUpdateUser() {

    return useContext(UpdateUserContext)
}

function UserProvider({ children }) {

    const [UserDetails, setUserDetails] = useState({})
    const [BottomPlayer, setBottomPlayer] = useState({})

    function updateUserDetails(newUser) {
        setUserDetails(newUser)
    }

    function updateBottomPlayer() {
        setBottomPlayer(!BottomPlayer)
    }

    return (
        <UserDetailsContext.Provider value={UserDetails}>
            <UpdateUserContext.Provider value={updateUserDetails}>
                <BottomPlayerContext.Provider value={BottomPlayer}>
                    <UpdateBottomPlayerContext.Provider value={updateBottomPlayer}>
                        {children}
                    </UpdateBottomPlayerContext.Provider>
                </BottomPlayerContext.Provider>
            </UpdateUserContext.Provider>
        </UserDetailsContext.Provider>
    );
}

export default UserProvider;