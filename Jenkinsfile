pipeline {
    agent any;
    environment {
        IMAGE_NAME = "node-app"
        DOCKER_HUB_USERNAME = "deepanshub9"
    }
    stages {
        stage("Code Clone") {
            steps {
                echo "Cloning Repository..."
                git url: "https://github.com/deepanshub9/Jenkins-todo-application", branch: "main"
            }
        }
        stage("Install Dependencies") {
            steps {
                echo "Installing Node.js dependencies"
                sh "npm install"
            }
        }
        stage("Run Tests") {
            steps {
                echo "Running Mocha Test Cases"
                sh "npm test"
            }
        }
        stage("SonarQube Analysis") {
            steps {
                withCredentials([string(credentialsId: 'SONAR_TOKEN', variable: 'SONAR_TOKEN')]) {
                    sh '''
              /opt/sonar-scanner/bin/sonar-scanner \
                -Dsonar.login=$SONAR_TOKEN \
                -Dsonar.host.url=http://34.226.28.100:9000
            '''
                }
            }
        }
        stage('OWASP Dependency-Check Vulnerabilities') {
            steps {
                withCredentials([string(credentialsId: 'NVD_API_KEY', variable: 'NVD_API')]) {
                    dependencyCheck additionalArguments: """
                --scan .
                --format XML 
                --out dependency-check-report 
                --project Node-Todo-App
                --nvdApiKey=${NVD_API}
            """, odcInstallation: 'OWASP' // use exact name from Manage Jenkins
                    dependencyCheckPublisher pattern: 'dependency-check-report/dependency-check-report.xml'
                }
            }
        }
        stage("Code Build") {
            steps {
                echo "Building Docker Image"
                sh "docker build -t ${IMAGE_NAME} ."
                echo "Removing dangling images"
                sh "docker image prune -f"
            }
        }
        stage('Trivy Vulnerability Scan') {
            steps {
                echo "Scanning Docker Image with Trivy"
                sh """
            trivy image --format json --output trivy-report.json ${IMAGE_NAME} || true
        """
                archiveArtifacts artifacts: 'trivy-report.json', allowEmptyArchive: true
            }
        }
        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    script {
                        def imageWithTag = "${DOCKER_HUB_USERNAME}/${IMAGE_NAME}:${env.BUILD_NUMBER}"
                        def imageLatest = "${DOCKER_HUB_USERNAME}/${IMAGE_NAME}:latest"
                        sh "docker tag ${IMAGE_NAME} ${imageWithTag}"
                        sh "docker tag ${IMAGE_NAME} ${imageLatest}"
                        sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                        sh "docker push ${imageWithTag}"
                        sh "docker push ${imageLatest}"
                    }
                }
            }
        }
        stage("Deploy") {
            steps {
                echo "Deploying to EC2 with Docker Compose"
                sh "docker compose down || true"
                sh "docker compose up -d --build"
            }
        }
    }
}
