pipeline {
    agent any

    stages {

        stage('Clone Repo') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/pranavvengatesh/mern-crud.git'
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    bat 'docker build -t pranavvengatesh191103/mern-backend:latest .'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    bat 'docker build -t pranavvengatesh191103/mern-frontend:latest .'
                }
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'merncrud',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat 'docker login -u %DOCKER_USER% -p %DOCKER_PASS%'
                }
            }
        }

        stage('Push Images') {
            steps {
                bat '''
                docker push pranavvengatesh191103/mern-backend:latest
                docker push pranavvengatesh191103/mern-frontend:latest
                '''
            }
        }
    }
}
