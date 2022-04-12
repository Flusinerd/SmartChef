const injectDevServer = require("@cypress/react/plugins/react-scripts");
const registerCoverageTasks = require("@cypress/code-coverage/task");
require("@cypress/instrument-cra");

module.exports = (on, config) => {
  if (config.testingType === "component") {
    injectDevServer(on, config);
  }
  registerCoverageTasks(on, config);
  return config;
};
