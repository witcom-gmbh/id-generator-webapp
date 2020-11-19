def dockerRepo = 'pub-registry.dev.witcom.services/witcom/id-generator-webapp'
def gitRepo = 'https://github.com/witcom-gmbh/id-generator-webapp'
def approvalRequired = false;
def getSource = true;
def packageJSONVersion = "UNKNOWN";
def buildName = "UNKNOWN";
def branchName = "master"
pipeline {
    agent none

    stages {
        stage('Clone if no pull-request'){
            when {
                expression { env.CHANGE_ID == null }
            }
            agent { label 'master' }
            steps {
                echo "do a clone"
                git credentialsId: 'witcom-jenkins-bot', url: "${gitRepo}",branch:"${branchName}"
                script {
                    env.BRANCH_NAME=branchName;
                }
            }
        }
        stage('Init'){
            agent { label 'master' }
            steps {
                script {
				    def packageJSON = readJSON file: 'package.json'
				    packageJSONVersion = packageJSON["version"]
                    buildName = packageJSON.name
				}
				echo packageJSONVersion
				dir('./openshift') {
                    stash name:"openshiftbc",includes:"*.yaml"
				}
            }
        }
        stage('Building application'){
            agent { label 'master' }
            steps {
                unstash name:"openshiftbc"
                script {
                    openshift.withCluster() {
                        openshift.withProject() {

                            //delete existing buildconfig
                            def existingBC = openshift.selector('bc', [build: "${buildName}-builder"])
                            if(existingBC){
                                existingBC.delete();
                            }

                            def created = openshift.newBuild("openshift/nodejs-10~${gitRepo}#${env.BRANCH_NAME}","-e OUTPUT_DIR=dist/id-generator-webapp","--name=${buildName}-builder" )
                            echo "new-app created ${created.count()} objects named: ${created.names()}"
                            created.describe()
                            //def builds = created.related('builds')
                            //echo builds
                            def bc = openshift.selector('bc', [build: "${buildName}-builder"])
                            echo "Found ${bc.count()} buildconfigs - expecting 1"
                            def blds = bc.related('builds')
                            timeout(10) {
                                blds.untilEach() { // We want a minimum of 1 build
                                    return it.object().status.phase == "Complete"
                                }
                            }

                            //take builder image and copy output to nginx-runtime-builder
                            //create runtime-image-stream
                            def runtimeImage = [
                                "kind": "ImageStream",
                                "apiVersion": "image.openshift.io/v1",
                                "metadata": [
                                    "name": "${buildName}-runtime",
                                    "labels": [
                                        "build":"${buildName}-runtime"
                                    ]
                                ]
                            ]
                            def existingIS = openshift.selector('is', [build: "${buildName}-runtime"])
                            if(existingIS){
                                existingIS.delete();
                            }
                            def objs = openshift.create( runtimeImage )
                            objs.describe()

                            //delete existing buildconfig
                            existingBC = openshift.selector('bc', [build: "${buildName}-runtime"])
                            if(existingBC){
                                existingBC.delete();
                            }
                            def runtimebc = readYaml file: './openshift-runtime-bc.yaml'
                            runtimebc.spec.output.to.name = "${buildName}-runtime:latest"
							runtimebc.spec.source.images[0].from.name = "${buildName}-builder:latest"
                            runtimebc.metadata.name = "${buildName}-runtime"
							runtimebc.metadata.labels["build"]= "${buildName}-runtime"
                            timeout(time: 10, unit: 'MINUTES') {
                                def fromYaml = openshift.create( runtimebc )
                                echo "Created Buildconfig: ${fromYaml.names()}"

                                fromYaml.startBuild();
                                echo "Found ${fromYaml.count()} buildconfigs - expecting 1"
                                def rtblds = fromYaml.related('builds')
                                rtblds.untilEach() {
                                    return it.object().status.phase == "Complete"
                                }
                            }
                            //clean-up
                            //delete existing builder-buildconfig
                            existingBC = openshift.selector('bc', [build: "${buildName}-builder"])
                            if(existingBC){
                                existingBC.delete();
                            }
                            /*
                            existingIS = openshift.selector('is', [build: "${buildName}-builder"])
                            if(existingIS){
                                existingIS.delete();
                            }*/
                        }
                    }
                }

            }
        }
		stage('Deploying application for test'){
            when {
                expression { env.BRANCH_NAME != 'master' }
            }
            agent { label 'master' }
            steps {
                echo "We could test something here"
                script {
                    openshift.withCluster() {
                        openshift.withProject() {
                            //take builder image and copy output to nginx-runtime-builder
                            //create runtime-image-stream
                            def runtimeImage = [
                                "kind": "ImageStream",
                                "apiVersion": "image.openshift.io/v1",
                                "metadata": [
                                    "name": "${buildName}-runtime",
                                    "labels": [
                                        "build":"${buildName}-runtime"
                                    ]
                                ]
                            ]
                            def existingIS = openshift.selector('is', [build: "${buildName}-runtime"])
                            if(existingIS){
                                existingIS.delete();
                            }
                            def objs = openshift.create( runtimeImage )
                            objs.describe()

                            //delete existing buildconfig
                            def existingBC = openshift.selector('bc', [build: "${buildName}-runtime"])
                            if(existingBC){
                                existingBC.delete();
                            }
                            def runtimebc = readYaml file: './openshift-runtime-bc.yaml'
                            runtimebc.spec.output.to.name = "${buildName}-runtime:latest"
							runtimebc.spec.source.images[0].from.name = "${buildName}-builder:latest"
                            runtimebc.metadata.name = "${buildName}-runtime"
							runtimebc.metadata.labels["build"]= "${buildName}-runtime"
                            timeout(time: 10, unit: 'MINUTES') {
                                def fromYaml = openshift.create( runtimebc )
                                echo "Created Buildconfig: ${fromYaml.names()}"

                                fromYaml.startBuild();
                                echo "Found ${fromYaml.count()} buildconfigs - expecting 1"
                                def rtblds = fromYaml.related('builds')
                                rtblds.untilEach() {
                                    return it.object().status.phase == "Complete"
                                }
                            }

						}
					}
				}
				/*
				script {
						    def userInput
						    try {
							    userInput = input(
								id: 'Proceed1', message: 'Waren die Tests erfolgreich ?', parameters: [
								[$class: 'BooleanParameterDefinition', defaultValue: true, description: '', name: 'Bitte bestaetigen']
								])
						    } catch(err) { // input false
							    userInput = false
							    echo "This Job has been Aborted"
						    }
						    if (userInput != true) {
							    throw "Pull-request not confirmed"
						    }
				}
				*/
                script {
                    openshift.withCluster() {
                        openshift.withProject() {
                            def existingIS = openshift.selector('is', [build: "${buildName}-runtime"])
                            if(existingIS){
                                existingIS.delete();
                            }
                            //delete existing buildconfig
                            def existingBC = openshift.selector('bc', [build: "${buildName}-runtime"])
                            if(existingBC){
                                existingBC.delete();
                            }
						}
					}
				}
			}
		}
		stage('Deploying images to public registry'){
            when {
                expression { env.BRANCH_NAME == 'master' }
            }
            agent { label 'master' }

            steps {
				unstash name:"openshiftbc"
			    //deploy version-tagged-image
                script {
                    openshift.withCluster() {
                        openshift.withProject() {
                            //take builder image and copy output to nginx-runtime-builder
                            //delete existing buildconfig
                            def existingBC = openshift.selector('bc', [build: "${buildName}-runtime"])
                            if(existingBC){
                                existingBC.delete();
                            }
                            def runtimebc = readYaml file: './openshift-runtime-bc.yaml'
							runtimebc.spec.output = []
							runtimebc.spec.output.to.kind = "DockerImage"
                            runtimebc.spec.output.to.name = "${dockerRepo}:${packageJSONVersion}"
							runtimebc.spec.output.pushSecret.name = "nexus-dev"
							runtimebc.spec.source.images[0].from.name = "${buildName}-builder:latest"
                            runtimebc.metadata.name = "${buildName}-runtime"
							runtimebc.metadata.labels["build"]= "${buildName}-runtime"
                            timeout(time: 10, unit: 'MINUTES') {
                                def fromYaml = openshift.create( runtimebc )
                                echo "Created Buildconfig: ${fromYaml.names()}"

                                fromYaml.startBuild();
                                echo "Found ${fromYaml.count()} buildconfigs - expecting 1"
                                def rtblds = fromYaml.related('builds')
                                rtblds.untilEach() {
                                    return it.object().status.phase == "Complete"
                                }
								echo "Deleting the buildconfig....."
                                fromYaml.delete()
                            }

						}
					}
				}
			    //deploy latest-tagged-image
                script {
                    openshift.withCluster() {
                        openshift.withProject() {
                            //take builder image
                            //delete existing buildconfig
                            def existingBC = openshift.selector('bc', [build: "${buildName}-runtime"])
                            if(existingBC){
                                existingBC.delete();
                            }
                            def runtimebc = readYaml file: './openshift-runtime-bc.yaml'
							runtimebc.spec.output = []
							runtimebc.spec.output.to.kind = "DockerImage"
                            runtimebc.spec.output.to.name = "${dockerRepo}:latest"
							runtimebc.spec.output.pushSecret.name = "nexus-dev"
							runtimebc.spec.source.images[0].from.name = "${buildName}-builder:latest"
                            runtimebc.metadata.name = "${buildName}-runtime"
							runtimebc.metadata.labels["build"]= "${buildName}-runtime"
                            timeout(time: 10, unit: 'MINUTES') {
                                def fromYaml = openshift.create( runtimebc )
                                echo "Created Buildconfig: ${fromYaml.names()}"

                                fromYaml.startBuild();
                                echo "Found ${fromYaml.count()} buildconfigs - expecting 1"
                                def rtblds = fromYaml.related('builds')
                                rtblds.untilEach() {
                                    return it.object().status.phase == "Complete"
                                }
								echo "Deleting the buildconfig....."
                                fromYaml.delete()
                            }

						}
					}
				}
			}
		}
		stage('Clean-Up'){
            agent { label 'master' }
            steps {
                script {
                    openshift.withCluster() {
                        openshift.withProject() {
                            def existingIS = openshift.selector('is', [build: "${buildName}-builder"])
                            if(existingIS){
                                existingIS.delete();
                            }
						            }
					          }
				        }
			      }
		}
  }
}
