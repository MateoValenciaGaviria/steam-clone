import './Home.css';
import { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import { NavBar, Card } from '../../components/index';
import { useSelector } from "react-redux";

const pb = new PocketBase('http://127.0.0.1:8090');

export const Home = () => {
  const theme = useSelector((state) => state.theme.value);
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

    <div className={`home home--${theme}`}>
      <NavBar />
      <main className={`content conten--${theme}`}>
        {games && games.map(({ id, name, description, price, image }) => {
          const cardProps = {
            id,
            name,
            description,
            price,
            imgUrl: image,
          }
          return <Card key={name} {...cardProps} />;
        })}
      </main>
      <footer className={`footer footer--${theme}`}>&copy; hecho por: Mateo Valencia G.</footer>
    </div>

  );
}

export default Home;
