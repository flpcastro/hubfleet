import { useRoute } from '@react-navigation/native';
import * as S from './styles';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';

type RouteParamsProps = {
  id: string;
}

export function Arrival() {
  const route = useRoute();
  const { id } = route.params as RouteParamsProps;

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
          XXX0000
        </S.LicensePlate>

        <S.Label>
          Finalidade
        </S.Label>

        <S.Description>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae minima debitis, doloribus mollitia, quas quo hic perferendis temporibus voluptatem sint, architecto quod inventore consequatur distinctio voluptates quam? Nulla, in eaque.
        </S.Description>

        <S.Footer>
          <Button 
            title='Registrar Chegada'
          />
        </S.Footer>
      </S.Content>
      
    </S.Container>
  );
}