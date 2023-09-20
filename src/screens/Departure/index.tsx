import { Header } from '../../components/Header';
import { LicensePlateInput } from '../../components/LicensePlateInput';
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
      </S.Content>
    </S.Container>
  );
}