import json
import pytest

from aws_cdk import core
from sls_api.sls_api_stack import SlsApiStack


def get_template():
    app = core.App()
    SlsApiStack(app, "sls-api")
    return json.dumps(app.synth().get_stack("sls-api").template)


def test_sqs_queue_created():
    assert("AWS::SQS::Queue" in get_template())


def test_sns_topic_created():
    assert("AWS::SNS::Topic" in get_template())
