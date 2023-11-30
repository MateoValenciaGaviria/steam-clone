import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { Home, Game } from './pages/index';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/games/:gameId",
      element: <Game />
    }
  ]);

  return <RouterProvider router={router} />
}

export default App;
