/* eslint-disable react/prop-types */
import React from 'react';
import { Container } from './styles';

export interface Props {
  children: React.ReactNode;
}

const Cards: React.FC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Cards;
