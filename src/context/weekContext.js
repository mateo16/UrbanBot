
import React, { useContext, useState, useEffect } from "react";

export const WeekContext = React.createContext();



export const WeekProvider = ({ children }) => {
    const [week, setWeek] = useState([{
        "horarios":[]
      },
      {
        "horarios":[]
      },
      {
        "horarios":[]
      },
      {
        "horarios":[]
      },
      {
        "horarios":[]
      },
      {
        "horarios":[]
      }
      ]);
      const [user, setUser] = useState([]);
    
    return (
        <WeekContext.Provider value={{ week, setWeek ,user,setUser}}>
        {children}
        </WeekContext.Provider>
    );
    };


