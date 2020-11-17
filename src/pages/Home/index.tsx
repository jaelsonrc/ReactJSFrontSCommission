/* eslint-disable react/jsx-curly-newline */
import React, { useState, FormEvent } from 'react';
import { FiLogIn, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import logoImg from '../../assets/LogoFafa.png';

import { Title, Form, Error, Topo } from './styles';
import Cards from '../../components/Cards';
import CardItem from '../../components/CardItem';
import { getStatus } from '../../utils/statusEnum';
import formatValue from '../../utils/formatValue';
import { GlobalConf } from '../../services/GlobalConf';

interface Order {
  date: string;
  description: string;
  situation: string;
  value: number;
}

const Home: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [inputError, setInputError] = useState('');
  const [order, setOrder] = useState<Order>({} as Order);

  async function handleAddRepository(
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();

    if (!orderNumber) {
      setInputError('Digite o numero da sequencia informado');
      return;
    }

    try {
      setOrder({} as Order);

      const response = await api.get(`commission/order/${orderNumber}`);
      const { date, description, situation, value } = response.data;

      setOrder({
        date: new Date(date).toLocaleDateString('pt-BR'),
        description,
        situation: getStatus(situation),
        value,
      });
      setOrderNumber('');
      setInputError('');
    } catch (err) {
      setInputError('Sequencia informada não encontrada.');
    }
  }

  return (
    <>
      <Topo>
        <Link to="/login">
          <FiLogIn size={16} />
          Login
        </Link>
      </Topo>
      <Title>
        <img src={logoImg} alt="Explorer" width="64" />
        <span>{GlobalConf.titleHome}</span>
      </Title>
      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <div>
          <input
            value={orderNumber}
            onChange={(e: { target: { value: any } }) =>
              setOrderNumber(e.target.value)
            }
            placeholder="Digite o numero informado"
          />
          <button type="submit">Pesquisar</button>
        </div>
        {inputError && <Error>{inputError}</Error>}
      </Form>

      <Cards>
        {!!order.description && (
          <CardItem
            to="/"
            icon={FiSearch}
            title={order.description}
            subtitle={order.situation}
            text={formatValue(order.value)}
          />
        )}
      </Cards>
    </>
  );
};

export default Home;
