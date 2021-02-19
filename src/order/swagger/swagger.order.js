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
*      name: vendorId
*      description: 'Accepted roles - [admin]'
*      schema:
*       type: string
*    - in: query
*      name: customerId
*      description: 'Accepted roles - [admin, vendor]'
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
*   summary: 'Get customer orders - ROLES [admin, vendor, customer]'
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
*   summary: 'Get order by id - ROLES [admin, vendor, customer]'
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
*        comment:
*         type: string
*     shippingAddressId:
*      type: string
*     deliveryDate:
*      type: Date
*     paymentMethod:
*      type: number
*/