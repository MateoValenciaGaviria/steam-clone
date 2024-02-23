import { NavBar, Card } from '../../components/index';
import { useDataBase } from '../../hooks/index';
import { useSelector } from "react-redux";

export const Home = () => {
  const theme = useSelector((state) => state.theme.value);
  const { games } = useDataBase();

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
