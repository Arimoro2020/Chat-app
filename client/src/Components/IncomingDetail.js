


function IncomingDetail({fresh, handleNewMessageOnClick}) {


			return(	<>
						<li>
						<h4>{fresh.created_at}</h4>
						<p>{fresh.content_data}</p>
						<button className="Contacts" onClick={() => handleNewMessageOnClick(fresh)}>
							Go to ChatRoom</button>
						</li>
						</>

				
				);


			}			

export default IncomingDetail;