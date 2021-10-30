import { FC } from 'react';
import Banner from './Banner/Banner';
import Featured from './Featured';
import ShopByLook from './ShopByLook';
import Collections from './Collections';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  return (
    <>
      <Banner image="/images/banner.jpg" />
      <Featured />
      <ShopByLook />
      <Collections />
    </>
  );
};

export default Home;
