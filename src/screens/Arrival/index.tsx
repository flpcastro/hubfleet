import { useNavigation, useRoute } from '@react-navigation/native';
import * as S from './styles';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { ButtonIcon } from '../../components/ButtonIcon';
import { X } from 'phosphor-react-native';
import { Historic } from '../../libs/realm/schemas/Historic';
import { BSON } from 'realm';
import { useObject, useRealm } from '../../libs/realm';
import { Alert } from 'react-native';

type RouteParamsProps = {
  id: string;
}

export function Arrival() {
  const route = useRoute();
  const { id } = route.params as RouteParamsProps;

  const historic = useObject(Historic, new BSON.UUID(id) as unknown as string);
  const realm = useRealm();

  const { goBack } = useNavigation();

  function handleRemoveVehicleUsage() {
    Alert.alert(
      'Cancelar', 
      'Cancelar a utilização do veículo?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => removeVehicleUsage() }
      ]
      )
  }

  function removeVehicleUsage() {
    realm.write(() => {
      realm.delete(historic);
    });

    goBack();
  }

  function handleArrivalRegister() {
    try {
      if(!historic) {
        return Alert.alert('Error', 'Não foi possível obter os dados para registrar a chegada do veículo.');
      }

      realm.write(() => {
        historic.status = 'arrival';
        historic.updated_at = new Date();
      });

      Alert.alert('Chegada', 'Chegada registrada com sucesso!');
      goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Não foi possível registrar a chegada do veículo.');
    }
  }

  return (
    <S.Container>
      <Header 
        title='Chegada'
      />

      <S.Content>
        <S.Label>
          Placa do Veículo
        </S.Label>

        <S.LicensePlate>
          {historic?.license_plate}
        </S.LicensePlate>

        <S.Label>
          Finalidade
        </S.Label>

        <S.Description>
          {historic?.description}
        </S.Description>

        <S.Footer>
          <ButtonIcon 
            icon={X}
            onPress={handleRemoveVehicleUsage}
          />

          <Button 
            title='Registrar Chegada'
            onPress={handleArrivalRegister}
          />
        </S.Footer>
      </S.Content>
      
    </S.Container>
  );
}