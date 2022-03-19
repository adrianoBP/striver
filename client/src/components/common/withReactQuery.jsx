import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

/**
 * Wraps the given component with the query client provider to be able to use react-query hooks.
 */
const withReactQuery = (Component) => {
  const WithReactQuery = (props) => {
    return (
      <QueryClientProvider client={queryClient}>
        <Component {...props} />
      </QueryClientProvider>
    );
  };

  const name = Component.displayName || Component.name || 'Component';

  WithReactQuery.displayName = `withReactQuery(${name})`;

  return WithReactQuery;
};

export default withReactQuery;
