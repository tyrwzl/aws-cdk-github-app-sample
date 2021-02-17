import { Handler } from "aws-lambda";
import { createProbot } from "probot";

import * as secrets from "./secret";
import { app } from "./app";

export const handler: Handler = async (event, context) => {
  try {
    // Node.js イベントループが空になるまで待機せずに、コールバックが実行されるとすぐにレスポンスが送信されます。
    context.callbackWaitsForEmptyEventLoop = false;

    // Probot の初期化
    const secret = await secrets.getSecretJSON("githubapp-secret-strings");
    const cert = await secrets.getSecretString("githubapp-private-key");
    const probot = createProbot({
      overrides: {
        appId: secret["APP_ID"],
        secret: secret["WEBHOOK_SECRET"],
        privateKey: cert,
      },
    });
    await probot.load(app);

    await probot.webhooks.verifyAndReceive({
      id:
        event.headers["X-GitHub-Delivery"] ||
        event.headers["x-github-delivery"],
      name: event.headers["X-GitHub-Event"] || event.headers["x-github-event"],
      signature:
        event.headers["X-Hub-Signature-256"] ||
        event.headers["x-hub-signature-256"],
      payload: JSON.parse(event.body),
    });

    return {
      statusCode: 200,
      body: '{"ok":true}',
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: error.status || 500,
      error: "ooops",
    };
  }
};
