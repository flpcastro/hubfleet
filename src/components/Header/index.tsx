import { TouchableOpacity } from 'react-native';
import * as S from './styles';
import { ArrowLeft } from 'phosphor-react-native';
import { useTheme } from 'styled-components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

type Props = {
  title: string;
}

export function Header({ title }: Props) {
  const { goBack } = useNavigation();
  const { COLORS } = useTheme();

  const insets = useSafeAreaInsets();
  const paddingTop = insets.top + 42;



  return (
    <S.Container
      style={{ paddingTop }}
    >
      <TouchableOpacity
        onPress={goBack}
        activeOpacity={0.7}
      >
        <ArrowLeft 
          size={24}
          weight='bold'
          color={COLORS.BRAND_LIGHT}
        />
      </TouchableOpacity>

      <S.Title>
        {title}
      </S.Title>
    </S.Container>
  );
}