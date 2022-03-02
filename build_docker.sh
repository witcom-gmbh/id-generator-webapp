#!/bin/bash
#optional per cli argument
dockerRepo=${1:-witcom/id-generator-webapp}

cd /tmp
git clone https://github.com/witcom-gmbh/id-generator-webapp.git
cd id-generator-webapp

#ab hier nix mehr machen
buildName=$(jq -r .name package.json)
buildVersion=$(jq -r .version package.json)

s2i build . registry.redhat.io/ubi8/nodejs-12 ${buildName}-builder:latest -e OUTPUT_DIR=dist/${buildName}

SRC_DIR=$(mktemp -d)
build_cid=$(docker create ${buildName}-builder:latest)

docker cp $build_cid:/opt/app-root/src/dist/${buildName}/. $SRC_DIR
docker rm $build_cid

s2i build $SRC_DIR registry.redhat.io/ubi8/nginx-120:latest ${buildName}-webapp:latest

docker tag ${buildName}-webapp:latest ${dockerRepo}:latest
docker tag ${buildName}-webapp:latest ${dockerRepo}:${buildVersion}

#push
docker push ${dockerRepo}:latest
docker push ${dockerRepo}:${buildVersion}

#cleanup
docker rmi ${buildName}-builder:latest

docker rmi ${dockerRepo}:latest
docker rmi ${dockerRepo}:${buildVersion}
docker rmi ${buildName}-webapp:latest
rm -rf $SRC_DIR

cd ..
rm -rf witcom-portal