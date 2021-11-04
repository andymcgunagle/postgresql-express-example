import createAllRoutes from './createAllRoutes.js';
import convertToCamelCase from './convertToCamelCase.js';

export const createRouterTemplate = (template) => {
  const {
    routerName,
    postRouteName,
    additionalPostRouteName,
    getRouteName,
    additionalGetRouteName,
    putRouteName,
    additionalPutRouteName,
    deleteRouteName,
    additionalDeleteRouteName,
  } = createAllRoutes(template);

  const camelCasedRouterName = convertToCamelCase(routerName);

  return (
    `import express from 'express';\n\n` +
    `const ${camelCasedRouterName} = express.Router();\n\n` +
    `${postRouteName !== undefined ? postRouteName : ''}\n\n` +
    `${additionalPostRouteName !== undefined ? `${additionalPostRouteName}\n\n` : ''}` +
    `${getRouteName !== undefined ? getRouteName : ''}\n\n` +
    `${additionalGetRouteName !== undefined ? `${additionalGetRouteName}\n\n` : ''}` +
    `${putRouteName !== undefined ? putRouteName : ''}\n\n` +
    `${additionalPutRouteName !== undefined ? `${additionalPutRouteName}\n\n` : ''}` +
    `${deleteRouteName !== undefined ? deleteRouteName : ''}\n\n` +
    `${additionalDeleteRouteName !== undefined ? `${additionalDeleteRouteName}\n\n` : ''}` +
    `export default ${camelCasedRouterName};`
  );
};

export default createRouterTemplate;