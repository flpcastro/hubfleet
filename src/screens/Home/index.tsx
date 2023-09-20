import { CarStatus } from '../../components/CarStatus';
import { HomeHeader } from '../../components/HomeHeader';
import * as S from './styles';

export function Home() {
  return (
    <S.Container>
      <HomeHeader />

      <S.Content>
        <CarStatus />
      </S.Content>
    </S.Container>
  );
}