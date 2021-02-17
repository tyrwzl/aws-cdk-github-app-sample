# aws-cdk-github-app-sample

Sample project of GitHub App using AWS CDK (API Gateway + Lambda).

See detail: https://note.com/tyrwzl/n/nbb4889f28c34 (Sorry, Japanese only)
inspired by: https://github.com/probot/example-aws-lambda-serverless

## Secrets Manager

To store GitHub secrets, this project uses AWS Secrets Manager.
`secrets.sh` provides useful script.

## Deploy

```
$ cdk deploy
```
