import { signInWithPopup } from 'firebase/auth';
import { firebase } from '../../firebase';
import { returnAuthentication } from '../Interface';
import SessionCookie from '../SessionCookie';
import { signInRequest } from '../../../services/auth';
import Router, { useRouter } from 'next/router'


const fireBaseLogIn = async (provider: any) => await signInWithPopup(firebase.auth, provider)

	.then(async (result: any) => {

		const formated_user = {
			id_social: "id_social",
			provider: result.providerId,
			nickname: result.user.nickname,
			name: result.user.displayName,
			email: result.user.email,
			token: result.user.accessToken,
			avatar_url: result.user.photoURL
		}

		const user = await signInRequest(formated_user)

		if (!user.token) {
			const error = user.response.data
			const data: returnAuthentication = { success: "false", user: {}, error };
			return data;
		}

		SessionCookie.set(user.token.token);
		const data: returnAuthentication = { success: "true", user, error: {} };

		Router.push('/dashboard');
		return data;

	}).catch((error) => {

		const data: returnAuthentication = { success: "false", user: {}, error };

		SessionCookie.remove();

		return data;
	});

export default fireBaseLogIn