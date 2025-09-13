import { getChannel } from "./connection";

/**
 * Consume("orders", (order) => {
 *
 * console.log("💰 Processing payment for:", order);
 * }
 * );
 * @param queue string
 * @param handler any
 */
export async function Consume(queue: string, handler: (msg: any) => void) {
  const channel = await getChannel();
  await channel.assertQueue(queue);

  channel.consume(queue, (msg) => {
    if (msg) {
      const content = JSON.parse(msg.content.toString());
      handler(content);
      channel.ack(msg);
    }
  });
  console.log(`Consume: 👂 Listening on [${queue}]...`);
}
