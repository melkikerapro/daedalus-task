import { Amplify } from 'aws-amplify';

let configured = false;

export function configureAmplify(): void {
  if (configured) {
    return;
  }

  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
        userPoolClientId: import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID,
        identityPoolId: import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID,
        loginWith: {
          email: true,
        },
      },
    },
    API: {
      GraphQL: {
        endpoint: import.meta.env.VITE_APPSYNC_GRAPHQL_ENDPOINT,
        region: import.meta.env.VITE_AWS_REGION,
        defaultAuthMode: 'userPool',
      },
    },
  });

  configured = true;
}
