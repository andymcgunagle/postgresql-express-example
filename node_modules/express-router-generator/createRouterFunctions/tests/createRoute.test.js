import createRoute from '../createRoute.js';

const result1 = `// @route POST /api/myRouter/my-post-route
// @desc 
// @access
myRouterRouter.post('/my-post-route', (req, res) => {
  try {

  } catch (error) {
    console.error(error);
  };
});`;

test('creates route string', () => {
  expect(createRoute('myRouter', 'postRouteName', 'my-post-route')).toBe(result1);
});

const result2 = `// @route POST /api/myRouter/my-extra-post-route
// @desc 
// @access
myRouterRouter.post('/my-extra-post-route', (req, res) => {
  try {

  } catch (error) {
    console.error(error);
  };
});`;

test('creates route string', () => {
  expect(createRoute('myRouter', 'additionalPostRouteName', 'my-extra-post-route')).toBe(result2);
});