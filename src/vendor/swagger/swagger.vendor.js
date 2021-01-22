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
*     multipart/form-data:
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
*        vendor.businessName:
*         type: string
*        vendor.businessType:
*         type: string
*        vendor.description:
*         type: string
*        vendor.socialMedia:
*         type: string
*        license:
*         type: string
*         format: binary
*       required:
*        - 'firstName'
*        - 'lastName'
*        - 'email'
*        - 'country'
*        - 'city'
*        - 'vendor.businessName'
*        - 'vendor.businessType'
*        - 'license'
*   responses:
*    '200':
*     description: Successful operation
*/

/**
* 	@swagger
*
* /vendors/password:
*  put:
*   tags:
*    - 'vendors'
*   security:
*    - bearerAuth: []
*   summary: 'Update password'
*   requestBody:
*    content:
*     application/json:
*      schema:
*       type: object
*       properties:
*        password:
*         type: string
*       required:
*        - password
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
*    - in: query
*      name: search
*      schema:
*       type: string
*   responses:
*    '200':
*     description: Successful operation
*
*  put:
*   summary: 'Update vendor page'
*   tags:
*    - 'vendors'
*   security:
*    - bearerAuth: []
*   requestBody:
*    content:
*     multipart/form-data:
*      schema:
*       type: object
*       properties:
*        businessName:
*         type: string
*        businessType:
*         type: string
*        description:
*         type: string
*        socialMedia:
*         type: string
*        $pushImages:
*         type: array
*         items:
*          type: string
*          format: binary
*        $pullImages:
*         type: array
*         items:
*          type: string
*        license:
*         type: array
*         items:
*          type: string
*          format: binary
*         description: 'Support in pdf format'
*        profileImage:
*         type: array
*         items:
*          type: string
*          format: binary
*        backgroundImage:
*         type: string
*         description: 'Provide photo id from photos'
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
*        email:
*         type: string
*        password:
*         type: string
*       required:
*        - email
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
