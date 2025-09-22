# RabbitMQ Demo Project

A comprehensive demonstration of microservices architecture using RabbitMQ message broker with Node.js, TypeScript, and Express. This project showcases asynchronous communication patterns, event-driven architecture, and service decoupling.

## 🏗️ Architecture Overview

This project implements a simplified e-commerce system with the following microservices:

- **Order Service**: Handles order creation, retrieval, and updates
- **Payment Service**: Processes payments asynchronously via message queues
- **Notification Service**: Handles notifications (placeholder for future implementation)

## 🚀 Features

- **Asynchronous Processing**: Orders are processed asynchronously using RabbitMQ
- **Event-Driven Architecture**: Services communicate through message queues
- **TypeScript**: Full type safety and modern JavaScript features
- **Docker Support**: Easy setup with Docker Compose
- **RESTful API**: Clean API endpoints for order management
- **Message Queuing**: Reliable message delivery with RabbitMQ

## 📋 Prerequisites

- Node.js (v16 or higher)
- pnpm (or npm/yarn)
- Docker and Docker Compose
- TypeScript

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rabbitmq-demo
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start RabbitMQ with Docker Compose**
   ```bash
   docker-compose -f rabbitmq-docker-compose.yml up -d
   ```

4. **Start the application**
   ```bash
   # Development mode
   pnpm dev
   
   # Production mode
   pnpm build
   pnpm start
   ```

## 🐳 Docker Setup

The project includes a Docker Compose configuration for RabbitMQ:

```yaml
# rabbitmq-docker-compose.yml
services:
  rabbitmq:
    image: rabbitmq:4-management
    ports:
      - "15672:15672" # Management UI
      - "5672:5672"   # AMQP port
    environment:
      RABBITMQ_DEFAULT_USER: user
      RABBITMQ_DEFAULT_PASS: root
...
```
Make sure you started Docker Desktop in windows/mac and run
```bash
docker compose -f ./rabbitmq-docker-compose.yml up -d --build
```

### Access RabbitMQ Management UI

- URL: http://localhost:15672
- Username: `user`
- Password: `root`

## 📚 API Endpoints

### Orders

- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create a new order
- `PUT /api/orders/:id` - Update an order

### Payment

- `POST /api/payment` - Process payment (internal)

### Notification

- `GET /api/notification` - Get notifications (placeholder)

## 🔄 Message Flow

1. **Order Creation**: Client creates an order via REST API
2. **Message Publishing**: Order service publishes order to RabbitMQ queue
3. **Payment Processing**: Payment consumer processes the order asynchronously
4. **Status Update**: Payment service updates order status upon completion

## 📁 Project Structure

```
src/
├── api/
│   ├── orders/           # Order service
│   │   ├── orders.controller.ts
│   │   ├── orders.service.ts
│   │   └── orders.routes.ts
│   ├── payment/          # Payment service
│   │   ├── payment.controller.ts
│   │   ├── payment.service.ts
│   │   ├── payment.consumer.ts
│   │   └── payment.routes.ts
│   └── notification/     # Notification service
├── rabbitmq/
│   ├── connection.ts     # RabbitMQ connection management
│   ├── publisher.ts      # Message publishing
│   └── consumer.ts       # Message consuming
├── types/
│   └── orderTypes.ts     # TypeScript interfaces
├── app.ts               # Express app configuration
└── server.ts            # Server entry point
```

## 🧪 Usage Examples

### Create an Order

```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "price": 999,
    "status": "pending"
  }'
```

### Get All Orders

```bash
curl http://localhost:3000/api/orders
```

### Update an Order

```bash
curl -X PUT http://localhost:3000/api/orders/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "shipped"
  }'
```

## 🔧 Configuration

### Environment Variables

- `RABBITMQ_URL`: RabbitMQ connection string (default: `amqp://user:root@localhost:5672`)
- `PORT`: Server port (default: 3000)




## 🔮 Future Enhancements

- [ ] Add notification service implementation
- [ ] Implement dead letter queues for failed messages
- [ ] Add message retry mechanisms
- [ ] Implement distributed tracing
- [ ] Add database persistence
- [ ] Create comprehensive test suite
- [ ] Add API documentation with Swagger
- [ ] Implement authentication and authorization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 🆘 Troubleshooting

### Common Issues

1. **RabbitMQ Connection Failed**
   - Ensure Docker is running
   - Check if RabbitMQ container is healthy
   - Verify connection string

2. **Messages Not Consumed**
   - Check RabbitMQ Management UI
   - Verify queue exists
   - Check consumer is running

3. **TypeScript Compilation Errors**
   - Run `pnpm build` to check for errors
   - Ensure all dependencies are installed

### Getting Help

If you encounter issues:
1. Check the logs for error messages
2. Verify RabbitMQ is running and accessible
3. Ensure all environment variables are set correctly
4. Check the RabbitMQ Management UI for queue status

---

**Happy Coding! 🚀**

