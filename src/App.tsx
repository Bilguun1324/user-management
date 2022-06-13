import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './graphql';
import { Users, Groups } from './pages';

export const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Users/>
      <Groups/>
    </ApolloProvider>
  );
}