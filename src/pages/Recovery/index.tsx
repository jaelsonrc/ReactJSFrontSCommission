/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiChevronLeft, FiSend } from 'react-icons/fi';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container } from './styles';
import TitlePage from '../../components/TitlePage';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';
import { GlobalConf } from '../../services/GlobalConf';

interface SignInFormData {
  Email: string;
}

const Recovery: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [load, setLoad] = useState(false);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          Email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        setLoad(true);

        const { Email } = data;
        await api.get(`/user/recovery?email=${Email}`);
        history.push('/login');
      } catch (err) {
        setLoad(false);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na requisição',
          description:
            'Ocorreu um erro ao enviar os dados. Informe o administrador do sistema',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit} className="landing-page-form">
        <fieldset>
          <TitlePage title={GlobalConf.titleCompany}>
            <Link className="tbnLinkDefault" to="/">
              <FiChevronLeft />
            </Link>
          </TitlePage>
          <Input name="Email" placeholder="E-mail" />
        </fieldset>
        {!load && <Button type="submit" text="Enviar" icon={FiSend} />}
      </Form>
    </Container>
  );
};
export default Recovery;
