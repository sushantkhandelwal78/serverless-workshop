## Amazon EKS with AWS CDK

This project aims to help you provision a ready-to-use **Amazon EKS** `cluster`, a default `NodeGroup` and *Kubernetes resources* by simply `cdk deploy` with **AWS** Cloud Development Kit (**CDK**).


## 1.1. Deploy in a new VPC `AWS_REGION` (default)

> Make sure you have `nodejs` and `npm` installed.

```bash
# git clone the project
git clone https://github.com/nnthanh101/sls-app.git

cp -avr sls-app/cdk-eks/ ~/environment/
cd ~/environment/cdk-eks

# install other required npm modules
npm i

# cdk bootstrapping (only required for the 1st time)
cdk bootstrap

# cdk diff to see what will be created
cdk diff

# cdk deploy
cdk deploy
```


## 1.2. Deploy in another `AWS_REGION`

```bash
# only for the first time in this region
AWS_REGION=ap-southeast-2 cdk bootrap
# cdk diff
AWS_REGION=ap-southeast-2 cdk diff
AWS_REGION=ap-southeast-2 cdk depoy
```


## 1.3. Deploy in any existing VPC

```bash
# To deploy in the default vpc
cdk diff -c use_default_vpc=1
# To deploy in a specific VPC ID
cdk diff -c use_vpc_id=vpc-123456
```


## Features

- [x] Creates both Amazon EKS `cluster` and `NodeGroup` in a single cloudformatoin template with nested stacks.
- [x] Fully support the latest **Autoscaling Group** features to hybrid on-demand and spot instances with mixed types and purchase options.
- [x] The **Cloudformation** stack will help you automate the configuration on `aws-auth-cm` **ConfigMap** with AWS Lambda-backed `custom resource`.
- [x] Support [**awslabs/amazon-eks-serverless-drainer**](https://github.com/awslabs/amazon-eks-serverless-drainer) to help you `drain` the pods on terminating spot instances to protect your online workload. 
- [x] On-demand instances will have node label **lifecycle=OnDemand**
- [x] Spot instances will have node label **lifecycle=Ec2Spot** and a **spotInstance=true:PreferNoSchedule** taint 


## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
