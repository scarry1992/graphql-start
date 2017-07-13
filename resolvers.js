class User {//interface
    constructor(id, name, orientation, role) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.orientation = orientation;
    }
}

class Man extends User{
    constructor(id, name, orientation, role, qwe) {
        super(id, name, orientation, role);
        this.qwe = qwe;
    }
}

class Woman extends User{
    constructor(id, name, orientation, role, asd) {
        super(id, name, orientation, role);
        this.asd = asd;
    }
}

class Role {
    constructor(id, desc) {
        this.id = id;
        this.desc = desc;
    }
}

let users = [];
//users.push(new User(1,'Kolya', new Role(1, 'Root')));
//users.push(new User(2,'Dima', new Role(2, 'User')));
users.push(new Man(3,'Igor', ['bi', 'homo'], new Role(2, 'User'), 'qwe'));
users.push(new Woman(4,'Inna', ['bi', 'hetero'], new Role(2, 'User'), 'asd'));

export default {
    Query: {
        users: () => users,
        userByName: (obj, args, context) => users.filter( user => user.name === args.name )[0],
        userById: (obj, args, context) => users.filter( user => user.id === +args.id )[0],
        usersByRole: (obj, args, context) => users.filter( user => user.role.desc === args.desc ),
        usersByOrientation: (obj, { orientation }, context) => users.filter( user => user.orientation.includes(orientation) ),
        search: (_, { text }) => users.filter(user => user.name.indexOf(text) !== -1)
    },
    Mutation: {
        setUserName: (obj, { id, name }, context) => {
            let userById = users.filter(user => user.id === +id)[0];
            userById.name = name;
            return userById;
        },
        createUser: (obj, { data:{id, name, role, orientation, type, dop} }) => {
            let newUser = new Man(id, name, orientation, new Role(3, role), dop);
            users.push(newUser);
            return newUser;
        }
    },
    Search: {
        __resolveType: (obj, args, context) => {
            if (obj instanceof Man) {return 'Man'}
            if (obj instanceof Woman) {return 'Woman'}
            return null
        }
    },
    User: {
        __resolveType: (obj, args, context) => {
            if (obj instanceof Man) {return 'Man'}
            if (obj instanceof Woman) {return 'Woman'}
            return null
        },
        id: user => user.id,
        name: user => user.name,
        role: user => user.role,
        orientation: user => user.orientation
    },
    Man: {
        id: user => user.id,
        name: user => user.name,
        role: user => user.role,
        qwe: user => user.qwe,
        orientation: user => user.orientation
    },
    Woman: {
        id: user => user.id,
        name: user => user.name,
        role: user => user.role,
        asd: user => user.asd,
        orientation: user => user.orientation
    },
    Role: {
        id: role => role.id,
        description: role => role.desc
    }
};