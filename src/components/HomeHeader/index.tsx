import { useApp, useUser } from '@realm/react';
import { TouchableOpacity } from 'react-native';

import { Power } from 'phosphor-react-native';

import * as S from './styles';
import theme from '../../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function HomeHeader() {
  const user = useUser();
  const app = useApp();
  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 32; 

  function handleLogout() {
    app.currentUser?.logOut();
  }

  return (
    <S.Container style={{ paddingTop }}>
      <S.Picture 
        source={{ uri: user.profile.pictureUrl }}
        placeholder="L184i9kCbIof00ayjZay~qj[ayj@"
      />

      <S.Greeting>
        <S.Message>
          Olá
        </S.Message>

        <S.Name>
          {user.profile.name}
        </S.Name>
      </S.Greeting>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleLogout}
      >
        <Power 
          size={32} 
          color={theme.COLORS.GRAY_400} 
        />
      </TouchableOpacity>
    </S.Container>
  );
}