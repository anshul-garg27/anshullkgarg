---
id: "4"
title: "Docker Images: From 2GB to 200MB"
excerpt: "Multi-stage builds, Alpine Linux, and layer optimization techniques for production deployments."
date: "2024-09-05"
readingTime: 5
tags: ["Docker", "DevOps", "Optimization", "Alpine"]
featured: false
category: "DevOps"
author: "Anshul Garg"
---

# Docker Images: From 2GB to 200MB

Large Docker images slow down deployments and waste resources. Here's how we achieved a 90% size reduction.

## The Problem

Our initial Docker image was massive:
- Base image: Ubuntu (200MB)
- Java runtime: Full JDK (300MB)  
- Application dependencies: (500MB)
- Build artifacts: (1GB)
- **Total: 2GB**

## Optimization Strategy

### 1. Multi-stage Builds
```dockerfile
# Build stage
FROM maven:3.8-openjdk-17 AS builder
COPY . /app
WORKDIR /app
RUN mvn clean package -DskipTests

# Runtime stage  
FROM openjdk:17-jre-alpine
COPY --from=builder /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

### 2. Alpine Linux Base (with musl caveats)
Alpine drops the base image from ~200MB to ~5MB. Watch out for:
- glibc vs musl incompatibilities (native deps, DNS resolution)
- Prefer `eclipse-temurin:17-jre-alpine`/`node:18-alpine` images maintained upstream

### 3. Layer & cache optimization
- Ordered commands by frequency of change
- Combined RUN commands to reduce layers
- Used .dockerignore to exclude unnecessary files

### 4. SBOM + security
```bash
docker buildx build --sbom=true --attest type=provenance,mode=max .
trivy image --severity CRITICAL,HIGH --ignore-unfixed my/app:prod
```

## Final Results

Our optimized image:
- Base image: Alpine (5MB)
- JRE runtime: (80MB)
- Application: (115MB)
- **Total: 200MB (90% reduction)**

Benefits:
- Faster deployments (5x improvement)
- Reduced storage costs
- Better security (smaller attack surface)

Small images make a big difference in production!
