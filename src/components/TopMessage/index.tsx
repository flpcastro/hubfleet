import { useTheme } from 'styled-components/native';
import { IconBoxProps } from '../ButtonIcon';
import * as S from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  icon?: IconBoxProps;
  title: string;
}

export function TopMessage({ title, icon: Icon }: Props) {
  const { COLORS } = useTheme();
  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 5;

  return (
    <S.Container style={{ paddingTop }}>
      {
        Icon &&
        <Icon 
          size={18}
          color={COLORS.GRAY_100}
        />
      }
      <S.Title>
        {title}
      </S.Title>
    </S.Container>
  );
}