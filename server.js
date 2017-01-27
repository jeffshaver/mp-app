const express = require('express')
const graphqlHTTP = require('express-graphql')
const {buildSchema} = require('graphql')
const namespacesData = require('./src/data/namespaces.es5')
const projectsData = require('./src/data/projects.es5')
const userData = require('./src/data/user.es5')

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Namespace {
    id: String
    name: String
    projectId: String
    status: String
  }
  type Project {
    id: String,
    name: String,
    status: String
  }
  type User {
    authenticated: Boolean
    id: String
    username: String
  }
  type Query {
    namespaces(userId: String): [Namespace]!
    projects(userId: String): [Project]!
    user: User
  }
`)

// The root provides a resolver function for each API endpoint
const root = {
  namespaces: ({userId}) => {
    return namespacesData[userId]
  },
  projects: ({userId}) => {
    return projectsData[userId]
  },
  user: () => {
    return userData
  }
}

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

app.listen(4000)

console.log('Running a GraphQL API server at localhost:4000/graphql')