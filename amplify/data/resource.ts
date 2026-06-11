import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Task: a
    .model({
      title: a.string().required(),
      description: a.string(),
      status: a.string().required(),
      priority: a.string().required(),
      dueDate: a.datetime(),
      assignedTo: a.string(),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(['read']),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
