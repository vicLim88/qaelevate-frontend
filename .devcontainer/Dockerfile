# Development container for QA Elevate Frontend
FROM node:18-bullseye

# Install additional tools
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    git \
    curl \
    wget \
    ca-certificates \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Create workspace directory
RUN mkdir -p /workspace && chown -R node:node /workspace

# Set working directory
WORKDIR /workspace

# Switch to node user
USER node

# Keep container running
CMD ["sleep", "infinity"]
