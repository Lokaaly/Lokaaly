/**
* 	@swagger
*
* /tookan/agents/sign-up:
*  post:
*   tags:
*    - 'tookan'

*   summary: 'Send request for drivers registration in tookan platform'
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
*        carModel:
*         type: string
*        plateNumber:
*         type: string
*        fleetType:
*         type: string
*         enum: [capative, freelance]
*        transportType:
*         type: number
*         enum: [1,2,3,4,5,6]
*         description: 'Send 1 for Car, 2 for Motor Cycle, 3 for Bicycle, 4 for Scooter, 5 for Foot, 6 for Truck'
*        drivingLicense:
*         type: string
*         format: binary
*        passport:
*         type: string
*         format: binary
*       required:
*        - 'firstName'
*        - 'lastName'
*        - 'email'
*        - 'drivingLicense'
*        - 'passport'
*   responses:
*    '200':
*     description: Successful operation
*/

/**
* @swagger
* /tookan/agents:
*  get:
*   summary: 'Get tookan drivers list (admin)'
*   tags:
*    - 'tookan'
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
*/

/**
* @swagger
* /tookan/agents/{agentId}:
*  get:
*   summary: 'Get tookan driver by id'
*   tags:
*    - 'tookan'
*   security:
*    - bearerAuth: []
*   responses:
*    '200':
*     description: Successful operation
*   parameters:
*    - in: path
*      name: agentId
*      required: true
*      schema:
*       type: string
*      description: Provide driver id.
*  put:
*   summary: 'Update tookan driver'
*   tags:
*    - 'tookan'
*   security:
*    - bearerAuth: []
*   responses:
*    '200':
*     description: Successful operation
*   parameters:
*    - in: path
*      name: agentId
*      required: true
*      schema:
*       type: string
*      description: Provide driver id.
*   requestBody:
*    content:
*     application/json:
*      schema:
*       type: object
*       properties:
*        status:
*         type: string
*         enum: [verified]
*/