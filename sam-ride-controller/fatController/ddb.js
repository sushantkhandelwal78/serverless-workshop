'use strict'

/*
  Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
  Permission is hereby granted, free of charge, to any person obtaining a copy of this
  software and associated documentation files (the "Software"), to deal in the Software
  without restriction, including without limitation the rights to use, copy, modify,
  merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
  PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.AWS_REGION })
const documentClient = new AWS.DynamoDB.DocumentClient()

const masterTable = process.env.DDBtable

// Updates ride in the table
const saveMessage = async (msg) => {
  // console.log('saveMessage to messaging table')
  // return new Promise((resolve, reject) => {
  //   const params = {
  //     TableName: messagingTable,
  //     Item: {
  //       'ride-times': 'summary',
  //       msg: JSON.stringify(msg)
  //     }
  //   }
  //   documentClient.put(params, function(err, data) {
  //     if (err) {
  //       console.error('updateRide error: ', err)
  //       reject(err)
  //     } else {
  //       resolve(data)
  //     }
  //   })
  // })
}

// Get all rides from the table
const getRides = async () => {
  const result = await documentClient.scan({
    TableName: masterTable
  }).promise()
  return result.Items
}

// Updates ride in the table
const updateRide = async (ride) => {
  
  ride.lastUpdated = Date.now()

  await documentClient.put({
    TableName: masterTable,
    Item: ride
  }).promise()
}

module.exports = { getRides, updateRide, saveMessage }
