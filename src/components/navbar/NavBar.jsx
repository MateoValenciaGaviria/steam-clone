import { useEffect, useState } from 'react';
import { Button, } from '../index';
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from '../../redux/reducers/themeSlice';
import { useNavigate } from 'react-router-dom';

export const NavBar = () => {
  const theme = useSelector((state) => state.theme.value);
  const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('user')));
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const themeHandler = () => {
    dispatch(changeTheme(theme === 'LIGHT' ? 'DARK' : 'LIGHT'));
  }

  const clearUser = () => {
    localStorage.clear()
    setLocalUser();
  }

  useEffect(() => {
    setLocalUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  return (
    <div className={`nav-bar nav-bar--${theme}`}>
      <h1 className={`nav-bar__title nav-bar__title--${theme}`}>Steam Clone</h1>
      <nav className={`nav-bar__container nav-bar__container--${theme}`}>
        <Button type='text' onClick={() => navigate('/')}>Home</Button>
        <Button type='text' onClick={themeHandler}>Cambiar Tema</Button>
        {localUser?.verified && <Button type='text' onClick={() => navigate('/admin')}>Admin</Button>}
        {localUser?.username ? <Button type='text' onClick={clearUser}>Sign out</Button> : <Button type='text' onClick={() => navigate('/login')}>Login</Button>}
      </nav>
    </div>
  )
}
