import { writeFile } from 'fs';
import { argv } from 'yargs';

// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();

// Would be passed to script like this:
// `ts-node set-env.ts --environment=dev`
// we get it from yargs's argv object
const environment = argv.environment;
const isProd = environment === 'prod';

const configPath = `./src/assets/configdata/appconfig.json`;
let configFile=`{}`;
if(!isProd){
configFile = `{
"APP_KEYCLOAK_URL":"${process.env.KEYCLOAK_SERVER_URL}",
"APP_KEYCLOAK_REALM":"${process.env.KEYCLOAK_REALM}",
"APP_KEYCLOAK_RESOURCE_ID":"${process.env.KEYCLOAK_RESOURCE_ID}",
"APP_KEYCLOAK_CLIENT_ID":"${process.env.KEYCLOAK_CLIENT_ID}",
"APP_API_URL":"${process.env.API_GENERATOR_URL}"
}
`
}

const targetPath = `./src/environments/environment.${environment}.ts`;
const envConfigFile = `
import {  NgxLoggerLevel } from 'ngx-logger';

let LOGGER_CONFIG = {
    //serverLoggingUrl: '/api/logs',
    level: NgxLoggerLevel.DEBUG,
    serverLogLevel: NgxLoggerLevel.OFF
};

export const environment = {
  production: ${isProd},
  loggerConfig:LOGGER_CONFIG
};
`

writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  }
  console.log(`ENV-Output generated at ${targetPath}`);
});

writeFile(configPath, configFile, function (err) {
  if (err) {
    console.log(err);
  }
  console.log(`Config-File generated at ${configPath}`);
});
