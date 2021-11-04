import createAllRoutes from '../createAllRoutes.js';
import { template1, template2 } from '../templates.js';

const resultForTemplate1 = {
  routerName: 'my-router',
  postRouteName: '// @route POST /api/my-router/my-post-route\n' +
    '// @desc \n' +
    '// @access\n' +
    "myRouterRouter.post('/my-post-route', (req, res) => {\n" +
    '  try {\n' +
    '\n' +
    '  } catch (error) {\n' +
    '    console.error(error);\n' +
    '  };\n' +
    '});',
  additionalPostRouteName: '// @route POST /api/my-router/my-additional-post-route\n' +
    '// @desc \n' +
    '// @access\n' +
    "myRouterRouter.post('/my-additional-post-route', (req, res) => {\n" +
    '  try {\n' +
    '\n' +
    '  } catch (error) {\n' +
    '    console.error(error);\n' +
    '  };\n' +
    '});',
  getRouteName: '// @route GET /api/my-router/my-get-route\n' +
    '// @desc \n' +
    '// @access\n' +
    "myRouterRouter.get('/my-get-route', (req, res) => {\n" +
    '  try {\n' +
    '\n' +
    '  } catch (error) {\n' +
    '    console.error(error);\n' +
    '  };\n' +
    '});',
  additionalGetRouteName: '// @route GET /api/my-router/my-additional-get-route\n' +
    '// @desc \n' +
    '// @access\n' +
    "myRouterRouter.get('/my-additional-get-route', (req, res) => {\n" +
    '  try {\n' +
    '\n' +
    '  } catch (error) {\n' +
    '    console.error(error);\n' +
    '  };\n' +
    '});',
  putRouteName: '// @route PUT /api/my-router/my-put-route\n' +
    '// @desc \n' +
    '// @access\n' +
    "myRouterRouter.put('/my-put-route', (req, res) => {\n" +
    '  try {\n' +
    '\n' +
    '  } catch (error) {\n' +
    '    console.error(error);\n' +
    '  };\n' +
    '});',
  additionalPutRouteName: '// @route PUT /api/my-router/my-additional-put-route\n' +
    '// @desc \n' +
    '// @access\n' +
    "myRouterRouter.put('/my-additional-put-route', (req, res) => {\n" +
    '  try {\n' +
    '\n' +
    '  } catch (error) {\n' +
    '    console.error(error);\n' +
    '  };\n' +
    '});',
  deleteRouteName: '// @route DELETE /api/my-router/my-delete-route\n' +
    '// @desc \n' +
    '// @access\n' +
    "myRouterRouter.delete('/my-delete-route', (req, res) => {\n" +
    '  try {\n' +
    '\n' +
    '  } catch (error) {\n' +
    '    console.error(error);\n' +
    '  };\n' +
    '});',
  additionalDeleteRouteName: '// @route DELETE /api/my-router/my-additional-delete-route\n' +
    '// @desc \n' +
    '// @access\n' +
    "myRouterRouter.delete('/my-additional-delete-route', (req, res) => {\n" +
    '  try {\n' +
    '\n' +
    '  } catch (error) {\n' +
    '    console.error(error);\n' +
    '  };\n' +
    '});'
};

test('creates object with route strings', () => {
  expect(createAllRoutes(template1)).toStrictEqual(resultForTemplate1);
});

const resultForTemplate2 = {
  routerName: 'my-router',
  postRouteName: '// @route POST /api/my-router/my-post-route\n' +
    '// @desc \n' +
    '// @access\n' +
    "myRouterRouter.post('/my-post-route', (req, res) => {\n" +
    '  try {\n' +
    '\n' +
    '  } catch (error) {\n' +
    '    console.error(error);\n' +
    '  };\n' +
    '});',
  getRouteName: '// @route GET /api/my-router/my-get-route\n' +
    '// @desc \n' +
    '// @access\n' +
    "myRouterRouter.get('/my-get-route', (req, res) => {\n" +
    '  try {\n' +
    '\n' +
    '  } catch (error) {\n' +
    '    console.error(error);\n' +
    '  };\n' +
    '});',
  putRouteName: '// @route PUT /api/my-router/my-put-route\n' +
    '// @desc \n' +
    '// @access\n' +
    "myRouterRouter.put('/my-put-route', (req, res) => {\n" +
    '  try {\n' +
    '\n' +
    '  } catch (error) {\n' +
    '    console.error(error);\n' +
    '  };\n' +
    '});',
  deleteRouteName: '// @route DELETE /api/my-router/my-delete-route\n' +
    '// @desc \n' +
    '// @access\n' +
    "myRouterRouter.delete('/my-delete-route', (req, res) => {\n" +
    '  try {\n' +
    '\n' +
    '  } catch (error) {\n' +
    '    console.error(error);\n' +
    '  };\n' +
    '});'
};

test('creates object with route strings', () => {
  expect(createAllRoutes(template2)).toStrictEqual(resultForTemplate2);
});