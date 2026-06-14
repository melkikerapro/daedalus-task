import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { TasksPage } from './presentation/pages/TasksPage';

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <TasksPage
          username={user?.username ?? user?.signInDetails?.loginId ?? 'user'}
          onSignOut={() => signOut?.()}
        />
      )}
    </Authenticator>
  );
}

export default App;
