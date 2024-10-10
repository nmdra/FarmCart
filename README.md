# FarmCart

[![Banner](https://github.com/user-attachments/assets/397fa451-14bf-4d31-bf53-28ab9b685e64)](https://farmcart.nimendra.xyz/) 

[![Uptime Status](https://status.nimendra.xyz/api/badge/8/status)](https://status.nimendra.xyz/status/farmcart) [![Uptime Status](https://status.nimendra.xyz/api/badge/8/uptime)](https://status.nimendra.xyz/status/farmcart)

> [!TIP] 
> **Website**: [farmcart.com](https://farmcart.nimendra.xyz/) \
> **Website Status**: [status.farmcart.com](https://status.nimendra.xyz/status/farmcart)
> 

## Overview

**Empowering Sri Lankan Farmers through Direct Farm-to-Table E-Commerce.** 

*FarmCart is an innovative web application designed to revolutionize the agricultural landscape in Sri Lanka. Our platform connects local farmers directly with consumers, eliminating intermediaries and ensuring fair pricing for both parties.*

## Technologies

<div align="center">
    <img height="32" width="32" src="https://cdn.simpleicons.org/react" /></a>
    <img height="32" width="32" src="https://cdn.simpleicons.org/tailwindcss" /></a>
    <img height="32" width="32" src="https://cdn.simpleicons.org/vite" /></a>
    <img height="32" width="32" src="https://cdn.simpleicons.org/nodedotjs" /></a>
    <img height="32" width="32" src="https://cdn.simpleicons.org/express" /></a>
    <img height="32" width="32" src="https://cdn.simpleicons.org/postman" /></a>
    <img height="32" width="32" src="https://cdn.simpleicons.org/git" /></a>
    <img height="32" width="32" src="https://cdn.simpleicons.org/github" /></a>
    <img height="32" width="32" src="https://cdn.simpleicons.org/digitalocean" /></a>
    <img height="32" width="32" src="https://cdn.simpleicons.org/javascript" /></a>
    <img height="32" width="32" src="https://cdn.simpleicons.org/githubactions" /></a>
    <img height="32" width="32" src="https://cdn.simpleicons.org/npm" /></a>
    <img height="32" width="32" src="https://cdn.simpleicons.org/docker" /></a>
    <img height="32" width="32" src="https://cdn.simpleicons.org/mongodb" /></a>
    <img height="32" width="32" src="https://cdn.simpleicons.org/mongoose" /></a>
</div>

---

## Table of Contents

- [FarmCart](#farmcart)
  - [Overview](#overview)
  - [Technologies](#technologies)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [System Design Diagram](#system-design-diagram)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Docker Installation Guide](#docker-installation-guide)
  - [Docker Configuration](#docker-configuration)

## Features

- **User Management**: Manage user profiles, authentication, and authorization.
- **Shop Management**: Manage shop settings, product listings, and inventory.
- **Product Listings**: Display products with details and images.
- **Financial/Payment Management**: Handle payments, refunds, and financial reports.
- **Employee Management**: Manage employee roles and permissions.
- **Admin Panel**: Centralized control panel for admin tasks.
- **Promotions**: Create and manage promotional campaigns.
- **Order Management**: Track and manage customer orders.
- **Shopping Cart**: Manage items in the shopping cart.
- **Delivery Management**: Coordinate delivery schedules and logistics.
- **Package Tracking**: Real-time tracking of packages.
- **Customer Care**: Handle customer inquiries and support tickets.
- **User Feedback**: Collect and analyze user feedback.
- **Product Catalog**: Comprehensive catalog of all products.

## System Design Diagram

<details>
<summary>Click Me</summary>

[![Diagram-2](https://github.com/user-attachments/assets/bd6483e1-58c5-4ec0-9e02-f56f7f8feb78)](https://excalidraw.com/#json=2FhyHBhIRC7GNhxnmV4U6,VCwEk9O0trP7QRRWLxu6OA)

</details>


---

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation
<details>
<summary>Click me</summary>

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/itp-project.git
    ```
2. Navigate to the frontend directory:
    ```bash
    cd frontend 
    npm install
    npm run dev
    ```
3. Navigate to the backend directory:
    ```bash
    cd backend 
    npm install
    npm run dev
    ```

</details>

### Docker Installation Guide

To run FarmCart using Docker, follow these steps:

<details>
<summary>Click Me</summary>

1. Install Docker

   - **For Windows and Mac**:
     - Download Docker Desktop from [Docker's official website](https://www.docker.com/products/docker-desktop).
     - Follow the installation instructions specific to your OS.

   - **For Linux**:
     - Use the following commands to install Docker:

       ```bash
       sudo apt update
       sudo apt install apt-transport-https ca-certificates curl software-properties-common
       curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
       sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
       sudo apt update
       sudo apt install docker-ce
       ```

1. Verify Installation

   - After installing Docker, verify that it is installed correctly by running:
     ```bash
     docker --version
     ```
   - You should see the installed Docker version.
  

1. Run FarmCart with Docker Compose:
   - Navigate to the root directory of the cloned repository:
     ```bash
     cd itp-project
     ```
   - **Disclaimer**: Before running Docker, ensure that you have set up the necessary environment variables in the `.env.docker` files located in both the `frontend` and `backend` directories. These variables are crucial for the application to function correctly.
   - Start the application using Docker Compose:
     ```bash
     docker-compose up --build
     ```

2. Access the Application
   - Open your web browser and go to:
     - Frontend: [http://localhost:3001](http://localhost:3001)
     - API: [http://localhost:5001](http://localhost:5001)

  </details>

---

## Docker Configuration

```yaml
name: FarmCart

services:
  api:
    build:
      context: ./backend
      dockerfile: Dockerfile
    restart: unless-stopped
    env_file: ./backend/.env.docker
    ports:
      - 5001:5001
    volumes:
      - ./backend:/app
      - /app/node_modules
    networks:
      - mern-app

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    restart: unless-stopped
    env_file: ./frontend/.env.docker
    ports:
      - 3001:3001
    volumes:
      - ./frontend:/app
      - /app/node_modules
    networks:
      - mern-app
    command: npm run dev -- --host
    depends_on:
      - api

networks:
  mern-app:
    driver: bridge


