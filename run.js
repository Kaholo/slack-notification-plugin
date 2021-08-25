require('dotenv').config();

const sendNotification = require('./src/index.js')

const params = {
  pipeline: {
    name: 'Example pipline',
    id: 'ddd'
  },
  startTime: new Date(), // Date
  executionId: `id ${Math.random()}`,
  process: {
    name: 'Example process',
    id: 'ddd'
  },
  action: {
    name: 'Example action',
    id: 'ddd'
  },
  message: 'Test message',
  type: 'ERROR', // ERROR, FINISHED, STARTED, PENDING etc.
}

sendNotification(params, {
  WEB_HOOK_URL: process.env.WEB_HOOK_URL
});