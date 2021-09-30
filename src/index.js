const fetch = require('node-fetch');

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
    isAnyError
  } = params;


  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      attachments: [
        {
          fallback: `Kaholo CI job ${pipeline.name} ${isAnyError ? "failed" : "succeeded"}`,
          color: isAnyError ? "#d20000" : "#98cd68",
          pretext: `Kaholo CI job ${isAnyError ? "failed" : "succeeded"}`,
          title: pipeline.name,
          title_link: `http://ci.kaholo.io/maps/${pipeline.id}/results/${pipeline.executionId}`,
          footer: "Kaholo CI",
          ts: new Date().getTime(),
        }
      ]
    })
  });
}

module.exports = sendNotification;
