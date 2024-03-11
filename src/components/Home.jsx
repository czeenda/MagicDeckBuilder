import {useAuth} from './../context/AuthProvider'
import { useState, useEffect, useContext } from 'react';

import {MyContext} from './../context/MyContext'



import {supabase} from './../supabase/client'



const Home = () => {
	const {auth, user, logout} = useAuth()

	const [ decks, setDecks] = useState([])

	const [ newDeckName, setNewDeckName] = useState("")

	const { deckID, setDeckID} = useContext(MyContext)


	useEffect(() => {
		const loadData = async () => {
			try {
				const {data, error} = await supabase
					.from('Decks')
					.select('*')
					.eq('user_id', user.id)
					

					console.log("ok")

					if (error) {
					console.log(error)
				} else {
					console.log("funguje")
					setDecks(data)
					console.log(data)

				}
			}
			catch (error) {
				console.log(error)
			}
		}

		loadData();
	}, [deckID])

	const handleAddDeck = async () => {
		try {
			const {data, error} = await supabase
				.from('Decks')
				.insert({
					name: newDeckName,
				  })

				console.log("ok")

				if (error) {
				console.log(error)
			} else {
				console.log("posláno")
				setDecks(data)
				setDeckID(newDeckName)
				console.log(data)

			}
		}
		catch (error) {
			console.log(error)
		}
		
		  
	  }

	return (
		<>
			<h2>Balíčky</h2>
			{user.id}
			<p>Zde budou vidět balíčky přihlášeného uživatle.</p>

			<div>
				<button onClick={()=>{ logout()  }}>Odhlasit se</button>
			</div>

			<div>
				
					<input type="text" value={newDeckName} onChange={(e) => setNewDeckName(e.target.value)}/>
					<button onClick={handleAddDeck}>Přidat</button>
				
			</div> 

			

			{decks === false ? <p>Načítání dat...</p> : <div>{decks.map(element => <div key={element.id} onClick={() => setDeckID(element.name)}>
				{element.name}
			</div>)}</div>}

		</>
	);
}

export default Home;