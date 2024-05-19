import { useEffect } from 'react';
import Logout from '../components/auth/Logout';
import Center from '../components/utils/Center';
import { PromptForm } from './PromptForm';

interface Props {}

const Home = ({}: Props) => {
  return (
    <Center>
      {/* <Logout /> */}
      <PromptForm />
    </Center>
  );
};

export default Home;
