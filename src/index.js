const fetch = require('node-fetch');

function sendNotification(params, settings) {
  const url = settings.WEB_HOOK_URL;

  if (!url) {
    return Promise.reject("Web hook url must be defined");
  }

  const {
    pipeline, // {name, id}
    startTime, // Date
    executionId,
    process, // {name, id}
    action: kaholoAction, // {name, id}
    message,
    type, // ERROR, FINISHED, STARTED, PENDING etc.
  } = params;


  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      text: `KAHOLO NOTIFICTION:
        Pipeline ${pipeline.name} (${pipeline.id})
        Start Time: ${startTime.toString().substring(0, 10)})
        Execution Id: ${executionId},
        type: ${type},
        message: ${message},
        process: ${process.name} (${process.id})
        action: ${kaholoAction.name} (${kaholoAction.id})
      `
    })
  });
}

module.exports = sendNotification;