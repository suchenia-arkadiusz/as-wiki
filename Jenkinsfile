pipeline {
    agent {
        docker {
            image 'git.aru-software.pl/aru/build-images/nvm:latest'
            registryUrl 'https://git.aru-software.pl'
            registryCredentialsId 'gitea-packages'
        }
    }
    
    stages {
        stage('Check build') {
            steps {
                sh 'echo It works'
            }
        }
    }
}