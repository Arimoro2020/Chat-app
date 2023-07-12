


function Home({appUser, messages}) {
    
	

	
    
    const newMessages = messages.filter(message=> (message.user_id) ===6)
        // .sort((a, b) => a.created_at.localeCompare(b.created_at))
	.map((item,i) => <li key={i}>{item.content_data}</li>)


 
  
        
	return (
		<div>
			<section>
				<h2>Welcome,to your Chat App</h2>
			</section>
            <section>
			<ul>
				
			{newMessages}
     
			
            
			</ul>
            </section>
		</div>
	);
}

export default Home;