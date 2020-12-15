/**
* 	@swagger
*
* /admin/login:
*  post:
*   tags:
*    - 'admin'
*   requestBody:
*    content:
*     application/json:
*      schema:
*       type: object
*       properties:
*        login:
*         type: string
*        password:
*         type: string
*   responses:
*    '200':
*     description: Successful operation
*
* /admin/vendors:
*  get:
*   tags:
*    - 'admin'
*   security:
*    - bearerAuth: []
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
* /admin/vendors/{id}:
*  get:
*   tags:
*    - 'admin'
*   security:
*    - bearerAuth: []
*   parameters:
*    - in: path
*      name: id
*      schema:
*       type: string
*      description: Provide vendor id.
*   responses:
*    '200':
*     description: Successful operation
*
*
* /admin/vendors/{id}/confirm:
*  put:
*   tags:
*    - 'admin'
*   summary: Confirm vendor application by admin
*   security:
*    - bearerAuth: []
*   parameters:
*    - in: path
*      name: id
*      schema:
*       type: string
*       required: true
*      description: Provide vendor id.
*   responses:
*    '200':
*     description: Successful operation
*
*/

// CATEGORY

/**
* 	@swagger
*
* /admin/category:
*  post:
*   tags:
*    - 'admin'
*   security:
*    - bearerAuth: []
*   requestBody:
*    content:
*     application/json:
*      schema:
*       type: object
*       properties:
*        name:
*         type: string
*         required: string
*        image:
*         type: string
*         required: string
*   responses:
*    '200':
*     description: Successful operation
*
* /admin/category/{id}:
*  put:
*   tags:
*    - 'admin'
*   security:
*    - bearerAuth: []
*   parameters:
*    - in: path
*      name: id
*      schema:
*       type: string
*       required: true
*   responses:
*    '200':
*     description: Successful operation
*
*/