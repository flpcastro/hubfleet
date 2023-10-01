import { useNavigation } from '@react-navigation/native';
import { CarStatus } from '../../components/CarStatus';
import { HomeHeader } from '../../components/HomeHeader';
import * as S from './styles';
import { useQuery, useRealm } from '../../libs/realm';
import { useEffect, useState } from 'react';
import { Historic } from '../../libs/realm/schemas/Historic';
import { Alert, FlatList } from 'react-native';
import { HistoricCard, HistoricCardProps } from '../../components/HistoricCard';
import dayjs from 'dayjs';
import { useUser } from '@realm/react';

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);
  const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardProps[]>([]);

  const { navigate } = useNavigation();

  const historic = useQuery<Historic>('Historic');  
  const realm = useRealm();
  const user = useUser();

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
    try {
      const response = historic.filtered("status = 'arrival' SORT(created_at DESC)");

      const formattedHistoric = response.map((item) => {
        return ({
          id: item._id!.toString(),
          licensePlate: item.license_plate,
          isSync: false,
          created: dayjs(item.created_at).format('[Saída em] DD/MM/YYYY [às] HH:mm'),
        })
      })
  
      setVehicleHistoric(formattedHistoric);
    } catch (error) {
      console.log(error);
      Alert.alert('Histórico', 'Não foi possível carregar o histórico.');
    }
  }

  function handleHistoricDetails(id: string) {
    navigate('arrival', { id });
  }

  function progressNotification(transferred: number, transferable: number) {
    const percentage = (transferred / transferable) * 100;
    console.log(percentage);
  }

  useEffect(() => {
    fetchVehicleInUse();
  }, [])

  useEffect(() => {
    realm.addListener('change', () => fetchVehicleInUse());
    return () => {
      if(realm && !realm.isClosed) {
        realm.removeListener('change', fetchVehicleInUse);
      }
    };
  }, [])

  useEffect(() => {
    fetchHistoric();
  }, [historic])

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      const historicByUserQuery = realm.objects('Historic').filtered(`user_id = '${user!.id}'`);
      mutableSubs.add(historicByUserQuery, { name: 'historic_by_user' });
    })
  }, [realm])

  useEffect(() => {
    const syncSession = realm.syncSession;

    if(!syncSession) {
      return;
    }

    syncSession.addProgressNotification(
      Realm.ProgressDirection.Upload,
      Realm.ProgressMode.ReportIndefinitely,
      progressNotification
    )

    return () => syncSession.removeProgressNotification(progressNotification);
  }, [])

  return (
    <S.Container>
      <HomeHeader />

      <S.Content>
        <CarStatus 
          onPress={handleRegisterMovement}
          licensePlate={vehicleInUse?.license_plate}
        />

        <S.Title>
          Histórico
        </S.Title>

        <FlatList 
          data={vehicleHistoric}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <HistoricCard 
              data={item}
              onPress={() => handleHistoricDetails(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={(
            <S.Label>
              Nenhum veículo utilizado.
            </S.Label>
          )}
        />
      </S.Content>
    </S.Container>
  );
}