// // This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
// import { MongoClient } from 'mongodb';

// if (!process.env.NEXT_PUBLIC_MONGODB) {
//   throw new Error(
//     'Invalid/Missing environment variable: "NEXT_PUBLIC_Mongodb_url"'
//   );
// }
// //?لاننا لا نحتاجها هنا options قمنا بحذف ال
// const uri: string = process.env.NEXT_PUBLIC_MONGODB;
// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// //?داخله NODE_ENV لوضع  global يجب انشاء ملف
// if (process.env.NODE_ENV === 'development') {
//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR (Hot Module Replacement).

//   let globalWithMongoClientPromise = global as typeof globalThis & {
//     _mongoClientPromise: Promise<MongoClient>;
//   };

//   if (!globalWithMongoClientPromise._mongoClientPromise) {
//     client = new MongoClient(uri);
//     globalWithMongoClientPromise._mongoClientPromise = client.connect();
//   }
//   clientPromise = globalWithMongoClientPromise._mongoClientPromise;
// } else {
//   // In production mode, it's best to not use a global variable.
//   client = new MongoClient(uri);
//   clientPromise = client.connect();
// }

// // Export a module-scoped MongoClient promise. By doing this in a
// // separate module, the client can be shared across functions.
// export default clientPromise;

// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb

// import { MongoClient, ServerApiVersion } from 'mongodb';

// if (!process.env.NEXT_PUBLIC_MONGODB) {
//   throw new Error(
//     'Invalid/Missing environment variable: "NEXT_PUBLIC_MONGODB"'
//   );
// }

// const uri = process.env.NEXT_PUBLIC_MONGODB;
// const options = {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// };

// let client;
// let clientPromise;

// if (process.env.NODE_ENV === 'development') {
//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR (Hot Module Replacement).
//   let globalWithMongo = global;

//   if (!globalWithMongo._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     globalWithMongo._mongoClientPromise = client.connect();
//   }
//   clientPromise = globalWithMongo._mongoClientPromise;
// } else {
//   // In production mode, it's best to not use a global variable.
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// // Export a module-scoped MongoClient promise. By doing this in a
// // separate module, the client can be shared across functions.
// export default clientPromise;
