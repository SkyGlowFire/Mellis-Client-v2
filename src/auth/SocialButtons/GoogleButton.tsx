import { FC } from 'react';
import SocialButton from './SocialButton';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import GoogleIcon from '@mui/icons-material/Google';
import { useLoginWithSocialMediaMutation } from '~/app/api';

type GoogleResponse = GoogleLoginResponse | GoogleLoginResponseOffline;

const GoogleButton: FC = () => {
  const [login] = useLoginWithSocialMediaMutation();
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const onSuccess = (response: GoogleResponse) => {
    if ('accessToken' in response) {
      const token = response.accessToken;
      login({ token, media: 'google' });
    }
  };

  const onFailure = (err: any) => {
    console.log(err);
  };

  return (
    <GoogleLogin
      clientId={clientId || ''}
      render={(renderProps) => (
        <SocialButton
          icon={GoogleIcon}
          color="#dc4e41"
          onClick={renderProps.onClick}
        />
      )}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      isSignedIn={false}
      prompt="select_account"
    />
  );
};

export default GoogleButton;
