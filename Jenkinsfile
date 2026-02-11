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
stage('Deploy to EC2') {
    steps {
        bat '''
ssh -i C:\\jenkins\\jenkinsdocker-key.pem -o StrictHostKeyChecking=no ubuntu@13.234.239.182 "docker pull pranavvengatesh191103/mern-backend:latest && docker stop backend || true && docker rm backend || true && docker run -d -p 5000:5000 --name backend pranavvengatesh191103/mern-backend:latest"
'''
    }
}


    }
}
