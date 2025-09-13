// order.service.ts
import { Publish } from "@/rabbitmq/publisher";
import { ICreateOrder } from "@/types";
export class OrderService {
  private orders = [
    {
      name: "nodejs",
      price: 99,
      id: 1,
      status: "paid",
    },
    {
      name: "zookeeper",
      price: 99,
      id: 2,
      status: "paid",
    },
  ];
  getOrders() {
    return this.orders;
  }
  createOrder(order: ICreateOrder) {
    this.orders.push({
      ...order,
      id: this.orders.slice(-1)[0].id + 1,
    });
    // if success, publish to payment and notificaiton
    return this.orders;
  }

  updateOrder(id: number, updates: Partial<ICreateOrder>) {
    const index = this.orders.findIndex((o) => o.id === id);
    console.log("index \n id: ", index, id);
    if (index === -1) return null;

    this.orders[index] = { ...this.orders[index], ...updates };

    return this.orders[index];
  }
}
