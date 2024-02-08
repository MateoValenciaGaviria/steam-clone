import './Home.css';
import { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import { Button, Card } from '../../components/index';
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from '../../redux/reducers/themeSlice';
import { useNavigate } from 'react-router-dom';

const pb = new PocketBase('http://127.0.0.1:8090');

export const Home = () => {
  const theme = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();
  const [games, setGames] = useState();
  const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('user')));
  const navigate = useNavigate()
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

  const clearUser = () => {
    localStorage.clear()
    setLocalUser();
  }

  useEffect(() => {
    getRecords();
    setLocalUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  return (

    <div className={`home home--${theme}`}>
      <h1 className={`title title--${theme}`}>Steam Clone</h1>
      <nav className={`nav-bar nav-bar--${theme}`}>
        <Button type='text' onClick={themeHandler}>Cambiar Tema</Button>
        {localUser?.verified && <Button type='text' onClick={() => navigate('/admin')}>Admin</Button>}
        {localUser?.username ? <Button type='text' onClick={clearUser}>Sign out</Button> : <Button type='text' onClick={() => navigate('/login')}>Login</Button>}
      </nav>
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
