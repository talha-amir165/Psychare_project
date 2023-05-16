import React, { createContext, useState } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState({
        name: 'Talha',
        number: '03174126369',
        email: 'talha495@gmail.com'

    });

    return (
        <ProfileContext.Provider value={[profile, setProfile]}>
            {children}
        </ProfileContext.Provider>
    );
};
