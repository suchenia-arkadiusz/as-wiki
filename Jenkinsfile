pipeline {
    agent none
    
    stages {
        stage('NODE') {
            agent {
                docker {
                    image 'node:18.17.1-alpine'
                }
            }
            stages {
                stage('UI Build') {
                    steps {
                        sh '''
                        cd ui
                        npm install
                        npm run eslint
                        npm run build
                        '''
                    }
                }
                stage('UI Test') {
                    steps {
                        sh '''
                        cd ui
                        npm run test
                        npm run test:coverage
                        '''
                    }
                }
            }
        }
        stage('DOCKER') {
            agent {
                label 'amd64'
            }
            environment {
                GITEA_TOKEN = credentials('gitea-token')
            }
            stages {
                stage('UI Build Docker Image') {
                    steps {
                        sh '''
                        cd ui
                        docker build -t git.aru-software.pl/aru-software/as-wiki/as-wiki-ui:latest -t git.aru-software.pl/aru-software/as-wiki/as-wiki-ui:0.0.$BUILD_NUMBER .
                        docker login git.aru-software.pl -U aru -p $GITEA_TOKEN
                        docker push git.aru-software.pl/aru-software/as-wiki/as-wiki-ui:latest
                        docker push git.aru-software.pl/aru-software/as-wiki/as-wiki-ui:0.0.$BUILD_NUMBER
                        '''
                    }
                }
            }
        }
    }
}