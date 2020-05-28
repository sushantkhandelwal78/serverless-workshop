# SLS-API using CDK Python

Use the `Python CDK` to quickly assemble your AWS infrastructure and show you how easy to configure your cloud resources, manage permissions, connect event sources and even build and publish your own constructs.

1. Creating a CDK Application
2. Activating the Virtualenv & Project Directory
3. Synthesize, Bootstrapping, then Deployment
4. Modeling DynamoDB
5. Creating a Lambda function
6. Lambda permission settings
7. Build API Gateway
8. DNS settings
9. Cleanup

* [x] 1. Using `cdk init` to create a new Python CDK project:

```bash
mkdir sls-api
cd sls-api
cdk init sample-app --language=python
```

* [x] 2. Create and source a Python virtualenv on MacOS and Linux, and install python dependencies:

```bash
## Manually create a virtualenv on MacOS and Linux:
# python3 -m venv .env

## Activate your virtualenv.
source .env/bin/activate
## Windows
# % .env\Scripts\activate.bat

## Install the required dependencies.
pip install -r requirements.txt
# pip search aws-cdk.aws | awk '{print $1}' > reqs.txt && pip install --upgrade -r reqs.txt
```

```
pip install --upgrade aws-cdk.aws_dynamodb
pip install --upgrade aws-cdk.aws-lambda
pip install --upgrade aws-cdk.aws_apigateway

pip install --upgrade aws-cdk.core
pip install --upgrade aws-cdk.aws_route53
pip install --upgrade aws-cdk.aws_route53_targets
pip install --upgrade aws-cdk.aws_certificatemanager
pip install --upgrade aws-cdk.aws_ec2
pip install --upgrade aws-cdk.aws_ecs

pip install --upgrade cdk-watchful
```

* [x] 3. Synthesize, Bootstrapping, then Deployment

> [x] Synthesize a template from your app

```
cdk synth
```

This template includes a bunch of resources:

* **AWS::SQS::Queue** - our queue
* **AWS::SNS::Topic** - our topic
* **AWS::SNS::Subscription** - the subscription between the queue and the topic
* **AWS::SQS::QueuePolicy** - the IAM policy which allows this topic to send messages to the queue

> Bootstrapping an environment

```
cdk bootstrap

# export ACCOUNT_ID=$(aws sts get-caller-identity --output text --query Account)
# export AWS_REGION=$(curl -s 169.254.169.254/latest/dynamic/instance-identity/document | jq -r '.region')
# cdk bootstrap aws://$ACCOUNT_ID/$AWS_REGION

cdk deploy
```

=====

### 3. Creating a Lambda function

> **Lambda permission settings**

### 4. Build API Gateway

### 5. DNS settings

### 6. Cleanup


### 7. Useful commands

 * `cdk ls`          list all stacks in the app
 * `cdk synth`       emits the synthesized CloudFormation template
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk docs`        open CDK documentation

### 8. References

* [x] [CDK Workshop](https://cdkworkshop.com)
* [x] [the Infrastructure is Code with the AWS CDK](https://youtu.be/ZWCvNFUN-sU)
* [x] [url-shortener](https://github.com/aws-samples/aws-cdk-examples/tree/master/python/url-shortener) 

Enjoy!
