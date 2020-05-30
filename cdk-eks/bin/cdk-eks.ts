#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkEksStack } from '../lib/cdk-eks-stack';


const app = new cdk.App();

const env = {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT
  };

// new CdkEksStack(app, 'CdkEksStack', {
//     env: {
//         region: process.env.AWS_REGION,
//         account: process.env.AWS_ACCOUNT_ID
//     }
// });
  
const cdkEksStack = new CdkEksStack(app, 'CdkEksStack', { env })
