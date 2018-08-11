
import * as Swagger from 'swagger-json';
import * as SwaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import { regexpToPath } from './helper';

export function Doc(app: any, settings?: any) {
    const {info, host, basePath, documentationPath} = settings;

    Swagger.swaggerDoc.createJsonDoc(info, host, basePath);

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
        } else if (middleware.name === 'router' && middleware.handle.stack) { // router middleware
            
            middleware.handle.stack.forEach((handler: any) => {
                if(!handler.route) {
                    return;
                }

                const { path, stack } = handler.route;
                if (path) {
                    stack.forEach((routeMehtod: any) => {
                        if (routeMehtod.name == 'validateRequest') {
                            const joiSchema = routeMehtod.handle('schemaBypass');
                            Swagger.swaggerDoc.addNewRoute(joiSchema, regexpToPath(middleware.regexp) + path, routeMehtod.method)
                        }
                    })
                }
            });
        }
    });

    const swaggerDocument = fs.readFileSync('./swagger.json', 'utf8');

    let docPath = documentationPath || '/';

    app.use(docPath, SwaggerUi.serve, SwaggerUi.setup(JSON.parse(swaggerDocument)));
}
