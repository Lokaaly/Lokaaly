/**
* 	@swagger
* /products:
*  get:
*   tags:
*    - 'product'
*   parameters:
*    - in: query
*      name: skip
*      schema:
*       type: integer
*    - in: query
*      name: limit
*      schema:
*       type: integer
*    - in: query
*      name: vendorId
*      required: true
*      schema:
*       type: string
*   summary: Retrieve products from specified vendor
*   responses:
*    '200':
*     description: Successful operation
*  post:
*   tags:
*    - 'product'
*   security:
*    - bearerAuth: []
*   responses:
*    '200':
*     description: Successful operation
*  put:
*   tags:
*    - 'product'
*   security:
*    - bearerAuth: []
*   responses:
*    '200':
*     description: Successful operation
*
*
*
*
* /products/{id}:
*  get:
*   tags:
*    - 'product'
*   parameters:
*    - in: path
*      name: id
*      required: true
*      schema:
*       type: string
*      description: Provide product id
*   responses:
*    '200':
*     description: Successful operation
*  delete:
*   tags:
*    - 'product'
*   security:
*    - bearerAuth: []
*   parameters:
*    - in: path
*      name: id
*      required: true
*      schema:
*       type: string
*      description: Provide product id
*   responses:
*    '200':
*     description: Successful operation
*
*/