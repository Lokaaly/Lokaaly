/**
* 	@swagger
*
* /users/login:
*  post:
*   tags:
*    - 'users'
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
* /users/sign-up:
*  post:
*   tags:
*    - 'users'
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
*        password:
*         type: string
*   responses:
*    '200':
*     description: Successful operation
*
* /users/verify:
*  get:
*   summary: 'Verify customer account by generated 6 digits code send by email'
*   tags:
*    - 'users'
*   security:
*    - bearerAuth: []
*   parameters:
*    - in: query
*      name: code
*      schema:
*       type: string
*      description: 6 digits for verifing account.
*   responses:
*    '200':
*     description: Successful operation
*
* /users/profile:
*  get:
*   summary: 'Get user (customer) profile by bearer token'
*   tags:
*    - 'users'
*   security:
*    - bearerAuth: []
*   responses:
*    '200':
*     description: Successful operation
*/