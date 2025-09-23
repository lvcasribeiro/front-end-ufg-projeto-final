# Synapsis Project

Este repositório contém dois projetos:

- **synapsis-api** → API desenvolvida em Java (Spring Boot).
- **synapsis-spa** → Frontend desenvolvido em React + Vite.

---

## 🚀 Backend (synapsis-api)

### Pré-requisitos

- Java 25
- Maven 3.9+
- Docker

### Rodando a API

```bash
cd synapsis-api
./mvnw spring-boot:run
```

A API ficará disponível em:  
👉 [http://localhost:5005/swagger-ui/index.html](http://localhost:5005/swagger-ui/index.html)

Se quiser subir o banco local via Docker:

```bash
docker compose up --build -d
```

---

## 💻 Frontend (synapsis-spa)

### Pré-requisitos

- Node.js 20+
- npm 9+

### Instalação e execução

```bash
cd synapsis-spa
npm install
npm run dev
```

O frontend ficará disponível em:  
👉 [http://localhost:5173](http://localhost:5173)

---

## 📂 Estrutura do Repositório

```
front-end-ufg-projeto-final/
│── synapsis-api/   # Backend (Spring Boot)
│── synapsis-spa/   # Frontend (React + Vite)
└── README.md       # Este arquivo
```

---

## 🛠 Tecnologias Principais

- **Backend**: Java 25, Spring Boot, Maven, PostgreSQL
- **Frontend**: React, Vite, TypeScript
- **Infra**: Docker, Docker Compose

---

## 📌 Observações

- O backend expõe a documentação da API no Swagger: `/swagger-ui/index.html`.
- O frontend já está configurado para rodar na porta **5173**.
- Certifique-se de iniciar o backend antes do frontend para que a integração funcione corretamente.
