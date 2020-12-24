/**
* 	@swagger
*
* /users/shipping-address:
*  post:
*   tags:
*    - 'users_shipping-address'
*   security:
*    - bearerAuth: []
*   requestBody:
*    content:
*     application/json:
*      schema:
*       $ref: '#/components/schemas/AddShippingAddressDTO'
*   summary: 'Create new shipping address'
*   responses:
*    '200':
*     description: Successful operation
*
*  put:
*   tags:
*    - 'users_shipping-address'
*   security:
*    - bearerAuth: []
*   summary: 'Update shipping address by id'
*   requestBody:
*    content:
*     application/json:
*      schema:
*       $ref: '#/components/schemas/UpdateShippingAddressDTO'
*   responses:
*    '200':
*     description: Successful operation
*
* /users/shipping-address/{id}:
*  delete:
*   tags:
*    - 'users_shipping-address'
*   security:
*    - bearerAuth: []
*   summary: 'Delete shipping address by id'
*   parameters:
*    - in: path
*      name: id
*      required: true
*      schema:
*       type: string
*      description: Provide shipping address id
*   responses:
*    '200':
*     description: Successful operation
*
*
* components:
*  schemas:
*   AddShippingAddressDTO:
*    type: object
*    properties:
*     firstName:
*      type: string
*     lastName:
*      type: string
*     city:
*      type: string
*     state:
*      type: string
*     address1:
*      type: string
*     address2:
*      type: string
*     zip:
*      type: string
*     phoneNumber:
*      type: string
*    required:
*     - "city"
*     - "address1"
*     - "phoneNumber"
*
*   UpdateShippingAddressDTO:
*    type: object
*    properties:
*     _id:
*      type: string
*     firstName:
*      type: string
*     lastName:
*      type: string
*     city:
*      type: string
*     state:
*      type: string
*     address1:
*      type: string
*     address2:
*      type: string
*     zip:
*      type: string
*     phoneNumber:
*      type: string
*    required:
*     - "_id"
*/