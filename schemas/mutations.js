const graphql = require("graphql");
const db = require("../pgAdaptor").db;
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = graphql;
const { ProductType } = require("./types");

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  type: "Mutation",
  fields: {
    addProduct: {
      type: ProductType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const query = `INSERT INTO product( name, description) VALUES ( '${args.name}', '${args.description}') RETURNING name,description `;
        return db.one(query)
               .then(data => {
                  return data;
               })
               .catch(err => {
                  return 'The error is', err;
               });
      }
    },
    updateProduct: {
        type: ProductType,
        args: {
          name: { type: GraphQLString },
          description: { type: GraphQLString },
          id: { type: GraphQLID}
        },
        resolve(parentValue, args) {
          const query = `UPDATE product SET name='${args.name}', description='${args.description}' WHERE id=${args.id} RETURNING name,description  `;
          return db.one(query)
                 .then(data => {
                    return data;
                 })
                 .catch(err => {
                    return 'The error is', err;
                 });
        }
      },
      deleteProduct: {
        type: ProductType,
        args: {
          id: { type: GraphQLID}
        },
        resolve(parentValue, args) {
          const query = `DELETE FROM product WHERE id=${args.id} RETURNING name,description  `;
          return db.one(query)
                 .then(data => {
                    return data;
                 })
                 .catch(err => {
                    return 'The error is', err;
                 });
        }
      }
  }
});

exports.mutation = RootMutation;


