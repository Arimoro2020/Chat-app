import {useState, useEffect} from "react";
import Search from './Search';
import { ReactComponent as InviteSvg } from '/Users/yemiarimoro/Development/code/My-App/Chat-app/client/src/inviteToChat.svg';


function Contacts({handleOnClick}) {

    const [allUsers, setAllUsers] = useState([])
    const [search, SetSearch] = useState('')

    useEffect(() => {
    getAllUsers()
    }, [])

    function getAllUsers() {
    fetch(`http://localhost:5555/users`)
    .then(resp => resp.json())
    .then(data => setAllUsers(data))
    }

  

  
    function handleSearch(e) {
    SetSearch(e.target.value)
    }
   
  


    const filteredUsers = [...allUsers].filter((el) => {
    return el.name.toLowerCase().includes(search.toLowerCase()
    )})

    const mappedUsers = filteredUsers.map((contact) => {
        return (
            <ul className="allUsers" key={contact.id}  >
            <img src={contact.avatar} alt={contact.name} width={320} />
            <h4>{contact.name}</h4>
            <p>Background: {contact.background}</p>
            <em>Online status: {contact.online_status}</em>
            <span role="img"><InviteSvg className="Contacts" id={contact.id} contact={contact} onClick={() => handleOnClick(contact)} width={"35px"}/></span>
              
          </ul>
        )
    })   

    return (
        <main >
            <Search 
           
            />
            <h2 style={{display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',}}>Here are a list of possible contacts:</h2>
        <div style={{display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',     flexDirection: 'row',  flexWrap: 'wrap',}}> 
            {mappedUsers}
            </div>
       
        </main>
    )
}
export default Contacts;