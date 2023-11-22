import './App.css';
import { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import { Button, Card } from './components/index';
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from './redux/reducers/themeSlice';

const pb = new PocketBase('http://127.0.0.1:8090');

function App() {
  const theme = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();
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

  const themeHandler = () => {
    dispatch(changeTheme(theme === 'LIGHT' ? 'DARK' : 'LIGHT'));
  }

  useEffect(() => {
    getRecords();
  }, []);

  return (

    <div className={`app app--${theme}`}>
      <h1 className={`title title--${theme}`}>Steam Clone</h1>
      <nav className={`nav-bar nav-bar--${theme}`}><Button type='text' onClick={themeHandler}>Cambiar Tema</Button></nav>
      <main className={`content conten--${theme}`}>
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
      <footer className={`footer footer--${theme}`}>&copy; hecho por: Mateo Valencia G.</footer>
    </div>

  );
}

export default App;
