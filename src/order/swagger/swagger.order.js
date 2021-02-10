/**
* 	@swagger
*
* /orders:
*  get:
*   tags:
*    - 'orders'
*   security:
*    - bearerAuth: []
*   parameters:
*    - in: query
*      name: status
*      description: 'Order statuses: pending, rejected, accepted, paid'
*      schema:
*       type: string
*    - in: query
*      name: skip
*      schema:
*       type: integer
*    - in: query
*      name: limit
*      schema:
*       type: integer
*   summary: 'Get customer orders'
*   responses:
*    '200':
*     description: Successful operation
*
*  post:
*   tags:
*    - 'orders'
*   security:
*    - bearerAuth: []
*   summary: 'Make an order'
*   requestBody:
*    content:
*     application/json:
*      schema:
*       $ref: '#/components/schemas/Order_DTO'
*   responses:
*    '200':
*     description: Successful operation
*
* /orders/{orderId}:
*  get:
*   tags:
*    - 'orders'
*   security:
*    - bearerAuth: []
*   parameters:
*    - in: path
*      name: orderId
*      required: true
*      schema:
*       type: string
*      description: Get order detail
*   responses:
*    '200':
*     description: Successful operation
*
* components:
*  schemas:
*   Order_DTO:
*    type: object
*    properties:
*     products:
*      type: array
*      items:
*       type: object
*       properties:
*        productId:
*         type: string
*         summary: 'Provide product info details'
*        addons:
*         type: array
*         items:
*          type: object
*        quantity:
*         type: number
*        orderDate:
*         type: Date
*        comment:
*         type: string
*     shippingAddressId:
*      type: string
*     paymentMethod:
*      type: number
*/