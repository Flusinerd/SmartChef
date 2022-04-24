const injectDevServer = require("@cypress/react/plugins/react-scripts");
const registerCoverageTasks = require("@cypress/code-coverage/task");
require("@cypress/instrument-cra");

module.exports = (on, config) => {
  module.exports = (on, config) => {
    on("before:browser:launch", (browser = {}, launchOptions) => {
      launchOptions.args = launchOptions.args.filter(
        (item) => item !== "--disable-gpu"
      );
      return launchOptions;
    });
  };
  if (config.testingType === "component") {
    injectDevServer(on, config);
  }
  registerCoverageTasks(on, config);
  return config;
};
