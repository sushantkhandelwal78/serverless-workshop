+++
title = "Deploy the App"
weight = 20
pre= "<b>4.3.2. </b>"
+++

#### 🎯 2. Deploy Your Application to the AWS Cloud

The `sam deploy` command deploys your application by launching a CloudFormation stack. This command has a guided interactive mode, which you enable by specifying the _--guided_ parameter. It is recommended to deploy with guided mode for the first time as it will capture the configuration for future deployments.

Run the following command in the same directory level where the _template.yaml_ is located:

```bash
sam deploy --guided
```

It will ask for certain input parameters, like so: 

![SAM Deploy](/images/sam/screenshot-sam-deploy-guided.png)

### Confirm deployment

At some point, SAM will ask for deployment confirmation. This is possible because it first creates a CloudFormation ChangeSet, and then it asks for confirmation to execute it. This is kind of like a _dry run deployment_ and is a best practice when doing deployments via CloudFormation. Type `y` to confirm.

![SAM Deploy](/images/sam/screenshot-sam-deploy-guided-2.png)

### Deployment completed
This command might take a few minutes to finish because it is creating the resources (Lambda function, API Gateway and IAM roles) on the AWS account. When it completes successfully, you should see an output similar to the following:

![SAM Deploy](/images/sam/screenshot-sam-deploy.png)

### What just happened?

The guided deployment does few things for you. Let's take a quick look at what happened under the hood during the guided deployment to understand this process better.

**1)** Your codebase gets packaged in a zip file.  
**2)** SAM creates an S3 bucket in your account, if it doesn't already exist.  
**3)** Zip file is uploaded to the S3 bucket.  
**4)** SAM creates the [packaged template](/manualdeploy/bucket.html) that references the location of the zip file on S3.  
**5)** This template is also uploaded to the S3 bucket.  
**6)** SAM starts the deployment via CloudFormation ChangeSets.  

The first time you do a guided deployment, a new file `samconfig.toml` is created in the root of your project with your specified deployment parameters, this is so that the next time you execute `sam deploy`, it uses the same parameters without having you to enter them again.

```yaml
version = 0.1
[default]
[default.deploy]
[default.deploy.parameters]
stack_name = "sls-api"
s3_bucket = "aws-sam-cli-managed-default-samclisourcebucket-6pzkbga99265"
s3_prefix = "sls-api"
region = "ap-southeast-1"
confirm_changeset = true
capabilities = "CAPABILITY_IAM"
```

If you want to learn more about guided deployments and the samconfig.toml file, here is a good Blog Post: https://aws.amazon.com/blogs/compute/a-simpler-deployment-experience-with-aws-sam-cli. 