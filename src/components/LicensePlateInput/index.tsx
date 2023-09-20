import { useTheme } from 'styled-components';
import * as S from './styles';
import { TextInput, TextInputProps } from 'react-native';
import { forwardRef } from 'react';

type Props = TextInputProps & {
  label: string;
}

const LicensePlateInput = forwardRef<TextInput, Props>(({ label, ...rest }, ref) => {
  const { COLORS } = useTheme();

  return (
    <S.Container>
      <S.Label>
        {label}
      </S.Label>

      <S.Input
        ref={ref}
        maxLength={7}
        autoCapitalize='characters'
        placeholderTextColor={COLORS.GRAY_400}
        {...rest}
      />
    </S.Container>
  );
})

export { LicensePlateInput }