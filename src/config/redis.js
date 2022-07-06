import redis from 'redis';

const redisClient = redis.createClient(process.env.REDIS_PORT);
await redisClient.connect();

export default redisClient;