# 📘 ECO Microservices Ecosystem – Kubernetes + Docker + Express + Kafka + Redis

This document describes the microservices architecture of the ECO project, how its components are implemented and communicate using Kubernetes and Docker, and the role of each YAML file within the cluster. It also highlights the publishers and subscribers that interact with the deployed APIs.

---

## 🧱 General Architecture

The ecosystem consists of several Express microservices, third-party services, and scheduled processes (`cron jobs`) that interact via HTTP and Kafka. The architecture includes:

* APIs deployed on Kubernetes: `ComerceAPIExpress`, `OrdersAPIExpress`, `AuthorizationAPIExpress`
* External services in containers: Kafka, Redis
* SQL Server database (installed locally on the host)
* MongoDB Atlas for order storage
* Locally executed cron jobs: `pub_orders`, `pub_persons`, `pub_product`, `ComerceOrderSubscriptor`

---

## 🔄 Communication Flow

🧭 In the current architecture, **all publishers and subscribers** communicate with the services deployed on Kubernetes through a single entry point: the **Ingress Controller** configured as `eco.local`. This single box, represented as `Ingress` in the diagram, routes paths like `/auth`, `/orders`, and `/comerce` to their respective `Service` and then to the corresponding `Deployment`.

### Publishers

* `pub_orders` generates random purchase orders by combining real and fake data. It accesses `ComerceAPIExpress` to fetch valid data and then sends the order to `OrdersAPIExpress` via Ingress.
* `pub_persons` generates fake customers and providers and registers them directly through `ComerceAPIExpress`.
* `pub_product` creates fake products that are also stored using `ComerceAPIExpress`.

### Subscriber

* `ComerceOrderSubscriptor` listens to the Kafka topic `Orders`, receives the new orders, and forwards them to `ComerceAPIExpress` for storage in SQL Server.

---

## ⚙️ Components Deployed on Kubernetes

Only the APIs and services such as Kafka and Redis are executed inside the Kubernetes cluster. The corresponding YAML files for each resource are located in the folder: `D:\projects\demos-cursos\Ecosystem\kubernetes-yml\`.

### 🗂 YAML Files and Their Roles

#### `persistent-volume.yaml`

Reserves a persistent volume on the host (`D:\volumes\eco\files`) and mounts it at `/files` inside the pods. Useful for logs, keys, or shared files.

#### `eco-comerce-deployment.yaml`

Defines the `Deployment` for `ComerceAPIExpress`, including environment variables, ports, and mounted volumes.

#### `eco-orders-deployment.yaml`

Defines the `Deployment` for `OrdersAPIExpress`, connected to MongoDB Atlas and publishing Kafka events.

#### `eco-api-services.yaml`

Creates `ClusterIP Services` for the three main APIs to be accessed internally from the Ingress.

#### `eco-api-ingress.yaml`

Defines external HTTP routes:

* `/auth` → `eco-api-auth-service`
* `/orders` → `eco-api-orders-service`
* `/comerce` → `eco-api-comerce-service`

📌 Make sure you have the following entry in your `/etc/hosts`:

```
127.0.0.1 eco.local
```

This allows access to APIs like:

* `http://eco.local/auth/api/login`
* `http://eco.local/comerce/api/products`

---

## 📦 Kubernetes Glossary

| Resource              | Description                                                    |
| --------------------- | -------------------------------------------------------------- |
| Deployment            | Defines the number of pods, Docker image, volumes, and config. |
| Service (ClusterIP)   | Internal exposure between pods using a service name.           |
| Ingress               | External exposure via HTTP(S) under a single domain.           |
| PersistentVolume      | Reserves physical space from the host for persistent data.     |
| PersistentVolumeClaim | Request from a pod to use a PersistentVolume.                  |

---

## 🔁 Quick Deployment

```bash
cd D:/projects/demos-cursos/Ecosystem/kubernetes-yml
kubectl apply -f .
```

### 🧹 Remove All Resources

```bash
kubectl delete all --all -n default
```

---

## 🔗 YAML ↔ Service ↔ Ingress Mapping

| Microservice    | Deployment YAML               | Service YAML              | Ingress Path |
| --------------- | ----------------------------- | ------------------------- | ------------ |
| eco-api-auth    | (to be added)                 | `eco-api-auth-service`    | `/auth`      |
| eco-api-orders  | `eco-orders-deployment.yaml`  | `eco-api-orders-service`  | `/orders`    |
| eco-api-comerce | `eco-comerce-deployment.yaml` | `eco-api-comerce-service` | `/comerce`   |

---

## 🐳 Docker Images Used

```bash
docker image build -t moviedomfo/eco-api-auth .
docker image build -t moviedomfo/eco-api-orders .
docker image build -t moviedomfo/eco-api-comerce .
```

## 🧰 External Services with Docker Compose

```bash
docker-compose -f docker-compose-kafka.yml up -d
docker-compose -f docker-compose-redis.yml up -d
docker-compose -f docker-compose-nginx.yml up -d
```

---

## 🧠 Helpful Tips

* Persistent volume path on Windows host: `/run/desktop/mnt/host/d/volumes/eco/files`
* MongoDB is accessed using a free Atlas cloud instance
* Redis is used for revoked JWT token handling and session caching
* Kafka acts as the event bus between APIs
* Nginx can act as a reverse proxy if needed outside Kubernetes

If you need this README in `.docx`, `.pdf`, or want to embed a diagram, just ask 😄
