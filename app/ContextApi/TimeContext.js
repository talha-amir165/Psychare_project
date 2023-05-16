import React, { createContext, useState } from 'react';

export const TimeContext = createContext();

export const TimeProvider = ({ children }) => {
    const [SelectedSlot, setSelectedSlot] = useState(null);

    return (
        <TimeContext.Provider value={[SelectedSlot, setSelectedSlot]}>
            {children}
        </TimeContext.Provider>
    );
};
