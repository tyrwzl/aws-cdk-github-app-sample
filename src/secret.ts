import * as secretsManager from "@aws-sdk/client-secrets-manager";

const client = new secretsManager.SecretsManager({ region: "us-east-1" });

export const getSecretString = async (secretId: string) => {
  const getSecretValueCommandInput: secretsManager.GetSecretValueCommandInput = {
    SecretId: secretId,
  };
  const secretString = (await client.getSecretValue(getSecretValueCommandInput))
    .SecretString;

  if (secretString) return secretString;
  else throw new Error("Couldn't get secret binary" + secretId);
};

export const getSecretJSON = async (secretId: string) => {
  const getSecretValueCommandInput: secretsManager.GetSecretValueCommandInput = {
    SecretId: secretId,
  };
  const secretString = (await client.getSecretValue(getSecretValueCommandInput))
    .SecretString;

  if (secretString) return JSON.parse(secretString);
  else throw new Error("Couldn't get secret binary" + secretId);
};
