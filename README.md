# Node.js To-Do Application with Full CI/CD & DevOps Pipeline

This repository contains a simple Node.js To-Do application along with a complete DevOps pipeline implemented using Jenkins, Docker, security scanning tools, Kubernetes, Kustomize, Terraform, and deployment to AWS EC2 with Docker Compose.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Local Development](#local-development)
- [Testing & Coverage](#testing--coverage)
- [Static Code Analysis and Security](#static-code-analysis-and-security)
- [Dockerization](#dockerization)
- [Kubernetes & Kustomize](#kubernetes--kustomize)
- [Infrastructure as Code (Terraform)](#infrastructure-as-code-terraform)
- [CI/CD Pipeline (Jenkins)](#cicd-pipeline-jenkins)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Project Overview

This is a simple To-Do web application developed in Node.js and Express. The focus of this project is not only the application itself but implementing a robust and automated DevOps pipeline that covers:

- Automated builds and tests
- Code quality checks via SonarQube
- Dependency vulnerability scanning via OWASP Dependency-Check
- Docker image vulnerability scanning with Trivy
- Docker image build, tagging, and push to Docker Hub
- Deployment on an AWS EC2 instance using Docker Compose
- Kubernetes manifests and Kustomize overlays for cloud-native deployment
- Infrastructure as Code with Terraform

---

## Features

- Add, edit, and delete todo items
- Input sanitization to prevent XSS
- RESTful endpoints
- EJS templating for UI
- Unit and integration tests with Mocha/Chai
- Code coverage with NYC
- Dockerized for easy deployment
- Kubernetes manifests and Kustomize overlays for cloud-native deployment
- Jenkins pipeline for CI/CD
- SonarQube static analysis
- Security scanning (OWASP Dependency-Check, Trivy)
- Infrastructure as Code with Terraform

---

## Technologies Used

| Purpose                  | Technology / Tool           |
| ------------------------ | --------------------------- |
| Backend                  | Node.js, Express.js         |
| Frontend Templating      | EJS                         |
| Testing                  | Mocha, Chai, Supertest, NYC |
| CI/CD Orchestration      | Jenkins, Azure Pipelines    |
| Static Code Analysis     | SonarQube                   |
| Dependency Vulnerability | OWASP Dependency-Check      |
| Container Vulnerability  | Trivy                       |
| Containerization         | Docker, Docker Compose      |
| Orchestration            | Kubernetes, Kustomize       |
| Infrastructure as Code   | Terraform                   |
| Deployment               | Docker Compose on AWS EC2   |
| Version Control          | GitHub                      |

---

![Image](https://github.com/user-attachments/assets/1e5af4cc-66d1-414b-b721-4568cf219564)

![Image](https://github.com/user-attachments/assets/a0155873-8756-45ec-b11e-afa41bad8ec8)

![Image](https://github.com/user-attachments/assets/d2a549ee-cb6b-4f02-9ae7-9792fde639d1)

![Image](https://github.com/user-attachments/assets/7402e4ce-8d59-468b-bf3c-93f3d59fccb9)

![Image](https://github.com/user-attachments/assets/a4f03043-0fbb-4f32-82ea-d5463ef5fbdf)

![Image](https://github.com/user-attachments/assets/8733e9ae-7604-4104-8778-54a822999672)

## Local Development

### Prerequisites

- Node.js (v14+)
- npm
- Docker (optional, for containerization)
- Git

### Setup

```bash
git clone https://github.com/deepanshub9/Jenkins-todo-application.git

cd node-todo-cicd-master

npm install
```

Running Locally

```
npm start
```

Testing & Coverage <br>
Run Tests

```
npm test
```

### Dockerization

Build Docker Image

```
docker build -t node-app .
```

Run with Docker

```
docker run -p 8000:8000 node-app
```

---

## CI/CD Pipeline (Jenkins)

- Clone code from GitHub
- Install dependencies
- Run tests
- SonarQube analysis
- OWASP Dependency-Check
- Build Docker image
- Trivy scan
- Push to Docker Hub
- Deploy with Docker Compose

---

### License

MIT License
