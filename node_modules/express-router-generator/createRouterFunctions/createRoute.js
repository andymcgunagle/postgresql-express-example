import routeTypeExtractor from './routeTypeExtractor.js';
import convertToCamelCase from './convertToCamelCase.js';

const createRoute = (routerName, routeNameKey, routeName) => {
  const routeType = routeTypeExtractor(routeNameKey);

  const camelCasedRouterName = convertToCamelCase(routerName);

  return (
    `// @route ${routeType.toUpperCase()} /${routerName}/${routeName}\n` +
    `// @desc\n` +
    `// @access\n` +
    `${camelCasedRouterName}.${routeType}('/${routeName}', (req, res) => {\n` +
    `  try {\n\n` +
    `  } catch (error) {\n` +
    `    console.error(error);\n` +
    `  };\n` +
    `});`
  );
};

export default createRoute;