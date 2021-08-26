const fetch = require('node-fetch');

function formatDate(date) {
  if (!date) {
    return '';
  }

  return `${date.toISOString().substring(0, 10)} ${date.toISOString().substring(11,16)}`;
}

function sendNotification(params, settings) {
  const url = settings.WEB_HOOK_URL;

  if (!url) {
    return Promise.reject("Web hook url must be defined");
  }

  const {
    pipeline, // {name, id}
    startTime, // Date
    finishTime, // Date
    executionId,
    process, // {name, id}
    action, // {name, id}
    message,
    type, // ERROR, FINISHED, STARTED, PENDING etc.
  } = params;


  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      text: `KAHOLO NOTIFICTION:
        Pipeline: ${pipeline.name} (${pipeline.id})
        Start Time: ${formatDate(startTime)}
        Finish Time: ${formatDate(finishTime)}
        Execution Id: ${executionId},
        type: ${type},
        message: ${message},
        process: ${process?.name} (${process?.id})
        action: ${action?.name} (${action?.id})
      `
    })
  });
}

module.exports = sendNotification;