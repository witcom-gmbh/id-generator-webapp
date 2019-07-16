# ID Generator Web-Application

Simple Web-Application for https://github.com/witcom-gmbh/id-generator

## Configuration
The application is configured from ENV-Variables at build/compile time. The angular environment-files src/environments/.. are generated
by the set-env.ts script.

Following ENV-Variables are required

```
KEYCLOAK_SERVER_URL=https://KEYCLOAK-FQDN/auth
KEYCLOAK_REALM=REALM
KEYCLOAK_RESOURCE_ID=RESOURCE-ID
API_GENERATOR_URL=URL-TO-ID-GENERATOR-API
``` 

## Deyploying on OpenShift 
The application can be deployed on openshift with the template-file openshift-template.yaml. The templates features

* Chained build of the angular webapp. The runtime is a static webapp runnign on Nginx
* Route with lets-encrpyt-certificate (requires tls-acme-controller)



