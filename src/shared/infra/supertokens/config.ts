import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import Passwordless from 'supertokens-node/recipe/passwordless';
import Dashboard from 'supertokens-node/recipe/dashboard';
import { SupertokensService } from 'supertokens-node/recipe/passwordless/smsdelivery';
import UserMetadata from 'supertokens-node/recipe/usermetadata';

export const initialiseSuperTokens = async () => {
  const { SUPER_TOKENS_CORE_URL, SUPER_TOKENS_API_KEY, API_BASE_URL, VET_PORTAL_BASE_URL } = process.env;
  const smsDelivery =
    process.env.ENV == 'production'
      ? { service: new SupertokensService(`${process.env.SUPER_TOKENS_SMS_KEY}`) }
      : undefined;
  if (SUPER_TOKENS_CORE_URL && SUPER_TOKENS_API_KEY && API_BASE_URL && VET_PORTAL_BASE_URL) {
    supertokens.init({
      framework: 'express',
      supertokens: {
        connectionURI: SUPER_TOKENS_CORE_URL,
        apiKey: SUPER_TOKENS_API_KEY
      },
      appInfo: {
        appName: 'DiscoverVet',
        apiDomain: API_BASE_URL,
        websiteDomain: VET_PORTAL_BASE_URL,
        apiBasePath: '/auth',
        websiteBasePath: '/'
      },
      recipeList: [
        Passwordless.init({
          flowType: 'USER_INPUT_CODE',
          contactMethod: 'PHONE',
          smsDelivery: smsDelivery
        }),
        Session.init(),
        Dashboard.init(),
        UserMetadata.init()
      ]
    });
  }
};
