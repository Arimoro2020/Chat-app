import {useState, useEffect} from "react";
import "./../index.css";

function DarkMode(){    

    const [isDarkMode, setIsDarkMode] = useState('true')
     
    const toggleDarkMode = () => {
     setIsDarkMode(!isDarkMode)
    } 

    useEffect(() =>{
       isDarkMode? document.body.className = 'dark': document.body.className = 'light'
    }, [isDarkMode]);


    return (
        <div className={isDarkMode? 'dark': 'light'} style={{display: 'flex', justifyContent: 'right'}}>
            <button className="mode" onClick={toggleDarkMode} style={{background: "#87CEEB", color:"white"}}>
                {isDarkMode? 'Light' : 'Dark'}
            </button>
        </div>

    )
    
}

export default DarkMode;