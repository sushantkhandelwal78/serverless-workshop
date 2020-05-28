#!/usr/bin/env python3

from aws_cdk import core

from sls_api.sls_api_stack import SlsApiStack


app = core.App()
SlsApiStack(app, "sls-api", env={'region': 'ap-southeast-1'})

app.synth()
