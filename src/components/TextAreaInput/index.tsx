import { forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import * as S from './styles';
import { useTheme } from 'styled-components/native';

type Props = TextInputProps & {
  label: string;
}

const TextAreaInput = forwardRef<TextInput, Props>(({ label, ...rest }, ref) => {
 const { COLORS } = useTheme();

  return (
    <S.Container>
      <S.Label>
        {label}
      </S.Label>

      <S.Input 
        ref={ref}
        placeholderTextColor={COLORS.GRAY_400}
        multiline
        autoCapitalize='sentences'
        {...rest}
      />
    </S.Container>
  );
})

export { TextAreaInput }