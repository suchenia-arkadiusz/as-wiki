pipeline {
    agent {
        docker {
            image 'node:18.17.1-alpine'
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