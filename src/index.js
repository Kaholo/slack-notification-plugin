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

  // Expected structure, defined as followed:
  // {
  //   actions: [{
  //       processName,
  //       mandatory,
  //       pluginName,
  //       pluginVersion,
  //       result,
  //       status,
  //       startTime,
  //       finishTime
  //   }]
  //   pipeline: {
  //       id,
  //       executionId,
  //       name,
  //       agentName,
  //       notificationsLevel,
  //       status,
  //       reason,
  //       trigger,
  //       startTime,
  //       finishTime
  //   }
  // }

  const {
    pipeline,
    actions
  } = params;


  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      text: `KAHOLO NOTIFICTION:
        Pipeline: ${pipeline.name} (${pipeline.id})
        Agent: ${pipeline.agentName}
        Trigger: ${pipeline.trigger}
        Reason: ${pipeline.reason}
        Start Time: ${formatDate(pipeline.startTime)}
        Finish Time: ${formatDate(pipeline.finishTime)}
        Execution Id: ${pipeline.executionId},
        Notification level: ${pipeline.notificationsLevel},
        message: ${actions.map((action) => (
          `Process: ${action.processName}
            Action: ${action.mandatory ? "mandatory, " : ""} status: ${action.status}
              started: ${formatDate(action.startTime)}, finished: ${formatDate(action.finishTime)}
              plugin: ${action.pluginName}, version: ${action.pluginVersion}

              Result: ${action.result}
          `
        )).join("\n")},
      `
    })
  });
}

module.exports = sendNotification;