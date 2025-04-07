import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema, resolvers} from './settings.js';


const app = express();

app.use('/graphql',graphqlHTTP({
    schema : schema,
    rootValue: resolvers,
    graphiql: true
}));

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`GraphQL server is running on http://localhost:${PORT}/graphql`)
})
