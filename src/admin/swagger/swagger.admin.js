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
*        email:
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
*       format: int32
*    - in: query
*      name: limit
*      schema:
*       type: integer
*       format: int32
*    - in: query
*      name: activeStep
*      schema:
*       type: integer
*       enum: [0, 2]
*       format: int32
*      description: "Numeric ID of vendor active step status: 0 - Requested, 2 - Activated"
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