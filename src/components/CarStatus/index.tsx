import { Car, Key } from 'phosphor-react-native';
import * as S from './styles';
import { useTheme } from 'styled-components';
import { TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps & {
  licensePlate?: string | null;
}

export function CarStatus({ licensePlate = null, ...rest }: Props) {
  const theme = useTheme();

  const Icon = licensePlate ? Car : Key;
  const message = licensePlate ? `Veículo ${licensePlate} em uso. ` : `Nenhum veículo em uso. `;
  const status = licensePlate ? 'chegada' : 'saída';

  return (
    <S.Container
      {...rest}
    >
      <S.IconBox>
        <Icon 
          size={52}
          color={theme.COLORS.BRAND_LIGHT}
        />
      </S.IconBox>

      <S.Message>
        {message}

        <S.TextHighlight>
          Clique aqui para registrar a {status}.
        </S.TextHighlight>
      </S.Message>
    </S.Container>
  );
}