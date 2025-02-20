import { createClient, SetOptions } from 'redis'

type JSONPrimitive = string | number | boolean | null | undefined

export type JSONSerializable =
  | JSONPrimitive
  | JSONSerializable[]
  | {
      [key: string]: JSONSerializable
    }

const redis = createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
})
  .on('error', (err) => console.log('Redis Client Error', err))
  .connect()

export async function get<T = JSONSerializable>(
  collection: string,
  item: string
): Promise<T> {
  const key = `${process.env.REDIS_NAMESPACE}:${collection}:${item}`
  const client = await redis
  const response = await client.get(key)
  if (!response) {
    throw new Error('item not found')
  }
  return JSON.parse(response)
}

export async function set<T = JSONSerializable>(
  collection: string,
  item: string,
  value: T,
  options?: SetOptions
) {
  const key = `${process.env.REDIS_NAMESPACE}:${collection}:${item}`
  const jsonValue = JSON.stringify(value)
  const client = await redis
  await client.set(key, jsonValue, options)
}

export async function list(collection: string) {
  const client = await redis
  const pattern = `${process.env.REDIS_NAMESPACE}:${collection}:`
  const keys = await client.keys(pattern + '*')
  return keys.map((key) => key.replace(pattern, ''))
}

export async function del(collection: string, items: string[]) {
  const client = await redis
  const pattern = `${process.env.REDIS_NAMESPACE}:${collection}:`

  const keysToDelete = items.map((item) => pattern + item)
  await client.del(keysToDelete)
}
