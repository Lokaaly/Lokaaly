/**
* 	@swagger
*
* /cart:
*  get:
*   tags:
*    - 'cart'
*   security:
*    - bearerAuth: []
*   summary: 'Get customer cart data info'
*   responses:
*    '200':
*     description: Successful operation
*
*  post:
*   tags:
*    - 'cart'
*   security:
*    - bearerAuth: []
*   summary: 'Add to cart'
*   requestBody:
*    content:
*     application/json:
*      schema:
*       $ref: '#/components/schemas/AddToCartDTO'
*   responses:
*    '200':
*     description: Successful operation
*
*  put:
*   tags:
*    - 'cart'
*   security:
*    - bearerAuth: []
*   summary: 'Update product in cart'
*   parameters:
*    - in: path
*      name: cartProductId
*      required: true
*      schema:
*       type: string
*      description: Provide cart product id - _id
*   requestBody:
*    content:
*     application/json:
*      schema:
*       type: object
*       properties:
*        orderDate:
*         type: Date
*        comment:
*         type: string
*        quantity:
*         type: number
*        addons:
*         type: array
*         items:
*          type: object
*   responses:
*    '200':
*     description: Successful operation
*
*  delete:
*   tags:
*    - 'cart'
*   security:
*    - bearerAuth: []
*   parameters:
*    - in: query
*      name: productId
*      schema:
*       type: string
*   summary: 'Clear cart'
*   responses:
*    '200':
*     description: Successful operation
*
* components:
*  schemas:
*   AddToCartDTO:
*    type: object
*    properties:
*     productId:
*      type: string
*     addons:
*      type: array
*      items:
*       $ref: '#/components/schemas/AddonDTO_AddToCart'
*     size:
*      type: string
*     quantity:
*      type: number
*     comment:
*      type: string
*     orderDate:
*      type: Date
*    required:
*     - "productId"
*     - "quantity"
*     - "orderDate"
*
*   AddonDTO_AddToCart:
*    type: object
*    properties:
*     _id:
*      type: string
*      summary: 'Provide addon id'
*     options:
*      type: array
*      items:
*       type: string
*       summary: 'Provide option ids'
*/