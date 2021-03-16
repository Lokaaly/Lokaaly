/**
* 	@swagger
*
* /paytabs/generate-url:
*  post:
*   tags:
*    - 'paytabs'
*   summary: 'Generate paytabs payment hosted page url'
*   security:
*    - bearerAuth: []
*   requestBody:
*    content:
*     application/json:
*      schema:
*       type: object
*       properties:
*        orderId:
*         type: string
*   responses:
*    '200':
*     description: Successful operation
*/