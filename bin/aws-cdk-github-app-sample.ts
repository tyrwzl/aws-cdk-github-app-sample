#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsCdkGithubAppSampleStack } from '../lib/aws-cdk-github-app-sample-stack';

const app = new cdk.App();
new AwsCdkGithubAppSampleStack(app, 'AwsCdkGithubAppSampleStack');
