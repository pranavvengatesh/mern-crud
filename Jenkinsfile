pipeline {
    agent any

    environment {
        DOCKER_IMAGE_BACKEND = "username/backend"
        DOCKER_IMAGE_FRONTEND = "username/frontend"
    }

    stages {

        stage('Clone') {
            steps {
             git url: 'https://github.com/pranavvengatesh/mern-crud.git', branch: 'main'
            }
        }

        stage('Build Images') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE_BACKEND ./backend'
                sh 'docker build -t $DOCKER_IMAGE_FRONTEND ./frontend'
            }
        }

        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push $DOCKER_IMAGE_BACKEND
                        docker push $DOCKER_IMAGE_FRONTEND
                    '''
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                sshagent(['prod-ssh']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no ubuntu@PRIVATE-IP "
                        cd /home/ubuntu/app &&
                        docker compose pull &&
                        docker compose up -d
                        "
                    '''
                }
            }
        }
    }
}
