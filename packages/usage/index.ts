import {PrismaClient, Prisma} from '@prisma/client'
import { omitPostExtraFields } from './types/test';

// const prisma = new PrismaClient().user.create({ data: { id: 3, email: '', posts: { create: { id: 1, title: '' } } } })

// console.log(1);

const client = new PrismaClient();


// client.user.create({data: {email: Math.random().toString()}}).then(u => console.log(u));
// client.user.findMany().then(res => console.log(res));

// client.user.create({data: omitUserExtraFields({id: ''})})

// client.user.findFirst({})
// client.user.)

client.post.create({data: omitPostExtraFields({title: '123'})})

client.post.findFirst({where: {}})
client.post.aggregate({where: {}})

type x = Prisma.PostCreateArgs