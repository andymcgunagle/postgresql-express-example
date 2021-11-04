const routeTypeExtractor = (routeName) => {
  const routeNameRemoved = routeName.replace('RouteName', '');
  let additionalRemoved = routeNameRemoved.replace('additional', '');

  const routeType = additionalRemoved.toLowerCase();

  return routeType;
};

export default routeTypeExtractor;