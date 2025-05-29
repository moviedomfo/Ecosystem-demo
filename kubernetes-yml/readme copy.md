# 📘 Ecosistema ECO Microservicios – Kubernetes + Docker + Express + Kafka + Redis

Este documento combina la explicación del ecosistema completo basado en microservicios Express con los detalles técnicos del despliegue en Kubernetes. Se incluyen detalles sobre los YAML de Kubernetes, las imágenes Docker utilizadas y la interacción entre microservicios mediante Kafka y Redis.

---

## 📦 Microservicios incluidos

### `AuthorizationAPIExpress`

API para autenticación y emisión de JWT con almacenamiento de tokens en Redis.

* Endpoint: `POST http://[host]:[port]/api/sec/authenticate`
* Utiliza Redis para blacklist de tokens y revocación.

### `ComerceAPIExpress`

Backend en Express que maneja CRUD de clientes, proveedores y productos.

* Base de datos: SQL Server.
* Se comunica con Kafka al insertar datos.
* Endpoints:

  * `POST http://[host]:[port]/api/persons/customers`
  * `POST http://[host]:[port]/api/persons/providers`
  * `POST http://[host]:[port]/api/products`
  * `POST http://[host]:[port]/api/orders`

### `OrdersAPIExpress`

Backend Express que gestiona las órdenes de compra.

* Base de datos: MongoDB Atlas.
* Publica eventos a Kafka (topic `Orders`).

### `pub_persons`

Servicio cron que genera personas/proveedores falsos y los publica en ComerceAPIExpress.

### `pub_product`

Servicio cron que simula el ingreso de productos al stock vía ComerceAPIExpress.

### `pub_orders`

Servicio cron que simula compras de clientes, creando órdenes a través de OrdersAPIExpress.

### `ComerceOrderSubscriptor`

Subscriptor de Kafka que escucha el topic `Orders` y replica en SQL Server llamando a ComerceAPIExpress.

---

## ⚙️ Archivos YAML – Kubernetes

### Diccionario Kubernetes

| Concepto              | Descripción breve                                                      |
| --------------------- | ---------------------------------------------------------------------- |
| Deployment            | Define cómo se deben crear y gestionar los pods de una app.            |
| Service (ClusterIP)   | Expone un conjunto de pods internamente dentro del cluster Kubernetes. |
| Ingress               | Permite acceso externo a servicios del cluster vía HTTP/HTTPS.         |
| PersistentVolume (PV) | Recurso físico de almacenamiento (hostPath en este caso).              |
| PersistentVolumeClaim | Solicitud de uso de un volumen por parte de un pod.                    |

### Archivos YAML y función

#### `persistent-volume.yaml`

Define almacenamiento persistente `hostPath` para contener archivos, claves o logs compartidos.

#### `eco-comerce-deployment.yaml`

Define el `Deployment` del microservicio `eco-api-comerce`.

#### `eco-orders-deployment.yaml`

Define el `Deployment` del microservicio `eco-api-orders`.

#### `eco-api-services.yaml`

Contiene los `Service` tipo ClusterIP para cada microservicio:

* `eco-api-auth-service`
* `eco-api-orders-service`
* `eco-api-comerce-service`

#### `eco-api-ingress.yaml`

Define reglas de acceso HTTP mediante host `eco.local`:

* `/auth` → `eco-api-auth-service`
* `/orders` → `eco-api-orders-service`
* `/comerce` → `eco-api-comerce-service`

> 🧠 Agregar en `/etc/hosts`:

```
127.0.0.1 eco.local
```

### Relación YAML ↔ Servicio ↔ Ingress

| Microservicio   | Deployment YAML               | Service YAML              | Ingress Path |
| --------------- | ----------------------------- | ------------------------- | ------------ |
| eco-api-auth    | (falta en este set)           | `eco-api-auth-service`    | `/auth`      |
| eco-api-orders  | `eco-orders-deployment.yaml`  | `eco-api-orders-service`  | `/orders`    |
| eco-api-comerce | `eco-comerce-deployment.yaml` | `eco-api-comerce-service` | `/comerce`   |

---

## 🚀 Flujo de Despliegue Kubernetes

```bash
kubectl apply -f persistent-volume.yaml
kubectl apply -f eco-comerce-deployment.yaml
kubectl apply -f eco-orders-deployment.yaml
kubectl apply -f eco-api-services.yaml
kubectl apply -f eco-api-ingress.yaml
```

---

## 🐳 Docker: Generación de imágenes

Desde cada carpeta:

```bash
docker image build -t moviedomfo/eco-api-auth .
docker image build -t moviedomfo/eco-api-orders .
docker image build -t moviedomfo/eco-api-comerce .
```

## 🧰 Docker Compose (Modo local)

```bash
docker-compose up -d
docker-compose -f docker-compose-kafka.yml up -d
docker-compose -f docker-compose-nginx.yml up -d
docker-compose -f docker-compose-redis.yml up -d
```

### Nginx Reverse Proxy

* Redirige `/platon/api/persons/` y `/hercules/api/persons/` hacia instancias de `ComerceAPIExpress`
* Redirige `/ulises/api/customers/` hacia `OrdersAPIExpress`

---

## 🧠 Notas adicionales

* Las imágenes están en Docker Hub: `moviedomfo/*`
* MongoDB no se despliega, se usa servicio gratuito en [MongoDB Atlas](https://cloud.mongodb.com)
* Kafka está implementado como event sourcing (Bitnami image)
* Redis es usado como cache + token store para JWT

¿Querés que esto también lo convierta en `.docx` o querés que te arme el diagrama de arquitectura a partir de esto?
