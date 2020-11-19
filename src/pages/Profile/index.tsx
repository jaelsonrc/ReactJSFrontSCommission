/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import jwt_decode from 'jwt-decode';
import { FiChevronLeft, FiEdit2 } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container } from './styles';
import TitlePage from '../../components/TitlePage';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';

interface SignInFormData {
  password: string;
  passwordConfirmation: string;
}

interface JwtParam {
  unique_name: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [load, setLoad] = useState(false);
  const { addToast } = useToast();
  const history = useHistory();
  const { token } = useAuth();
  const [login, setLogin] = useState('');

  useEffect(() => {
    const jwt = jwt_decode(token) as JwtParam;
    setLogin(jwt.unique_name);
  }, [token]);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      if (!token) return;

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string()
            .required('Senha é obrigatório!')
            .min(6, 'A senha precisa ter pelo menos 6 caracteres.'),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'As senhas não confere!',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        setLoad(true);
        const { password } = data;
        await api.put(
          `/user/change-password-profile`,
          JSON.stringify({ Token: token, Password: password }),
        );
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
          title: 'Erro na requisição',
          description:
            'Ocorreu um erro ao enviar os dados. Informe o administrador do sistema',
        });
      }
    },
    [addToast, history, token],
  );

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit} className="landing-page-form">
        <fieldset>
          <TitlePage title="Meu Perfil">
            <Link className="tbnLinkDefault" to="/">
              <FiChevronLeft />
            </Link>
          </TitlePage>
          <Input
            name="login"
            placeholder="Login"
            disabled
            value={login}
            showLabel
          />
          <Input name="password" placeholder="Senha" type="password" />
          <Input
            name="passwordConfirmation"
            placeholder="Confirma senha"
            type="password"
          />
        </fieldset>
        {!load && <Button type="submit" text="Trocar Senha" icon={FiEdit2} />}
      </Form>
    </Container>
  );
};
export default Profile;
