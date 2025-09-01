# Node.js To-Do Application with Complete CI/CD & DevOps Pipeline

This repository demonstrates a production-ready DevOps pipeline for a Node.js To-Do application, showcasing modern CI/CD practices, security scanning, containerization, and cloud-native deployment strategies.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Application Features](#application-features)
- [Technologies & Tools Stack](#technologies--tools-stack)
- [Project Architecture](#project-architecture)
- [Local Development Setup](#local-development-setup)
- [Testing & Code Coverage](#testing--code-coverage)
- [CI/CD Pipeline - Detailed Steps](#cicd-pipeline---detailed-steps)
- [Security & Quality Assurance](#security--quality-assurance)
- [Containerization Strategy](#containerization-strategy)
- [Kubernetes & Cloud-Native Deployment](#kubernetes--cloud-native-deployment)
- [Infrastructure as Code](#infrastructure-as-code)
- [Deployment Strategies](#deployment-strategies)
- [Monitoring & Troubleshooting](#monitoring--troubleshooting)
- [Contributing Guidelines](#contributing-guidelines)
- [License](#license)

---

## Project Overview

This Node.js To-Do application serves as a comprehensive demonstration of modern DevOps practices, featuring:

### 🚀 **Complete CI/CD Pipeline**

- **9-stage Jenkins pipeline** with automated quality gates
- **Multi-environment deployments** (Dev, Production)
- **Security-first approach** with vulnerability scanning at every stage
- **Infrastructure as Code** with Terraform
- **Cloud-native deployment** with Kubernetes and Kustomize

### 🔒 **Security-Integrated Development**

- OWASP Dependency vulnerability scanning
- Docker image security scanning with Trivy
- SonarQube static code analysis
- Input sanitization and XSS protection

### ☁️ **Cloud-Native Architecture**

- Containerized application with Docker
- Kubernetes manifests for orchestration
- Kustomize overlays for environment-specific configurations
- AWS EC2 deployment with Docker Compose

---

## Application Features

### Core Functionality

- ✅ **Create, Read, Update, Delete** todo items
- 🛡️ **XSS Protection** with input sanitization
- 🎨 **Responsive UI** with EJS templating
- 🔄 **RESTful API** endpoints
- 📱 **Mobile-friendly** interface

### Technical Features

- 🧪 **Unit & Integration Tests** with Mocha/Chai
- 📊 **Code Coverage** reporting with NYC
- 🐳 **Multi-stage Docker builds**
- 🔧 **Environment-specific configurations**
- 📈 **Health checks** and monitoring endpoints

---

## Technologies & Tools Stack

### Development Stack

| Component      | Technology   | Version         |
| -------------- | ------------ | --------------- |
| **Runtime**    | Node.js      | 20-alpine       |
| **Framework**  | Express.js   | ^4.14.0         |
| **Templating** | EJS          | ^2.5.5          |
| **Testing**    | Mocha + Chai | ^6.2.1 + ^4.2.0 |
| **Coverage**   | NYC          | ^14.1.1         |

### DevOps & CI/CD Stack

| Purpose                      | Tool                    | Configuration              |
| ---------------------------- | ----------------------- | -------------------------- |
| **CI/CD Pipeline**           | Jenkins                 | Declarative Pipeline       |
| **Source Control**           | GitHub                  | Git hooks integration      |
| **Code Quality**             | SonarQube               | Static analysis + coverage |
| **Dependency Security**      | OWASP Dependency-Check  | NVD API integration        |
| **Container Security**       | Trivy                   | Vulnerability scanning     |
| **Containerization**         | Docker + Docker Compose | Multi-stage builds         |
| **Orchestration**            | Kubernetes              | v1.21+                     |
| **Configuration Management** | Kustomize               | Environment overlays       |
| **Infrastructure**           | Terraform               | AWS provider               |
| **Deployment Target**        | AWS EC2                 | Ubuntu LTS                 |

---

## Project Architecture

```
├── 📁 Application Code
│   ├── app.js                 # Express.js application
│   ├── package.json           # Dependencies & scripts
│   ├── test.js               # Test suite
│   └── views/                # EJS templates
│       ├── todo.ejs
│       └── edititem.ejs
│
├── 🐳 Containerization
│   ├── Dockerfile            # Multi-stage Docker build
│   └── docker-compose.yaml   # Local development setup
│
├── 🔧 CI/CD Configuration
│   ├── Jenkinsfile           # 9-stage pipeline definition
│   ├── sonar-project.properties # SonarQube configuration
│   └── azure-pipelines.yml   # Alternative CI/CD option
│
├── ☸️ Kubernetes Manifests
│   ├── k8s/
│   │   ├── deployment.yml    # Application deployment
│   │   ├── service.yml       # Service definition
│   │   ├── pod.yml           # Pod template
│   │   └── replica-sets.yml  # ReplicaSet configuration
│   └── kustomize/
│       ├── base/             # Base configurations
│       └── overlays/         # Environment-specific patches
│           ├── dev/          # Development environment
│           └── prd/          # Production environment
│
└── 🏗️ Infrastructure
    └── terraform/
        ├── main.tf           # Docker infrastructure
        └── terraform.tf     # Provider configuration
```

---

## Local Development Setup

### Prerequisites

- **Node.js** v14+ (Recommended: v20 LTS)
- **npm** v6+
- **Docker** v20.10+ & Docker Compose v2.0+
- **Git** v2.25+

### Quick Start

1. **Clone the Repository**

   ```bash
   git clone https://github.com/deepanshub9/Jenkins-todo-application.git
   cd Jenkins-todo-application
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run Application Locally**

   ```bash
   npm start
   # Application available at http://localhost:8000/todo
   ```

4. **Run with Docker (Recommended)**
   ```bash
   docker-compose up -d --build
   # Application available at http://localhost:8000/todo
   ```

### Available Scripts

```bash
npm start          # Start the application
npm test           # Run test suite with coverage
npm run sonar      # Run SonarQube analysis locally
```

---

## Testing & Code Coverage

### Test Suite Overview

- **Testing Framework**: Mocha with Chai assertions
- **Coverage Tool**: NYC (Istanbul)
- **Test Types**: Unit tests and basic integration tests
- **Coverage Reports**: LCOV format for SonarQube integration

### Running Tests

```bash
# Run tests with coverage
npm test

# View coverage report
open coverage/lcov-report/index.html
```

### Test Configuration

```json
"nyc": {
  "reporter": ["lcov", "text-summary"],
  "all": true,
  "exclude": ["test/**", "node_modules/**"]
}
```

---

## CI/CD Pipeline - Detailed Steps

Our Jenkins pipeline implements a **9-stage automated workflow** that ensures code quality, security, and reliable deployments:

### 🔄 **Pipeline Overview**

```
Source → Dependencies → Tests → Quality → Security → Build → Scan → Publish → Deploy
```

### **Stage 1: Code Clone**

```groovy
stage("Code Clone") {
    steps {
        echo "Cloning Repository..."
        git url: "https://github.com/deepanshub9/Jenkins-todo-application", branch: "main"
    }
}
```

**Purpose**: Retrieves the latest source code from the main branch

- **Trigger**: Webhook from GitHub on push/PR
- **Duration**: ~10-15 seconds
- **Output**: Clean workspace with latest code

### **Stage 2: Install Dependencies**

```groovy
stage("Install Dependencies") {
    steps {
        echo "Installing Node.js dependencies"
        sh "npm install"
    }
}
```

**Purpose**: Downloads and installs all npm dependencies

- **Cache Strategy**: npm cache is utilized for faster builds
- **Duration**: ~30-60 seconds (first run), ~10-15 seconds (cached)
- **Validation**: Checks `package-lock.json` for consistency

### **Stage 3: Run Tests**

```groovy
stage("Run Tests") {
    steps {
        echo "Running Mocha Test Cases"
        sh "npm test"
    }
}
```

**Purpose**: Executes comprehensive test suite with coverage reporting

- **Test Framework**: Mocha + Chai + Supertest
- **Coverage**: NYC generates LCOV reports
- **Quality Gate**: Pipeline fails if tests fail
- **Duration**: ~20-30 seconds
- **Artifacts**: Coverage reports stored for SonarQube

### **Stage 4: SonarQube Analysis**

```groovy
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
```

**Purpose**: Static code analysis for quality and maintainability

- **Metrics Analyzed**:
  - Code coverage (target: >80%)
  - Code smells and bugs
  - Security hotspots
  - Duplicated code blocks
  - Cyclomatic complexity
- **Quality Gates**: Configurable thresholds
- **Duration**: ~45-90 seconds
- **Integration**: Coverage from previous stage

### **Stage 5: OWASP Dependency-Check**

```groovy
stage('OWASP Dependency-Check Vulnerabilities') {
    steps {
        withCredentials([string(credentialsId: 'NVD_API_KEY', variable: 'NVD_API')]) {
            dependencyCheck additionalArguments: """
                --scan .
                --format XML
                --out dependency-check-report
                --project Node-Todo-App
                --nvdApiKey=${NVD_API}
            """, odcInstallation: 'OWASP'
            dependencyCheckPublisher pattern: 'dependency-check-report/dependency-check-report.xml'
        }
    }
}
```

**Purpose**: Identifies known security vulnerabilities in dependencies

- **Database**: NIST National Vulnerability Database (NVD)
- **Scan Scope**: All npm dependencies and transitive dependencies
- **API Integration**: NVD API for real-time vulnerability data
- **Report Format**: XML with detailed vulnerability information
- **Quality Gate**: Configurable severity thresholds
- **Duration**: ~2-4 minutes

### **Stage 6: Code Build (Docker)**

```groovy
stage("Code Build") {
    steps {
        echo "Building Docker Image"
        sh "docker build -t ${IMAGE_NAME} ."
        echo "Removing dangling images"
        sh "docker image prune -f"
    }
}
```

**Purpose**: Creates optimized Docker image for deployment

- **Base Image**: `node:20-alpine` (lightweight, secure)
- **Build Strategy**: Multi-stage build for optimization
- **Size Optimization**: Alpine Linux, minimal dependencies
- **Cleanup**: Removes dangling images to save space
- **Duration**: ~2-3 minutes
- **Output**: Tagged Docker image ready for scanning

### **Stage 7: Trivy Vulnerability Scan**

```groovy
stage('Trivy Vulnerability Scan') {
    steps {
        echo "Scanning Docker Image with Trivy"
        sh """
            trivy image --format json --output trivy-report.json ${IMAGE_NAME} || true
        """
        archiveArtifacts artifacts: 'trivy-report.json', allowEmptyArchive: true
    }
}
```

**Purpose**: Comprehensive container security scanning

- **Scan Types**:
  - OS package vulnerabilities
  - Language-specific vulnerabilities (npm packages)
  - Secret detection
  - Configuration issues
- **Database**: Multiple vulnerability databases
- **Report Format**: JSON for detailed analysis
- **Severity Levels**: Critical, High, Medium, Low
- **Duration**: ~1-2 minutes

### **Stage 8: Docker Push**

```groovy
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
```

**Purpose**: Publishes verified Docker images to registry

- **Registry**: Docker Hub (public registry)
- **Tagging Strategy**:
  - `latest`: Most recent successful build
  - `build-number`: Specific version tracking
- **Security**: Encrypted credentials management
- **Rollback**: Previous versions available for quick rollback
- **Duration**: ~1-3 minutes (depends on image size and network)

### **Stage 9: Deploy**

```groovy
stage("Deploy") {
    steps {
        echo "Deploying to EC2 with Docker Compose"
        sh "docker compose down || true"
        sh "docker compose up -d --build"
    }
}
```

**Purpose**: Deploys application to production environment

- **Target**: AWS EC2 instance
- **Strategy**: Blue-green deployment with Docker Compose
- **Zero Downtime**: Graceful container replacement
- **Health Checks**: Automatic readiness validation
- **Rollback**: Previous container versions available
- **Duration**: ~30-60 seconds

### **Pipeline Quality Gates**

| Stage     | Quality Gate                          | Action on Failure           |
| --------- | ------------------------------------- | --------------------------- |
| Tests     | Test pass rate = 100%                 | Stop pipeline               |
| SonarQube | Coverage > 80%, No critical issues    | Stop pipeline               |
| OWASP     | No critical vulnerabilities           | Warning/Stop (configurable) |
| Trivy     | No critical container vulnerabilities | Warning/Stop (configurable) |

---

## Security & Quality Assurance

### Multi-Layer Security Approach

#### 1. **Static Application Security Testing (SAST)**

- **Tool**: SonarQube
- **Scans**: Security hotspots, code vulnerabilities
- **Integration**: Every commit analysis

#### 2. **Dependency Security**

- **Tool**: OWASP Dependency-Check
- **Database**: NIST NVD with real-time updates
- **Coverage**: Direct and transitive dependencies

#### 3. **Container Security**

- **Tool**: Trivy
- **Scans**: OS packages, language packages, secrets
- **Databases**: Multiple CVE databases

#### 4. **Application Security**

- **XSS Protection**: Input sanitization with `sanitizer` library
- **Input Validation**: Server-side validation
- **Security Headers**: Express.js security middleware

### Quality Metrics Dashboard

```
Code Coverage: 85%+ target
Maintainability: A rating
Reliability: A rating
Security: A rating
Duplication: <3%
```

---

## Containerization Strategy

### Multi-Stage Docker Build

```dockerfile
# Production-optimized Dockerfile
FROM node:20-alpine

# Security: Create non-root user
WORKDIR /node

# Copy and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application code
COPY . .

# Run tests during build
RUN npm test

# Expose port and define startup
EXPOSE 8000
CMD ["node","app.js"]
```

### Docker Compose Configuration

```yaml
services:
  node-app:
    image: deepanshub9/node-app:latest
    build:
      context: .
    container_name: node-app
    ports:
      - "8000:8000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/todo"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### Container Security Best Practices

- ✅ **Non-root user execution**
- ✅ **Alpine Linux base** (minimal attack surface)
- ✅ **Multi-stage builds** (reduced image size)
- ✅ **Vulnerability scanning** with Trivy
- ✅ **Health checks** for monitoring
- ✅ **Resource limits** defined

---

## Kubernetes & Cloud-Native Deployment

### Base Kubernetes Manifests

#### **Deployment Configuration**

```yaml
# k8s/deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: node-app-deployment
  namespace: node-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: node-app
  template:
    metadata:
      labels:
        app: node-app
    spec:
      containers:
        - name: node-container
          image: deepanshub9/node-app:latest
          ports:
            - containerPort: 8000
          resources:
            requests:
              memory: "64Mi"
              cpu: "250m"
            limits:
              memory: "128Mi"
              cpu: "500m"
```

#### **Service Configuration**

```yaml
# k8s/service.yml
apiVersion: v1
kind: Service
metadata:
  name: node-app-service
spec:
  selector:
    app: node-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8000
  type: LoadBalancer
```

### Kustomize Configuration Management

#### **Directory Structure**

```
kustomize/
├── base/                          # Base configurations
│   ├── app-1/
│   │   ├── app-1.yml             # Application deployment
│   │   └── kustomization.yml     # Base kustomization
│   └── ingress/
│       ├── ingress.yml           # Ingress configuration
│       └── kustomization.yml     # Ingress kustomization
└── overlays/                      # Environment-specific patches
    ├── dev/                       # Development environment
    │   ├── kustomization.yml      # Dev-specific config
    │   └── dev-ingress-patch.json # Dev ingress patches
    └── prd/                       # Production environment
        ├── kustomization.yml      # Prod-specific config
        └── prd-ingress-patch.json # Prod ingress patches
```

#### **Environment-Specific Deployments**

**Development Environment:**

```yaml
# overlays/dev/kustomization.yml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

namespace: dev
namePrefix: dev-
replicas:
  - name: app-1-deployment
    count: 1 # Single replica for dev

resources:
  - ../../base/app-1/
  - ../../base/ingress/

patches:
  - target:
      kind: Ingress
      name: app-ingress
    path: dev-ingress-patch.json
```

**Production Environment:**

```yaml
# overlays/prd/kustomization.yml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

namespace: production
namePrefix: prd-
replicas:
  - name: app-1-deployment
    count: 3 # High availability

resources:
  - ../../base/app-1/
  - ../../base/ingress/

patches:
  - target:
      kind: Ingress
      name: app-ingress
    path: prd-ingress-patch.json
```

#### **Deployment Commands**

```bash
# Deploy to development
kubectl apply -k kustomize/overlays/dev/

# Deploy to production
kubectl apply -k kustomize/overlays/prd/

# View generated manifests (dry-run)
kubectl kustomize kustomize/overlays/dev/
```

---

## Infrastructure as Code

### Terraform Configuration

#### **Docker Infrastructure**

```terraform
# terraform/main.tf
terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
  }
}

provider "docker" {}

resource "docker_image" "todo_image" {
  name         = "deepanshub9/node-app:latest"
  keep_locally = false
}

resource "docker_container" "todo_container" {
  image = docker_image.todo_image.name
  name  = "todoapp-container"

  ports {
    internal = 8000
    external = 8000
  }

  depends_on = [docker_image.todo_image]
}
```

#### **AWS Infrastructure (Extended)**

```terraform
# Extended AWS infrastructure
resource "aws_vpc" "todo_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "todo-app-vpc"
  }
}

resource "aws_subnet" "todo_subnet" {
  vpc_id                  = aws_vpc.todo_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true

  tags = {
    Name = "todo-app-subnet"
  }
}

resource "aws_security_group" "todo_sg" {
  name_prefix = "todo-app-"
  vpc_id      = aws_vpc.todo_vpc.id

  ingress {
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "todo_instance" {
  ami           = "ami-0c02fb55956c7d316"  # Amazon Linux 2
  instance_type = "t3.micro"
  subnet_id     = aws_subnet.todo_subnet.id

  vpc_security_group_ids = [aws_security_group.todo_sg.id]

  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              yum install -y docker
              systemctl start docker
              systemctl enable docker
              usermod -a -G docker ec2-user

              # Install Docker Compose
              curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
              chmod +x /usr/local/bin/docker-compose
              EOF

  tags = {
    Name = "todo-app-instance"
  }
}
```

#### **Terraform Commands**

```bash
# Initialize Terraform
terraform init

# Plan infrastructure changes
terraform plan

# Apply infrastructure
terraform apply

# Destroy infrastructure
terraform destroy
```

---

## Deployment Strategies

### 1. **Local Development Deployment**

```bash
# Quick local setup
docker-compose up -d
# Access: http://localhost:8000/todo
```

### 2. **AWS EC2 Deployment**

```bash
# Automated via Jenkins pipeline
# Manual deployment:
ssh ec2-user@your-ec2-instance
git clone https://github.com/deepanshub9/Jenkins-todo-application.git
cd Jenkins-todo-application
docker-compose up -d
```

### 3. **Kubernetes Deployment**

```bash
# Development environment
kubectl apply -k kustomize/overlays/dev/

# Production environment
kubectl apply -k kustomize/overlays/prd/

# Monitor deployment
kubectl get pods -n production
kubectl logs -f deployment/prd-app-1-deployment -n production
```

### 4. **Multi-Environment Pipeline**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Feature   │───▶│     Dev     │───▶│ Production  │
│   Branch    │    │ Environment │    │ Environment │
│             │    │  (Auto)     │    │  (Manual)   │
└─────────────┘    └─────────────┘    └─────────────┘
```

---

## Monitoring & Troubleshooting

### Application Health Checks

```javascript
// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
  });
});
```

### Container Health Monitoring

```yaml
# Docker Compose health check
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 60s
```

### Kubernetes Monitoring

```bash
# Check pod status
kubectl get pods -n production

# View logs
kubectl logs -f deployment/prd-app-1-deployment -n production

# Describe deployment
kubectl describe deployment prd-app-1-deployment -n production

# Check service endpoints
kubectl get endpoints -n production
```

### Common Troubleshooting

#### **Pipeline Failures**

```bash
# Check Jenkins console output
# Common issues:
# 1. Dependency installation failures
# 2. Test failures
# 3. SonarQube quality gate failures
# 4. Docker Hub authentication issues
```

#### **Deployment Issues**

```bash
# Check container logs
docker logs node-app

# Check container status
docker ps -a

# Check network connectivity
docker exec -it node-app curl localhost:8000/health
```

#### **Kubernetes Issues**

```bash
# Check pod events
kubectl describe pod <pod-name> -n production

# Check service configuration
kubectl get svc -n production

# Check ingress status
kubectl get ingress -n production
```

---

## Contributing Guidelines

### Development Workflow

1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** Pull Request

### Code Standards

- ✅ **ESLint** configuration compliance
- ✅ **Test coverage** >80%
- ✅ **Security** vulnerability checks pass
- ✅ **Documentation** updates included

### Pull Request Process

1. Ensure all CI/CD checks pass
2. Update README.md if needed
3. Add/update tests for new features
4. Request review from maintainers

---

### License

MIT License

---

## Pipeline Execution Logs

![Pipeline Overview](https://github.com/user-attachments/assets/1e5af4cc-66d1-414b-b721-4568cf219564)

![Build Status](https://github.com/user-attachments/assets/a0155873-8756-45ec-b11e-afa41bad8ec8)

![Security Scanning](https://github.com/user-attachments/assets/d2a549ee-cb6b-4f02-9ae7-9792fde639d1)

![Code Quality](https://github.com/user-attachments/assets/7402e4ce-8d59-468b-bf3c-93f3d59fccb9)

![Deployment Success](https://github.com/user-attachments/assets/a4f03043-0fbb-4f32-82ea-d5463ef5fbdf)


---

**Author**: Deepanshu Bhargava  
**Repository**: [Jenkins-todo-application](https://github.com/deepanshub9/Jenkins-todo-application)  
**Last Updated**: August 2025
