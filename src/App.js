import { useEffect, useState } from 'react';
import './App.css';
import PocketBase from 'pocketbase';
import { Button, Card } from './components/index';

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
    <div className='app'>
      <h1 className='title'>Steam Clone</h1>
      <nav className='nav-bar'><Button type='text'>Home</Button></nav>
      <main className='content'>
        {games && games.map(({ name, description, price, image }) => {
          const cardProps = {
            name,
            description,
            price,
            imgUrl: image,
          }
          return <Card key={name} {...cardProps} />;
        })}
      </main>
      <footer className="footer">&copy; hecho por: Mateo Valencia G.</footer>
    </div>
  );
}

export default App;
