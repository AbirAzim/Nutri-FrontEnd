const awsConfig = {
  aws_project_region: process.env.NEXT_PUBLIC_AWS_REGION, // REGION
  aws_cognito_region: process.env.NEXT_PUBLIC_AWS_COGNITO_REGION, // REGION
  aws_user_pools_id: process.env.NEXT_PUBLIC_AWS_COGNITO_POOL_ID, // ENTER YOUR USER POOL ID
  aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_AWS_APP_CLIENT_ID, // ENTER YOUR CLIENT ID
  oauth: {
    domain: process.env.NEXT_PUBLIC_OAUTH_DOMAIN, // ENTER COGNITO DOMAIN LIKE: eru-test-pool.auth.eu-west-1.amazoncognito.com
    scope: ["phone", "email", "openid", "profile"],
    redirectSignIn: `${process.env.NEXT_PUBLIC_REDIRECT_SIGN}`, // ENTER YOUR SITE (enter http://localhost:8000 if testing frontend locally)
    redirectSignOut: `${process.env.NEXT_PUBLIC_REDIRECT_SIGN}/login`, // ENTER YOUR SITE (enter http://localhost:8000 if testing frontend locally)
    responseType: "code",
  },
  federationTarget: "COGNITO_USER_POOLS",
};
export default awsConfig;
