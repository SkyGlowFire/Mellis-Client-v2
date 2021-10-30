import LoginWindow from './LoginWindow';
import ProfileWindow from './ProfileWindow';
import { FC } from 'react';
import { useAppSelector } from '~/app/hooks';

interface ProfileBoxProps {
  onClose: () => void;
}

const ProfileBox: FC<ProfileBoxProps> = ({ onClose }) => {
  const { isAuth, user } = useAppSelector((state) => state.auth);
  return isAuth && user ? (
    <ProfileWindow onClose={onClose} user={user} />
  ) : (
    <LoginWindow onClose={onClose} />
  );
};

export default ProfileBox;
