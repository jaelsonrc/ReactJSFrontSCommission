import React from 'react';
import { IconBaseProps } from 'react-icons';
import { Container } from './styles';

export interface Props {
  icon?: React.ComponentType<IconBaseProps>;
  name?: string;
  children: React.ReactNode;
  btnClassName?: string;
}

const Dropdown: React.FC<Props> = ({
  name,
  btnClassName,
  icon: Icon,
  children,
}) => {
  return (
    <Container>
      <button type="button" className={btnClassName}>
        {Icon && <Icon />}
        {name && `${name}`}
      </button>
      <div className="dropdown-content">{children}</div>
    </Container>
  );
};

export default Dropdown;
