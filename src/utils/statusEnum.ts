export interface OptionProps {
  value: number;
  label: string;
}

export const optionsStatus: OptionProps[] = [
  { value: 1, label: 'Esperando Execução' },
  { value: 2, label: 'Esperando Pagamento' },
  { value: 3, label: 'Pagamento Não Aprovado' },
  { value: 4, label: 'Pagamento Aprovado' },
  { value: 5, label: 'Finalizado' },
];

export function getStatus(status: number): string {
  if (status > 0 && status <= optionsStatus.length) {
    return optionsStatus[status - 1].label;
  }
  return 'Opção invalida!';
}
