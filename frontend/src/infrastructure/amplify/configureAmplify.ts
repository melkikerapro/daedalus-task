import { Amplify } from 'aws-amplify';
import outputs from '../../../../amplify_outputs.json';

let configured = false;

export function configureAmplify(): void {
  if (configured) {
    return;
  }

  Amplify.configure(outputs);

  configured = true;
}
