pipeline {
    agent {
        docker {
            image 'node:18.17.1-alpine'
        }
    }
    
    stages {
        stage('UI Build') {
            steps {
                sh '''
                npm install
                npm run eslint
                npm run build
                '''
            }
        }
        stage('UI Test') {
            steps {
                sh '''
                npm run Test
                npm run test:coverage
                '''
            }
        }
        stage('UI Build Docker Image') {
            steps {
                sh '''
                echo run build docker image
                '''
            }
        }
    }
}