import { FC, useEffect } from 'react';
import SocialButton from './SocialButton';
import { useLoginWithSocialMediaMutation } from '~/app/api';
import { ReactComponent as VkIcon } from './images/vk.svg';
import { useLocation } from 'react-router-dom';

const VkButton: FC = () => {
  const [login] = useLoginWithSocialMediaMutation();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const from = searchParams.get('from') || '/profile/info';
  const code = searchParams.get('code');
  const clientId = process.env.REACT_APP_VK_CLIENT_ID;
  const host = window.location.host;
  const protocol = window.location.protocol;
  const cburl = `${protocol}//${host}/auth/login`;

  const handleRedirect = () => {
    window.location.href = `https://oauth.vk.com/authorize?client_id=${clientId}&display=popup&redirect_uri=${cburl}&scope=email&response_type=code&v=5.120&state=${from}`;
  };

  const handleLogin = (code: string) => {
    if (code) login({ token: code, media: 'vkontakte' });
  };

  useEffect(() => {
    if (code) handleLogin(code);
  }, [code]);

  return (
    <SocialButton
      icon={VkIcon}
      onClick={handleRedirect}
      viewBox="0 0 200 200"
    />
  );
};

export default VkButton;
