import { useEffect, useState } from 'react';
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '@env';

import * as S from './styles';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import backgroundImg from '../../assets/background.png';
import { Button } from '../../components/Button';
import { Alert } from 'react-native';

import { Realm, useApp } from '@realm/react';

WebBrowser.maybeCompleteAuthSession();

export function SignIn() {
	const [isAuthenticating, setIsAuthenticating] = useState(false);

	const app = useApp();

	const [_, response, googleSignIn] = Google.useAuthRequest({
		androidClientId: ANDROID_CLIENT_ID,
		iosClientId: IOS_CLIENT_ID,
		scopes: ['profile', 'email']
	});

	async function handleGoogleSignIn() {
		setIsAuthenticating(true);

		await googleSignIn().then((response) => {
			if(response.type !== 'success') {
				setIsAuthenticating(false);
			}
		})
	}

	useEffect(() => {
		if(response?.type === 'success') {
			if(response.authentication?.idToken) {
				const credentials = Realm.Credentials.jwt(response.authentication.idToken);
				app.logIn(credentials).catch(error => {
					console.log(error);
					Alert.alert('Entrar', 'Não foi possível conectar-se a sua conta Google');
					setIsAuthenticating(false);
				})
			} else {
				Alert.alert('Entrar', 'Não foi possível conectar-se a sua conta Google');
				setIsAuthenticating(false);
			}
		}
	}, [response])

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
				onPress={handleGoogleSignIn}
				isLoading={isAuthenticating}
			/>
		</S.Container>
	)
}
