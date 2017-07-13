const schema = `
  schema {
    query: Query,
    mutation: Mutation
  }
`;

const Query = `
  type Query {
    users: [User]
    userByName(name: String!): User
    userById(id: ID!): User
    usersByRole(desc: String!): [User]
    usersByOrientation(orientation: Orientation): [User]
    search(text: String!): [Search]
  }
`;

const Mutation = `
    type Mutation {
        createUser(data: UserInput!): User
        setUserName(id: ID!, name: String!): User
    }
`;

const User = `
    interface User {
        id: ID!
        name: String!,
        role: Role!
        orientation: [Orientation]
    }

`;

const Enum = `
    enum Orientation {
        hetero
        homo
        bi
    }

`;

const Union = `union Search = Man | Woman`;

const UserInput =`
    input UserInput {
        id: ID!
        name: String!
        role: String!
        orientation: [String]!
        type: String!
        dop: String!
    }
`;

const Man = `
    type Man implements User {
        id: ID!
        name: String!,
        role: Role!,
        orientation: [Orientation],
        qwe: String!
    }

`;

const Woman = `
    type Woman implements User {
        id: ID!
        name: String!,
        role: Role!,
        orientation: [Orientation],
        asd: String!
    }

`;

const Role = `
    type Role {
        id: ID!,
        description: String!
    }

`;

export default [
    schema,
    User,
    Enum,
    UserInput,
    Man,
    Woman,
    Union,
    Role,
    Query,
    Mutation
];