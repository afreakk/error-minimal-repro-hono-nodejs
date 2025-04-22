"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_server_1 = require("@hono/node-server");
var zod_openapi_1 = require("@hono/zod-openapi");
var zod_openapi_2 = require("@hono/zod-openapi");
var zod_openapi_3 = require("@hono/zod-openapi");
var ParamsSchema = zod_openapi_1.z.object({
    id: zod_openapi_1.z
        .string()
        .min(3)
        .openapi({
        param: {
            name: 'id',
            in: 'path',
        },
        example: '1212121',
    }),
});
var UserSchema = zod_openapi_1.z
    .object({
    id: zod_openapi_1.z.string().openapi({
        example: '123',
    }),
    name: zod_openapi_1.z.string().openapi({
        example: 'John Doe',
    }),
    age: zod_openapi_1.z.number().openapi({
        example: 42,
    }),
})
    .openapi('User');
var route = (0, zod_openapi_2.createRoute)({
    method: 'get',
    path: '/users/{id}',
    request: {
        params: ParamsSchema,
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: UserSchema,
                },
            },
            description: 'Retrieve the user',
        },
    },
});
var app = new zod_openapi_3.OpenAPIHono();
app.openapi(route, function (c) {
    var id = c.req.valid('param').id;
    return c.json({
        id: id,
        age: 20,
        name: 'Ultra-man',
    });
});
app.get('/', function (c) {
    return c.text('Hello Hono!');
});
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: 3000,
}, function (info) {
    console.log("Server is running on http://localhost:".concat(info.port));
});
