import { useNavigation } from '@react-navigation/native';
import { CarStatus } from '../../components/CarStatus';
import { HomeHeader } from '../../components/HomeHeader';
import * as S from './styles';
import { useQuery, useRealm } from '../../libs/realm';
import { useEffect, useState } from 'react';
import { Historic } from '../../libs/realm/schemas/Historic';
import { Alert } from 'react-native';

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);

  const { navigate } = useNavigation();

  const historic = useQuery('Historic');  
  const realm = useRealm();

  function handleRegisterMovement() {
    if(vehicleInUse?._id) {
      return navigate('arrival', { id: vehicleInUse._id.toString() });
    }

    navigate('departure');
  }

  function fetchVehicleInUse() {
    try {
      const vehicle = historic.filtered("status = 'departure'")[0];
      setVehicleInUse(vehicle as Historic);
    } catch (error) {
      Alert.alert('Veículo em uso', 'Não foi possível carregar o veículo em uso.');
      console.log(error);
    }
  }

  function fetchHistoric() {
    const response = historic.filtered("status = 'arrival' SORT(created_at DESC)");
    console.log(response);
  }

  useEffect(() => {
    fetchVehicleInUse();
  }, [])

  useEffect(() => {
    realm.addListener('change', () => fetchVehicleInUse());
    return () => realm.removeListener('change', fetchVehicleInUse);
  }, [])

  useEffect(() => {
    fetchHistoric();
  }, [historic])

  return (
    <S.Container>
      <HomeHeader />

      <S.Content>
        <CarStatus 
          onPress={handleRegisterMovement}
          licensePlate={vehicleInUse?.license_plate}
        />
      </S.Content>
    </S.Container>
  );
}