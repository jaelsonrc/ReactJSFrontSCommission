/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiFilePlus, FiUser, FiEdit, FiTrash2 } from 'react-icons/fi';
import { Form } from '@unform/web';
import CardItem from '../../components/CardItem';
import Cards from '../../components/Cards';
import TitlePage from '../../components/TitlePage';
import { Container, Topo, ItemList } from './styles';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { optionsStatus as options, getStatus } from '../../utils/statusEnum';
import api from '../../services/api';
import formatValue from '../../utils/formatValue';
import { useAuth } from '../../hooks/auth';
import Dropdown from '../../components/Dropdown';
import { useToast } from '../../hooks/toast';

interface Commission {
  id: string;
  date: string;
  order: number;
  description: string;
  situation: string;
  value: string;
}

const Dashboard: React.FC = () => {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const { signOut } = useAuth();
  const [find, setFind] = useState<string>('');
  const { addToast } = useToast();

  function setData(list: Commission[]) {
    const listCommissions = list.map((data: Commission) => ({
      id: data.id,
      date: new Date(data.date).toLocaleDateString('pt-BR'),
      order: data.order,
      description: data.description,
      situation: getStatus(Number(data.situation)),
      value: formatValue(Number(data.value)),
    }));
    setCommissions([...listCommissions]);
  }

  const findCommissions = useCallback(
    async (e: any) => {
      try {
        let strUrl = `/commission`;
        let situation = 0;
        if (!find && (!e || e == null)) {
          const response = await api.get(strUrl);
          setData(response.data);
          return;
        }

        if (e && e != null) {
          const { value } = e;
          situation = value;
        }

        strUrl += `/find?situation=${situation || 0}`;

        if (find?.length > 0) strUrl += `&description=${find}`;
        const response = await api.get(strUrl);
        setData(response.data);
      } catch (err) {
        setFind('');
      }
    },
    [find],
  );

  const loadCommissions = useCallback(async () => {
    try {
      const response = await api.get('/commission');
      setData(response.data);
    } catch (err) {
      signOut();
    }
  }, [signOut]);

  useEffect(() => {
    loadCommissions();
  }, [loadCommissions]);

  const handleBlurDescription = useCallback(async () => {
    findCommissions(null);
  }, [findCommissions]);

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await api.delete(`/commission/${id}`);
        const list = commissions.filter(f => f.id !== id);
        setCommissions([...list]);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao enviar',
          description:
            'Ocorreu um erro ao processar a requisição. Informe o administrador do sistema',
        });
      }
    },
    [addToast, commissions],
  );

  return (
    <Container>
      <Form
        onSubmit={e => {
          e.preventDefault();
        }}
        className="landing-page-form"
      >
        <fieldset>
          <TitlePage title="Registros de Comissões">
            <Link className="tbnLinkDefault" to="/app/adicionar">
              <FiFilePlus />
            </Link>
            <Dropdown icon={FiUser} btnClassName="tbnLinkDefault">
              <Link to="/perfil">Meu Perfil</Link>
              <button
                type="button"
                onClick={e => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sair
              </button>
            </Dropdown>
          </TitlePage>
          <Topo>
            <Input
              name="buscar"
              placeholder="Procurar"
              value={find}
              onChange={e => {
                setFind(e.target.value);
              }}
              onBlur={handleBlurDescription}
            />
            <Select
              name="status"
              onChange={findCommissions}
              placeholder="Situação"
              options={options}
              isClearable
            />
          </Topo>
          <Cards>
            {commissions.map(commission => (
              <ItemList key={commission.id}>
                <FiTrash2
                  onClick={() => {
                    handleDelete(commission.id);
                  }}
                />
                <CardItem
                  to={`/app/editar/${commission.id}`}
                  icon={FiEdit}
                  title={`${commission.description} - ${commission.order}`}
                  subtitle={`${commission.date} - ${commission.situation}`}
                  text={commission.value}
                />
              </ItemList>
            ))}
          </Cards>
        </fieldset>
      </Form>
    </Container>
  );
};

export default Dashboard;
