from aws_cdk import (
    aws_iam as iam,
    aws_sqs as sqs,
    aws_sns as sns,
    aws_sns_subscriptions as subs,
    core
)

from aws_cdk import aws_dynamodb, aws_lambda, aws_apigateway

class SlsApiStack(core.Stack):

    def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        queue = sqs.Queue(
            self, "SlsApiQueue",
            visibility_timeout=core.Duration.seconds(300),
        )

        topic = sns.Topic(
            self, "SlsApiTopic"
        )

        topic.add_subscription(subs.SqsSubscription(queue))

        ## S1. Define the table that maps short codes to URLs.
        table = aws_dynamodb.Table(self, "mapping-table",
                partition_key=aws_dynamodb.Attribute(
                    name="id",
                    type=aws_dynamodb.AttributeType.STRING),
                read_capacity=10,
                write_capacity=5)

        ## S2.1. Defines Lambda resource & API-Gateway request handler
        ## All API requests will go to the same function.
        handler = aws_lambda.Function(self, "SlsApiFunction",
                            code=aws_lambda.Code.asset("./lambda"),
                            handler="handler.main",
                            timeout=core.Duration.minutes(5),
                            runtime=aws_lambda.Runtime.PYTHON_3_7)

        ## S2.2. Pass the table name to the handler through an env variable 
        ## and grant the handler read/write permissions on the table.
        table.grant_read_write_data(handler)
        handler.add_environment('TABLE_NAME', table.table_name)

        ## S3. Define the API endpoint and associate the handler
        api = aws_apigateway.LambdaRestApi(self, "SlsApiGateway",
                                           handler=handler)
