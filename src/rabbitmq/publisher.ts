import { closeConnection, getChannel } from "./connection";

export async function Publish(queue: string, message: any) {
  const channel = await getChannel();
  await channel.assertQueue(queue);
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  console.log(`📤 Published to [${queue}]:`, message);
  setTimeout(() => closeConnection(), 500);
}
