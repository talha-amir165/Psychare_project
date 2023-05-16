import React, { createContext, useState } from 'react';

export const DateContext = createContext();

export const DateProvider = ({ children }) => {
    const [SelectedDate, setSelectedDate] = useState(null);

    return (
        <DateContext.Provider value={[SelectedDate, setSelectedDate]}>
            {children}
        </DateContext.Provider>
    );
};
