import React from 'react';
import { Card as AntCard } from 'antd';
import { CardProps } from './card.types';
import { Button } from '..';
import { useSelector } from 'react-redux';

export const Card = ({ name, description, price, imgUrl }: CardProps) => {
  const theme = useSelector((state: any) => state.theme.value);

  return (
    <AntCard
      className={`card card--${theme}`}
      hoverable
      style={{
        width: 240,
      }}
      cover={
        <img className="card-img" alt={`Portada de ${name}`} src={imgUrl} />
      }
    >
      <div className={`card-text card-text--${theme}`}>
        <h3 className={`card-title`}>{name}</h3>
        <p className={`card-description`}>{description}</p>
      </div>
      <div className="card__button-container">
        <Button type="default">More</Button>
        <Button type="primary">Add</Button>
      </div>
    </AntCard>
  );
};

export default Card;
