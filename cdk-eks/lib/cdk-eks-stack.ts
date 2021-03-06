import * as cdk from '@aws-cdk/core';

import * as dotenv from 'dotenv';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as iam from '@aws-cdk/aws-iam';
import * as eks from '@aws-cdk/aws-eks';
import { InstanceType, Vpc } from '@aws-cdk/aws-ec2';

export class CdkEksStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    
    dotenv.config();

    /**
     * Step 1. use an existing VPC or create a new one for our EKS Cluster
     */  
    const vpc = getOrCreateVpc(this);
    
    /**
    * Step 2. Create a new EKS Cluster
    */  
    
    // IAM role for our EC2 worker nodes
    const clusterAdmin = new iam.Role(this, 'EKS-AdminRole', {
      assumedBy: new iam.AccountRootPrincipal()
    });

    var cluster_name = process.env.EKS_CLUSTER_NAME || "EKS-Cluster";
    // console.log(`cluster_name is ${process.env.EKS_CLUSTER_NAME}`);

    /** Create the cluster 
    * and a default managed NodeGroup of 2 x m5.large EC2-instances */
    const cluster = new eks.Cluster(this, cluster_name, {
      clusterName: cluster_name,
      vpc,
      defaultCapacity: 1,
      mastersRole: clusterAdmin,
      outputClusterName: true,
      version: '1.16',
    });
    
    /** Conditionally create spot instances */
    // if(this.node.tryGetContext('with_spot_instances') === 'yes'){
      // Create 2 * t3.large EC2 Spot instances
      cluster.addCapacity('Spot', {
        maxCapacity: 2,
        spotPrice: '0.04',
        instanceType: new InstanceType('t3.large'),
        bootstrapOptions: {
          kubeletExtraArgs: '--node-labels foo=bar'
        },
      })      
    // };
    
    /** Conditionally add the 2nd NodeGroup */
    // if(this.node.tryGetContext('with_2nd_nodegroup') === 'yes'){
      // Create 2nd NodeGroup
      cluster.addNodegroup('NodeGroup2', {
        desiredSize: 1,
        nodegroupName: 'NodeGroup2',
        instanceType: new InstanceType('t3.large'),
      })      
    // };
    
    /** conditionally create service account for a pod */
    // if(this.node.tryGetContext('with_irsa') === 'yes'){
    //   const sa = cluster.addServiceAccount('MyServiceAccount', {});
  
    //   cluster.addResource('mypod', {
    //     apiVersion: 'v1',
    //     kind: 'Pod',
    //     metadata: { name: 'mypod' },
    //     spec: {
    //       serviceAccountName: sa.serviceAccountName,
    //       containers: [
    //         {
    //           name: 'main',
    //           image: 'springio/gs-spring-boot-docker',
    //           ports: [{ containerPort: 5000 }],
    //         }
    //       ]
    //     }
    //   });
      
    //   new cdk.CfnOutput(this, 'SARoleArn', { value: sa.role.roleArn })
    // };
    
    /** conditionally create a fargate profile */
    // if(this.node.tryGetContext('with_fargate_profile') === 'yes'){
    //   const profile = cluster.addFargateProfile('FargateProfile', {
    //     selectors: [
    //       { namespace: 'default' }
    //       ]
    //   });
      
    //   profile.fargateProfileName
      
    //   new cdk.CfnOutput(this, 'FargareProfileName', { value: profile.fargateProfileName })
    // };
    
  }
}

/**
 * Step 1. use an existing VPC or create a new one for our EKS Cluster
 * 
 * Note: only 1 NAT Gateway --> Cost Optimization trade-off
 */ 
function getOrCreateVpc(stack: cdk.Stack): ec2.IVpc {
  
  var vpc_name = process.env.AWS_VPC_NAME || "EKS-VPC";
  var vpc_cidr = process.env.AWS_VPC_CIDR || "10.10.0.0/16";
  // console.log(`vpc_name is ${process.env.AWS_VPC_NAME}`);
  // console.log(`vpc_cidr is ${process.env.AWS_VPC_CIDR}`);
  
  // use an existing VPC or create a new one
  const vpc = stack.node.tryGetContext('use_default_vpc') === '1' ?
    ec2.Vpc.fromLookup(stack, vpc_name, { isDefault: true }) :
    stack.node.tryGetContext('use_vpc_id') ?
      ec2.Vpc.fromLookup(stack, vpc_name, 
              { vpcId: stack.node.tryGetContext('use_vpc_id') }) :
      new ec2.Vpc(stack, vpc_name, 
              { cidr: vpc_cidr,
                maxAzs: 2,
                natGateways: 1,
                subnetConfiguration: [
                  {  cidrMask: 24, subnetType: ec2.SubnetType.PUBLIC,  
                     name: "PublicDMZ"  },
                  {  cidrMask: 24, subnetType: ec2.SubnetType.PRIVATE, 
                     name: "PrivateServices" } ]
              });  
      
  return vpc
}
