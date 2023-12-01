import React, { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import { useParams } from 'react-router-dom';
import { Button } from '../../components/index'
import { LeftOutlined } from '@ant-design/icons';

const pb = new PocketBase('http://127.0.0.1:8090');

export const Game = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState();

  const getRecord = async () => {
    try {
      const record = await pb.collection("games").getOne(gameId);
      setGame(record);
    } catch (error) {
      console.log(error);
      console.log(error.isAbort);
    }
  }

  useEffect(() => {
    getRecord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {game && <div className='game-page__bg-img' style={{ backgroundImage: `url(${game.image})` }}></div>}
      {game && <div className='game-page'>
        <nav className='game-page__nav'>
          <Button type="link" icon={<LeftOutlined />} href='/' size='large'>Back to store</Button>
        </nav>
        <section className='game-page__container'>
          <div className='game-page__info'>
            <h1 className='game-page__title'>{game.name}</h1>
            <p className='game-page__description'>{game.description}</p>
            <div className='game-page__payment'>
              <Button type="primary" size='large'>{game.price !== 0 ? 'Buy' : 'Add'}</Button>
              <strong className='game-page__price'>{game.price !== 0 ? `${game.price} COP.` : 'FREE'}</strong>
            </div>
          </div>
          <img className="game-page__img" alt={`Portada de ${game.name}`} src={game.image} />
        </section>
      </div>}
    </>
  )
}

export default Game;
