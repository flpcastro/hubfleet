import { useRef } from 'react';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { TextAreaInput } from '../../components/TextAreaInput';
import * as S from './styles';
import { TextInput } from 'react-native';

export function Departure() {
  const descriptionRef = useRef<TextInput>(null);

  function handleDepartureRegister() {
    console.log('ok')
  }

  return (
    <S.Container>
      <Header 
        title='Saída'
      />

      <S.Content>
        <LicensePlateInput 
          label='Placa do veículo'
          placeholder='BRA1234'
          onSubmitEditing={() => descriptionRef.current?.focus()}
          returnKeyType='next'
        />

        <TextAreaInput 
          ref={descriptionRef}
          label='Finalidade'
          placeholder='Vou utilizar o veículo para...'
          onSubmitEditing={handleDepartureRegister}
          returnKeyType='send'
          blurOnSubmit
        />

        <Button 
          title='Registrar Saída'
          onPress={handleDepartureRegister}
        />
      </S.Content>
    </S.Container>
  );
}