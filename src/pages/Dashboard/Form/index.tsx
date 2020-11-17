/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { FiChevronLeft, FiSave } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import TitlePage from '../../../components/TitlePage';

import { Container } from './styles';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import Button from '../../../components/Button';
import {
  OptionProps,
  optionsStatus as options,
} from '../../../utils/statusEnum';
import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';
import DateTime from '../../../components/DateTime';
import getValidationErrors from '../../../utils/getValidationErrors';

interface Param {
  id: string;
}

interface Commission {
  id: string;
  date: string;
  description: string;
  situation: number;
  value: number;
  note: string;
}

const Dados: React.FC = () => {
  const params = useParams<Param>();
  const [commission, setCommission] = useState<Commission>({} as Commission);
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const [load, setLoad] = useState(false);
  const [save, setSave] = useState(false);

  const loadDatas = useCallback(async () => {
    try {
      if (!params.id) return;

      setLoad(true);
      const response = await api.get(`Commission/${params.id}`);
      setLoad(false);
      const { id, date, description, situation, value, note } = response.data;

      setCommission({ id, date, description, situation, value, note });
      const selectOption = options.filter(
        (f: OptionProps) => f.value === situation,
      );

      formRef?.current?.setData({
        date: new Date(date),
        description,
        situation: selectOption,
        value,
        note,
      });
    } catch (err) {
      history.push('/app/adicionar');
    }
  }, [history, params.id]);

  useEffect(() => {
    loadDatas();
  }, [loadDatas]);

  const handleSubmit = useCallback(
    async data => {
      try {
        const schema = Yup.object().shape({
          date: Yup.date().required('Campo obrigatório').nullable(),
          description: Yup.string().required('Campo obrigatório'),
          situation: Yup.number().required('Campo obrigatório').nullable(),
          value: Yup.string().required('Campo obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { date, description, situation, value, note } = data;

        setSave(true);
        const edit = !!params.id;
        if (edit) {
          await api.put(
            'commission',
            JSON.stringify({
              date,
              description,
              situation: Number(situation),
              value: Number(value),
              note,
              id: params.id,
            }),
          );
        } else {
          await api.post(
            'commission',
            JSON.stringify({
              date,
              description,
              situation: Number(situation),
              value: Number(value),
              note,
            }),
          );
        }

        history.push('/app');
      } catch (err) {
        setSave(false);

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um erro ao salvar o registro. Informe o administrador do sistema',
        });
      }
    },
    [addToast, history, params.id],
  );

  if (!commission || load) return <Container />;
  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit} className="landing-page-form">
        <fieldset>
          <TitlePage title="Registro de comissão">
            <Link className="tbnLinkDefault" to="/app">
              <FiChevronLeft />
            </Link>
          </TitlePage>
          <DateTime name="date" placeholder="Data" />
          <Input
            name="description"
            placeholder="Descrição"
            showLabel={!!params.id}
          />
          <Select name="situation" placeholder="Situação" options={options} />
          <Input
            name="value"
            placeholder="Valor"
            type="number"
            step="any"
            showLabel={!!params.id}
          />
          <Input name="note" placeholder="Anotações" showLabel={!!params.id} />
        </fieldset>
        {!save && <Button type="submit" text="Salvar" icon={FiSave} />}
      </Form>
    </Container>
  );
};

export default Dados;
