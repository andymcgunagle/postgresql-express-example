import createNewRouter from "./createRouterFunctions/createNewRouter.js";

const expressRouterGenerator = {
  createNewRouter,
};

// // TEST
// const newTemplate1 = {
//   routerName: 'user',
//   postRouteName: `post-user`,
//   getRouteName: `get-user`,
//   putRouteName: `update-user`,
//   deleteRouteName: `delete-user`,
// };

// const newTemplate2 = {
//   routerName: 'newUser',
//   useStandardNames: true,
// };

// expressRouterGenerator.createNewRouter(newTemplate1);

export default expressRouterGenerator;