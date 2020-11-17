import React, { ButtonHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';
import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ComponentType<IconBaseProps>;
  text?: string;
}

const Button: React.FC<ButtonProps> = ({
  icon: Icon,
  text,
  children,
  ...rest
}) => {
  return (
    <Container type="button" {...rest}>
      {children}
      {text}
      {Icon && <Icon size={20} />}
    </Container>
  );
};

export default Button;
