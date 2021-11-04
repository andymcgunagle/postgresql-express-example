import createRoute from './createRoute.js';

const createAllRoutes = (template) => {
  const routerName = `${template['routerName']}`;
  const useStandardNames = `${template['useStandardNames']}`;

  const standardNames = {
    routerName,
    postRouteName: `post-${routerName}`,
    getRouteName: `get-${routerName}`,
    putRouteName: `update-${routerName}`,
    deleteRouteName: `delete-${routerName}`,
  };

  // Setting 'enumerable: false' ensures this property does not show up during enumeration of the properties on the corresponding object
  Object.defineProperty(template, 'routerName', {
    enumerable: false,
  });

  // Setting 'enumerable: false' ensures this property does not show up during enumeration of the properties on the corresponding object
  Object.defineProperty(standardNames, 'routerName', {
    enumerable: false,
  });

  if (useStandardNames && template['useStandardNames'] !== undefined) {
    for (const name in standardNames) {
      const routeNameKey = `${name}`;
      const routeName = `${standardNames[name]}`;

      const route = createRoute(routerName, routeNameKey, routeName);

      standardNames[name] = route;
    };

    return standardNames;
  };

  if (!useStandardNames || template['useStandardNames'] === undefined) {
    for (const property in template) {
      const routeNameKey = `${property}`;
      const routeName = `${template[property]}`;

      const route = createRoute(routerName, routeNameKey, routeName);

      template[property] = route;
    };

    return template;
  };
};

export default createAllRoutes;