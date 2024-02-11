pipeline {
    agent none
    
    stages {
        stage('NODE') {
            agent {
                label 'local-amd64'
            }
            stages {
                stage('UI Build') {
                    steps {
                        sh '''
                        . $NVM_DIR/nvm.sh
                        cd ui
                        nvm install
                        npm install
                        npm run eslint
                        npm run build
                        '''
                    }
                }
                stage('UI Test') {
                    steps {
                        sh '''
                        . $NVM_DIR/nvm.sh
                        cd ui
                        nvm install
                        npm run test
                        npm run test:coverage
                        '''
                    }
                }
                stage('SRV Build') {
                    steps {
                        sh '''
                        . $NVM_DIR/nvm.sh
                        cd server
                        nvm install
                        npm install
                        npm run eslint
                        npm run build
                        '''
                    }
                }
                stage('SRV Test') {
                    steps {
                        sh '''
                        echo TODO Add Tests Check
                        '''
                    }
                }
            }
        }
        stage('DOCKER') {
            when {
                expression {
                    env.BRANCH_NAME == 'main'
                }
            }
            agent {
                label 'local-amd64'
            }
            stages {
                stage('UI Build Docker Image') {
                    steps {
                        withCredentials([usernamePassword(credentialsId: 'gitea-packages', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                            sh '''
                            cd ui
                            docker build -t git.aru-software.pl/aru-software/as-wiki/as-wiki-ui:latest -t git.aru-software.pl/aru-software/as-wiki/as-wiki-ui:0.0.$BUILD_NUMBER .
                            docker login git.aru-software.pl -u ${USER} -p ${PASS}
                            docker push git.aru-software.pl/aru-software/as-wiki/as-wiki-ui:latest
                            docker push git.aru-software.pl/aru-software/as-wiki/as-wiki-ui:0.0.$BUILD_NUMBER
                            '''
                        }
                    }
                }
                stage('SRV Build Docker Image') {
                    steps {
                        withCredentials([usernamePassword(credentialsId: 'gitea-packages', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                            sh '''
                            cd server
                            docker build -t git.aru-software.pl/aru-software/as-wiki/as-wiki-srv:latest -t git.aru-software.pl/aru-software/as-wiki/as-wiki-srv:0.0.$BUILD_NUMBER .
                            docker login git.aru-software.pl -u ${USER} -p ${PASS}
                            docker push git.aru-software.pl/aru-software/as-wiki/as-wiki-srv:latest
                            docker push git.aru-software.pl/aru-software/as-wiki/as-wiki-srv:0.0.$BUILD_NUMBER
                            '''
                        }
                    }
                }
            }
        }
    }
}