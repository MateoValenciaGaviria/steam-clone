import React from 'react';
import { Card as AntCard } from 'antd';
import { CardProps } from './card.types';
import { Button } from '..';

const { Meta } = AntCard;

export const Card = ({ name, description, price, imgUrl }: CardProps) => {
  return (
    <AntCard
      hoverable
      style={{
        width: 240,
      }}
      cover={
        <img className="card-img" alt={`Portada de ${name}`} src={imgUrl} />
      }
    >
      <Meta className="card-text" title={name} description={description} />
      <div className="card__button-container">
        <Button>More</Button>
        <Button type="primary">Add</Button>
      </div>
    </AntCard>
  );
};

export default Card;
