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


// ------------ RESET PASSWORD ---------------
/**
* 	@swagger
*
* /users/forget-password:
*  post:
*   tags:
*    - 'reset_password'
*   summary: 'Step 1'
*   parameters:
*    - in: query
*      name: email
*      schema:
*       type: string
*      description: Send reset code to the provided email.
*   responses:
*    '200':
*     description: Successful operation
*
* /users/validate-reset-code:
*  post:
*   tags:
*    - 'reset_password'
*   summary: 'Step 2'
*   requestBody:
*    content:
*     application/json:
*      schema:
*       type: object
*       properties:
*        email:
*         type: string
*        code:
*         type: string
*   responses:
*    '200':
*     description: Successful operation
*
* /users/change-password:
*  post:
*   tags:
*    - 'reset_password'
*   summary: 'Step 3'
*   requestBody:
*    content:
*     application/json:
*      schema:
*       type: object
*       properties:
*        newPassword:
*         type: string
*        resetToken:
*         type: string
*   responses:
*    '200':
*     description: Successful operation
*/


// ------------ SOCIAL MEDIA OAUTH ---------------
/**
* 	@swagger
*
* /users/facebook:
*  post:
*   tags:
*    - 'social_oauth'
*   requestBody:
*    content:
*     application/json:
*      schema:
*       type: object
*       properties:
*        userId:
*         type: string
*        accessToken:
*         type: string
*   responses:
*    '200':
*     description: Successful operation
*
* /users/google:
*  post:
*   tags:
*    - 'social_oauth'
*   requestBody:
*    content:
*     application/json:
*      schema:
*       type: object
*       properties:
*        idToken:
*         type: string
*   responses:
*    '200':
*     description: Successful operation
*/