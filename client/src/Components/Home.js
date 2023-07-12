
function Home({user, messages}) {

 
	console.log(messages)
    
    const newMessage = messages.filter(message => parseInt(message.user_id) === parseInt(user.id))
        // .sort((a, b) => a.created_at.localeCompare(b.created_at))


 
  
        
	return (
		<div>
			<section>
				<h2>Welcome, {user.name} to your Chat App</h2>
			</section>
            <section>
			<ul>
				
			
            {newMessage.map(el =><li key={el.id}>{el.content_data}</li>)}	
            
			</ul>
            </section>
		</div>
	);
}

export default Home;