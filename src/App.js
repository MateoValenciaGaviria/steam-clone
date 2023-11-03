import { useEffect, useState } from 'react';
import './App.css';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

function App() {
  const [games, setGames] = useState();
  const getRecords = async () => {
    try {
      const records = await pb.collection("games").getFullList({ requestKey: null });
      setGames(records);
    } catch (error) {
      console.log(error);
      console.log(error.isAbort);
    }
  };

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <div className="App">
      <header>Steam Clone</header>
      <main>
        {games && games.map((game) => <div key={game.id}>{game.name}</div>)}
      </main>
      <footer class="footer">&copy; hecho por: Mateo Valencia G.</footer>
    </div>
  );
}

export default App;
