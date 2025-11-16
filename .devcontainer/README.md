# Dev Container Setup

This directory contains the development container configuration for the QA Elevate frontend.

## What's Included

- **Node.js 18**: Latest LTS version with npm
- **VS Code Extensions**: ESLint, Prettier, Tailwind CSS IntelliSense, and more
- **Pre-configured Settings**: Format on save, ESLint auto-fix
- **Git & GitHub CLI**: Version control tools
- **Port Forwarding**: Automatic forwarding of port 3000 for the Next.js dev server

## Getting Started

1. **Open in Dev Container**
   - Open this folder in VS Code
   - Press `F1` and select "Dev Containers: Reopen in Container"
   - Wait for the container to build and start

2. **Start Development**
   ```bash
   npm run dev
   ```
   The dev server will be available at http://localhost:3000

## Features

- ✅ Consistent development environment across all team members
- ✅ No need to install Node.js or dependencies locally
- ✅ Pre-configured linting and formatting
- ✅ All dependencies installed automatically
- ✅ TypeScript support with workspace SDK

## Commands

- `npm run dev` - Start development server with Turbo
- `npm run build` - Build production bundle
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## Troubleshooting

**Container won't start?**
- Ensure Docker is running
- Check that you have the "Dev Containers" extension installed in VS Code

**Port 3000 already in use?**
- Stop any local Next.js instances running on your host machine
- Or update the port forwarding in `devcontainer.json`

**Dependencies not installing?**
- Rebuild the container: `F1` → "Dev Containers: Rebuild Container"
