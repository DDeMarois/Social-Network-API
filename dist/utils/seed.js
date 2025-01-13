import connection from '../config/connection';
import { User, Thought } from '../models/index';
import { getRandomUser, getRandomThought } from './data';
connection.on('error', (err) => err);
connection.once('open', async () => {
    console.log('Connected to the database');
    let userCheck = await connection.db?.listCollections({ name: 'users' }).toArray();
    if (userCheck?.length) {
        await connection.dropCollection('users');
    }
    let thoughtCheck = await connection.db?.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck?.length) {
        await connection.dropCollection('thoughts');
    }
    const users = [getRandomUser(5)];
    const thoughts = [getRandomThought(5)];
    try {
        await User.create(users);
        await Thought.create(thoughts);
        console.table(users);
        console.table(thoughts);
        console.info('Database seeded successfully');
        process.exit(0);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
});
