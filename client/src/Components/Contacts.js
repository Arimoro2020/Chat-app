import {useState, useEffect} from "react";
import Search from 'components/Search';


function Contacts({handleOnClick}) {

    const [allUsers, setAllUsers] = useState([])
    const [search, SetSearch] = useState('')

    useEffect(() => {
    getAllUsers()
    }, [])

    function getAllUsers() {
    fetch(`/users`)
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
            <ul className="allUsers">
            <img src={contact.avatar} alt={contact.name} />
            <h4>{contact.name}</h4>
            <p>Background: {contact.background}</p>
            <p>Online status: {contact.online_status}</p>
            <button className="Contacts" id={contact.id} contact={contact} onClick={() => handleOnClick(contact)}>
                Add to ChatList as UserConversation</button>
          </ul>
        )
    })   

    return (
        <main className="allUsers">
            <Search 
            search={search}
            handleSearch={handleSearch}
            />
            <h2>Here are a list of possible Contacts:</h2>
            {mappedUsers}
        </main>
    )
}
export default Contacts;