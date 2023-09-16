import backgroundImg from '../../assets/background.png';
import { Button } from '../../components/Button';
import * as S from './styles';

export function SignIn() {
	return (
		<S.Container source={backgroundImg}>
			<S.Title>
				Hub Fleet
			</S.Title>

			<S.Slogan>
				Gestão de uso de veículos
			</S.Slogan>

			<Button 
				title='Entrar com Google'
			/>
		</S.Container>
	)
}
