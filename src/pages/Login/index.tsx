/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiChevronLeft, FiLogIn } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container } from './styles';
import TitlePage from '../../components/TitlePage';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { GlobalConf } from '../../services/GlobalConf';

interface SignInFormData {
  login: string;
  password: string;
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [load, setLoad] = useState(false);
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          login: Yup.string().required('Login obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        setLoad(true);
        await signIn({
          login: data.login,
          password: data.password,
        });
        history.push('/app');
      } catch (err) {
        setLoad(false);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      }
    },
    [signIn, addToast, history],
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
          <Input name="login" placeholder="Login" />
          <Input name="password" placeholder="Senha" type="password" />
        </fieldset>
        {!load && <Button type="submit" text="Login" icon={FiLogIn} />}
        <br />
        <Link className="link" to="/recuperarSenha">
          Esqueci minha senha
        </Link>
      </Form>
    </Container>
  );
};
export default Login;
