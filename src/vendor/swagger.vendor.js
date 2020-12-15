/**
* 	@swagger
*
* /vendors:
*  get:
*   tags:
*    - 'vendors'
*   parameters:
*    - in: query
*      name: skip
*      schema:
*       type: integer
*    - in: query
*      name: limit
*      schema:
*       type: integer
*   responses:
*    '200':
*     description: Successful operation
*
* /vendors/{id}:
*  get:
*   tags:
*    - 'vendors'
*   responses:
*    '200':
*     description: Successful operation

*   parameters:
*    - in: path
*      name: id
*      required: true
*      schema:
*       type: string
*      description: Provide vendor id.
*
* components:
*  securitySchemes:
*   bearerAuth:
*    type: http
*    scheme: bearer
*    bearerFormat: JWT
*
*/
