import routeTypeExtractor from '../routeTypeExtractor.js';

test('extracts the type of route', () => {
  expect(routeTypeExtractor('postRouteName')).toBe('post');
});

test('extracts the type of route', () => {
  expect(routeTypeExtractor('additionalGetRouteName')).toBe('get');
});