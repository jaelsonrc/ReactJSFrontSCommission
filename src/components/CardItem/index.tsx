import React from 'react';
import { IconBaseProps } from 'react-icons';
import { Slink } from './styles';

export interface Props {
  to: string;
  srcImg?: string;
  title: string;
  subtitle: string;
  text: string;
  icon?: React.ComponentType<IconBaseProps>;
}

// eslint-disable-next-line react/prop-types
const CardItem: React.FC<Props> = ({
  to,
  title,
  subtitle,
  text,
  srcImg,
  icon: Icon,
}) => {
  return (
    <Slink to={to}>
      {srcImg && !Icon && <img src={srcImg} alt="Order" />}
      {Icon && !srcImg && <Icon size={42} />}
      {Icon && srcImg && <Icon size={42} />}
      <div>
        <strong>{title}</strong>
        <p>{subtitle}</p>
      </div>

      <p>
        <strong>{text}</strong>
      </p>
    </Slink>
  );
};

export default CardItem;
