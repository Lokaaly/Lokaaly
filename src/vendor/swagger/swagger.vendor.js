/**
* 	@swagger
*
* /vendors/send-request:
*  post:
*   tags:
*    - 'vendors'
*   security:
*    - bearerAuth: []
*   summary: 'Send request for registration vendor in platform'
*   requestBody:
*    content:
*     application/json:
*      schema:
*       type: object
*       properties:
*        firstName:
*         type: string
*        lastName:
*         type: string
*        email:
*         type: string
*        phoneNumber:
*         type: string
*        country:
*         type: string
*        city:
*         type: string
*        vendor:
*         type: object
*         properties:
*          businessName:
*           type: string
*          businessType:
*           type: string
*          description:
*           type: string
*          socialMedia:
*           type: string
*          licence:
*           type: string
*         required:
*          - businessName
*          - businessType
*          - licence
*       required:
*        - firstName
*        - lastName
*        - email
*        - country
*        - city
*   responses:
*    '200':
*     description: Successful operation
*/

/**
* @swagger
* /vendors:
*  get:
*   summary: 'Get active vendors list (public)'
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
*/

/**
* 	@swagger
*
* /vendors/login:
*  post:
*   summary: 'Login for vendors'
*   tags:
*    - 'vendors'
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
*       required:
*        - login
*        - password
*   responses:
*    '200':
*     description: Successful operation
*/

/**
* @swagger
* /vendors/{id}:
*  get:
*   summary: 'Get active vendor by id'
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
*/

/**
* @swagger
* components:
*  securitySchemes:
*   bearerAuth:
*    type: http
*    scheme: bearer
*    bearerFormat: JWT
*
*/
