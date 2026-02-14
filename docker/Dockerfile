# ========================================================
# SBOM Scanner - Optimized Multi-Language Support
# Image: ghcr.io/sktelecom/sbom-scanner
# Size: ~3-4 GB (optimized from 7.3 GB)
# Supports: Java (7-17), Python 3.x, Node.js, Ruby, PHP, Rust
# ========================================================

FROM node:20-slim

LABEL org.opencontainers.image.title="SBOM Scanner"
LABEL org.opencontainers.image.description="Multi-language SBOM generation tool"
LABEL org.opencontainers.image.vendor="SK Telecom"
LABEL org.opencontainers.image.licenses="Apache-2.0"

ENV DEBIAN_FRONTEND=noninteractive

# Essential tools only (no build-essential)
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl bash jq git wget ca-certificates gnupg software-properties-common \
    file procps unzip \
    && rm -rf /var/lib/apt/lists/*

# Python 3 only (removed Python 2 legacy support)
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 python3-pip python3-venv \
    && rm -rf /var/lib/apt/lists/*

# Single JDK: Java 17 LTS
RUN mkdir -p /etc/apt/keyrings \
    && wget -qO - https://packages.adoptium.net/artifactory/api/gpg/key/public | tee /etc/apt/keyrings/adoptium.asc \
    && echo "deb [signed-by=/etc/apt/keyrings/adoptium.asc] https://packages.adoptium.net/artifactory/deb $(awk -F= '/^VERSION_CODENAME/{print$2}' /etc/os-release) main" | tee /etc/apt/sources.list.d/adoptium.list \
    && apt-get update && apt-get install -y --no-install-recommends \
    temurin-17-jdk \
    && rm -rf /var/lib/apt/lists/* \
    && ln -s /usr/lib/jvm/temurin-17-jdk-* /usr/lib/jvm/default-jvm

# Maven & Gradle (lightweight installation)
RUN apt-get update && apt-get install -y --no-install-recommends \
    maven \
    && rm -rf /var/lib/apt/lists/* \
    && wget -q https://services.gradle.org/distributions/gradle-8.5-bin.zip \
    && unzip -q gradle-8.5-bin.zip -d /opt \
    && ln -s /opt/gradle-8.5/bin/gradle /usr/local/bin/gradle \
    && rm gradle-8.5-bin.zip

# Ruby (essential packages only)
RUN apt-get update && apt-get install -y --no-install-recommends \
    ruby ruby-dev bundler \
    && rm -rf /var/lib/apt/lists/*

# PHP (minimal installation)
RUN apt-get update && apt-get install -y --no-install-recommends \
    php-cli php-xml php-mbstring composer \
    && rm -rf /var/lib/apt/lists/*

# Rust (minimal profile - no rustfmt, clippy)
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y \
    --default-toolchain stable --profile minimal --no-modify-path

# Docker CLI (for image scanning)
RUN install -m 0755 -d /etc/apt/keyrings \
    && curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc \
    && chmod a+r /etc/apt/keyrings/docker.asc \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null \
    && apt-get update \
    && apt-get install -y --no-install-recommends docker-ce-cli \
    && rm -rf /var/lib/apt/lists/*

# SBOM generation tools
RUN npm install -g @cyclonedx/cdxgen@latest \
    && curl -sSfL https://raw.githubusercontent.com/anchore/syft/main/install.sh | sh -s -- -b /usr/local/bin

# Environment variables
ENV PATH="/root/.cargo/bin:${PATH}"
ENV JAVA_HOME="/usr/lib/jvm/default-jvm"

# Copy entrypoint script
COPY entrypoint.sh /usr/local/bin/run-scan
RUN chmod +x /usr/local/bin/run-scan

WORKDIR /src

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node --version && java -version 2>&1 | grep -q "openjdk"

ENTRYPOINT ["/usr/local/bin/run-scan"]