import * as cdk from "@aws-cdk/core";
import * as iam from "@aws-cdk/aws-iam";
import * as lambda from "@aws-cdk/aws-lambda";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";
import * as apigateway from "@aws-cdk/aws-apigateway";

export class AwsCdkGithubAppSampleStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda に紐付ける IAM ロール
    const serviceRole = new iam.Role(this, `IAMRoleForLambdaFunction`, {
      roleName: `IAMRoleForLambdaFunction`,
      assumedBy: new iam.CompositePrincipal(
        new iam.ServicePrincipal("lambda.amazonaws.com")
      ),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSLambdaBasicExecutionRole"
        ),
      ],
      inlinePolicies: {
        inlinePolicies: iam.PolicyDocument.fromJson({
          Version: "2012-10-17",
          Statement: [
            {
              Effect: "Allow",
              Action: "secretsmanager:GetSecretValue",
              Resource: ["*"],
            },
          ],
        }),
      },
    });

    // Lambda 関数
    const lambdaFunction = new NodejsFunction(this, `LambdaFunction`, {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "handler",
      entry: "src/handler.ts",
      role: serviceRole,
      timeout: cdk.Duration.seconds(10),
    });

    // API Gateway
    const api = new apigateway.RestApi(this, "APIGateway", {
      restApiName: "APIGateway",
      description: "APIGateway",
    });

    // API Gateway と Lambda 関数の関連付け
    const eventHandlerWidgetIntegration = new apigateway.LambdaIntegration(
      lambdaFunction
    );
    api.root.addMethod("POST", eventHandlerWidgetIntegration);
  }
}
