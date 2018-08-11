
import * as Swagger from 'swagger-json';
import * as SwaggerUi from 'swagger-ui-express';
import * as fs from 'fs';

export function Doc(app: any, info?: any) {
    Swagger.swaggerDoc.createJsonDoc(info);

    app._router.stack.forEach((middleware: any) => {
        if (middleware.route) { // routes registered directly on the app
            const { path, stack } = middleware.route;
            if (path) {
                stack.forEach((routeMehtod: any) => {
                    if (routeMehtod.name == 'validateRequest') {
                        const joiSchema = routeMehtod.handle('schemaBypass');
                        Swagger.swaggerDoc.addNewRoute(joiSchema, path, routeMehtod.method)
                    }
                })
            }
        } else if (middleware.name === 'router') { // router middleware
            middleware.handle.stack.forEach((handler: any) => {
                const { path, stack } = handler.route;
                if (path) {
                    stack.forEach((routeMehtod: any) => {
                        if (routeMehtod.name == 'validateRequest') {
                            const joiSchema = routeMehtod.handle('schemaBypass');
                            Swagger.swaggerDoc.addNewRoute(joiSchema, middleware.prefix + path, routeMehtod.method)
                        }
                    })
                }
            });
        }
    });

    const swaggerDocument = fs.readFileSync('./swagger.json', 'utf8');

    app.use('/', SwaggerUi.serve, SwaggerUi.setup(JSON.parse(swaggerDocument)));
}
