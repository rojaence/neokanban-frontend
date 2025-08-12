import { useHelloWorld } from '../services/authService';

export const Login = () => {
  const helloQuery = useHelloWorld();

  return <section>Login {helloQuery.data}</section>;
};
