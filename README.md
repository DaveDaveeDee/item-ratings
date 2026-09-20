# Item Ratings

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=flat&logo=vuedotjs&logoColor=4FC08D)](https://vuejs.org/)
[![Serverless Framework](https://img.shields.io/badge/Serverless-FD5750?style=flat&logo=serverless&logoColor=white)](https://www.serverless.com/)
[![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)

A full-stack serverless web application designed to manage and track item ratings. Built to demonstrate modern cloud architecture, clean code practices, and full-stack TypeScript development.

---

## 🛠 Tech Stack

* **Frontend:** Vue.js 3, Vite, TypeScript, Vuetify
* **Backend & Cloud:** AWS Lambda, API Gateway, DynamoDB
* **Infrastructure as Code (IaC):** Serverless Framework (v4)
* **Tooling:** Node.js, Git, pnpm

---

## 📂 Project Architecture

The project follows a clean monorepo-style structure separating API route handlers, business logic, and data access layers:

```text
item-ratings/
├── resources/
│   └── validation/    # Request validation schemas
├── src/
│   ├── api/           # HTTP handlers and route logic
│   ├── clients/       # External service & database clients
│   └── repositories/  # Data access layer
├── serverless.yml     # AWS infrastructure and service configuration
└── package.json
