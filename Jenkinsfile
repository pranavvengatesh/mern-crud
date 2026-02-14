pipeline {
    agent any

    stages {

        stage('Clone') {
            steps {
                git 'https://github.com/yourrepo.git'
            }
        }

        stage('Build Images') {
            steps {
                sh 'docker build -t username/backend ./backend'
                sh 'docker build -t username/frontend ./frontend'
            }
        }

        stage('Push Images') {
            steps {
                sh 'docker login -u DOCKERUSER -p DOCKERPASSWORD'
                sh 'docker push username/backend'
                sh 'docker push username/frontend'
            }
        }

        stage('Deploy to Production') {
            steps {
                sh '''
                ssh ubuntu@PRODUCTION-IP "
                cd /home/ubuntu/app &&
                docker compose pull &&
                docker compose up -d
                "
                '''
            }
        }
    }
}
