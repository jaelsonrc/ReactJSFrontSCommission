import React from 'react';
import { Legend } from './styles';

export interface Props {
  title: string;
  children: React.ReactNode;
}

// eslint-disable-next-line react/prop-types
const TitlePage: React.FC<Props> = ({ title, children }) => {
  return (
    <Legend>
      {title}
      <div>{children}</div>
    </Legend>
  );
};

export default TitlePage;
