import { NavLink, useNavigate } from "react-router-dom";

function Navigation({ updateUser, user }) {
	const navigate = useNavigate();

	function handleLogout() {
		fetch("http://localhost:5555/logout",{
		method: "DELETE",
		headers: {
			"content-type": "application/json",
		},}).then((res) => {
			if (res.ok){
				updateUser(null);
				navigate("/login");
			}
		});
	}

	return (
		<header>
			<div className="menu">
				<NavLink className="button" to="/home" end>
					Home
				</NavLink>
				<NavLink className="button" to="/chat_list" >
					Chat List
				</NavLink>
				<NavLink className="button" to="/chat_room" >
					Chat Room
				</NavLink>
				<NavLink className="button" to="/contacts">
					Contacts
				</NavLink>
                <NavLink className="button" to="/user_profile" >
					UserProfile
				</NavLink>
				<NavLink className="button" to="/signup" >
					Sign Up
				</NavLink>
				<NavLink className="button" to="/login" >
					Log In
				</NavLink>
				<NavLink className="button" to="/logout" >
					Log out
				</NavLink>
				{ user ? 
					(<>
						<button onClick={handleLogout} className="button">
							Log Out
						</button>
					</>) : 
					''
				}		
			</div>
		</header>
	);
}

export default Navigation;