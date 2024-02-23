import PocketBase, { RecordModel } from 'pocketbase';
import { useEffect, useState } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

export const useDataBase = (gameId?: string) => {
  const pb = new PocketBase('http://127.0.0.1:8090');
  const [games, setGames] = useState<RecordModel[]>();
  const [game, setGame] = useState<RecordModel>();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const notification = (type, customMessage) => {
    messageApi.open({
      type: type,
      content: customMessage,
      className: 'custom-class',
      duration: 10,
      style: {
        marginTop: '20px',
      },
    });
  };

  const getRecords = async () => {
    try {
      const records = await pb
        .collection('games')
        .getFullList({ requestKey: null });
      setGames(records);
    } catch (error) {
      console.log(error);
      console.log(error.isAbort);
    }
  };

  const getRecord = async () => {
    try {
      const record = await pb.collection('games').getOne(gameId);
      setGame(record);
    } catch (error) {
      console.log(error);
      console.log(error.isAbort);
    }
  };

  const postNewGame = async (values) => {
    const data = values;
    await pb.collection('games').create(data);
    notification('success', 'The game was published!');
  };

  const authUser = async (values) => {
    const authData = await pb
      .collection('users')
      .authWithPassword(values.username, values.password);
    if (authData.record) {
      localStorage.setItem('user', JSON.stringify(authData.record));
      notification('success', `Welcome back ${values.username}!`);
      setTimeout(() => {
        navigate('/');
      }, 2500);
    } else {
      notification('error', `User not found`);
    }
  };

  const createNewUser = async (values) => {
    const data = values;
    data.emailVisibility = true;
    await pb.collection('users').create(data);
    notification('success', 'Your account has been created!');
    localStorage.setItem('user', JSON.stringify(data));
    setTimeout(() => {
      navigate('/');
    }, 2500);
  };

  useEffect(() => {
    getRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getRecord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId]);

  return {
    games,
    game,
    postNewGame,
    authUser,
    createNewUser,
    notification,
    contextHolder,
  };
};
