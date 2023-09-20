import { Header } from '../../components/Header';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { TextAreaInput } from '../../components/TextAreaInput';
import * as S from './styles';

export function Departure() {
  return (
    <S.Container>
      <Header 
        title='Saída'
      />

      <S.Content>
        <LicensePlateInput 
          label='Placa do veículo'
          placeholder='BRA1234'
        />

        <TextAreaInput 
          label='Finalidade'
          placeholder='Vou utilizar o veículo para...'
        />
      </S.Content>
    </S.Container>
  );
}