const { db } = require("../pgAdaptor");
const { GraphQLObjectType, GraphQLID } = require("graphql");
const { ProductType, ProductsType } = require("./types");

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    type: "Query",
    fields: {
      getproduct: {
        type: ProductType,
        args: { id: { type: GraphQLID } },
        resolve(parentValue, args) {
          const query = `SELECT * FROM product WHERE id=${args.id}`;
          const values = [args.id];
          return db
            .one(query, values)
            .then(res => res)
            .catch(err => err);
        }
      },
      getallproducts: {
        type: ProductsType,
        args: { },
        resolve(parentValue, args) {
          const query = `SELECT id,name,description FROM product`;
          const values = args;
  
          return db
          .any(query, values)
          .then(res => res)
          .catch(err => err);
        }
      }
    }
  });
  
  exports.query = RootQuery;