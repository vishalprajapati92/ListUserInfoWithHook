let express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser')
;
var { graphqlHTTP } = require('express-graphql');
let { buildSchema } = require('graphql');
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var schema = buildSchema(`
  
  type Name {
    firstName: String,
    lastName: String,
    middleName: String,
    prefix: String,
    nickName: String,
  }

  type Address {
    line1: String
    line2: String
    zipCode: String
    city: String
    state: String
    country: String
  }

  type Detail {
    name: Name
    Address : Address
    friends : [String]
    hobbies : [String]
  }

  type Query {
    getAllInfo : [Detail]
  }

`);
var root = {
    getAllInfo: () => {
        return [
            {
            "name": {
                    "firstName": "vishal",
                    "lastName": "prajapati",
                    "middleName" :"bharatBhai",
                    "prefix" : "MR",
                    "nickName" : "vishal"
                },
            "Address" : {
                    "line1": "12322 data",
                    "line2": "data2",
                    "zipCode" : "33617",
                    "city" : "jersey",
                    "state" : "NJ",
                    "country" : "USA"
            },
            "friends" : [
                "friesnd1",
                "friends2"
            ],
            "hobbies": [
                "hobbies1",
                "hobbies2"
            ]   
         },
         {
            "name": {
                    "firstName": "vishal",
                    "lastName": "prajapati",
                    "middleName" :"bharatBhai",
                    "prefix" : "MR",
                    "nickName" : "vishal"
                },
            "Address" : {
                    "line1": "12322 data",
                    "line2": "data2",
                    "zipCode" : "33617",
                    "city" : "jersey",
                    "state" : "NJ",
                    "country" : "USA"
            },
            "friends" : [
                "friesnd1",
                "friends2"
            ],
            "hobbies": [
                "hobbies1",
                "hobbies2"
            ]   
         }
    ];
  }
}

var data = [ 
    {
    "name": {
            "firstName": "vishal",
            "lastName": "prajapati",
            "middleName" :"bharatBhai",
            "prefix" : "MR",
            "nickName" : "vishal"
        },
    "Address" : {
            "line1": "12322 data",
            "line2": "data2",
            "zipCode" : "33617",
            "city" : "jersey",
            "state" : "NJ",
            "country" : "USA"
    },
    "friends" : [
        "friesnd1",
        "friends2"
    ],
    "hobbies": [
        "hobbies1",
        "hobbies2"
    ]   
 }
];

app.use('/getUsers', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));

app.listen('3001', () => console.log('Server is up'));