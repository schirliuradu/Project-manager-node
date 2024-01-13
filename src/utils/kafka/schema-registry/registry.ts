import { SchemaRegistry } from '@kafkajs/confluent-schema-registry'
import { KafkaMessage } from 'kafkajs'

export class Registry {
  constructor(private readonly registry: SchemaRegistry) {}

  private async getSchema(topic: string) {
    return this.registry.getLatestSchemaId(`${topic}-value`)
  }

  async encode(topic: string, payload: any): Promise<Buffer> {
    const schema = await this.getSchema(topic)

    return this.registry.encode(schema, payload)
  }

  async decode(payload: KafkaMessage): Promise<any> {
    return this.registry.decode(payload.value!)
  }
}
