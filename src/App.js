import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { Home, Game, Admin } from './pages/index';
import { Login } from './pages/login/Login';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/games/:gameId",
      element: <Game />
    },
    {
      path: "/admin",
      element: <Admin />
    },
    {
      path: "/login",
      element: <Login />
    }
  ]);

  return <RouterProvider router={router} />
}

export default App;
