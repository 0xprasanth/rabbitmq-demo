import client, { Channel, ChannelModel, Connection } from "amqplib";

let connection: Connection | ChannelModel | null = null;
let channel: Channel | null = null;
const amqpURL = "amqp://localhost";

export async function getChannel(): Promise<Channel> {
  if (!connection) {
    connection = await client.connect("amqp://user:root@localhost:5672");
    channel = await connection.createChannel();
  }
  if (!channel) throw new Error("can't create Channel;");
  return channel;
}

export async function closeConnection() {
  if (connection) {
    await (connection as ChannelModel).close();
    connection = null;
    channel = null;
  }
}
