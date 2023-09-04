import { useState, useEffect } from "react";

function Clock() {
    const [time, setTime] = useState(new Date());
  
    useEffect(() => {
      const timerID = setInterval(() => {
        setTime(new Date());
      }, 1000);
  
      // returning a cleanup function
      return function cleanup() {
        clearInterval(timerID);
      };
    }, []);
  
    return <h3 style= {{fontSize:'small', display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',}}>{time.toString()}</h3>;
  }

export default Clock;