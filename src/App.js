import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { Home, Game, Admin } from './pages/index';

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
    }
  ]);

  return <RouterProvider router={router} />
}

export default App;
