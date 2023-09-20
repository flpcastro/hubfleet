import { TextInputProps } from 'react-native';
import * as S from './styles';
import { useTheme } from 'styled-components/native';

type Props = TextInputProps & {
  label: string;
}

export function TextAreaInput({ label, ...rest }: Props) {
 const { COLORS } = useTheme();

  return (
    <S.Container>
      <S.Label>
        {label}
      </S.Label>

      <S.Input 
        placeholderTextColor={COLORS.GRAY_400}
        multiline
        autoCapitalize='sentences'
        {...rest}
      />
    </S.Container>
  );
}