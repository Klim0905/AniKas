import { Client, Account, Storage, Databases} from 'appwrite'

export const client = new Client()

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67da96d5001eae670af5')

export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client)
export { ID } from 'appwrite'


