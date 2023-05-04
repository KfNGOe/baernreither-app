//Import Node.js SDK in your node application from http://api.groupdocs.cloud
global.groupdocs_conversion_cloud = require("groupdocs-conversion-cloud");
global.fs = require("fs");

// get clientId and clientSecret from https://dashboard.groupdocs.cloud (free registration is required).
global.clientId = "xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
global.clientSecret = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
global.myStorage = "test-internal-storage";
const config = new groupdocs_conversion_cloud.Configuration(clientId, clientSecret);
config.apiBaseUrl = "https://api.groupdocs.cloud";