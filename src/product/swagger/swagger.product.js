/**
* 	@swagger
* /products:
*  get:
*   tags:
*    - 'product'
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
*      name: vendorId
*      schema:
*       type: string
*   summary: Retrieve products with filter
*   responses:
*    '200':
*     description: Successful operation
*
*  post:
*   tags:
*    - 'product'
*   security:
*    - bearerAuth: []
*   requestBody:
*    content:
*     multipart/form-data:
*      schema:
*       type: object
*       properties:
*        categoryId:
*         type: string
*        images:
*         type: array
*         items:
*          type: string
*          format: binary
*        title:
*         type: string
*        description:
*         type: string
*        price:
*         type: integer
*        addons:
*         type: string
*         default: [{"title": "Souces","selectType": "checkbox","options": [{"name":"Cheese","price": 1}]}]
*       required:
*        - "categoryId"
*        - "title"
*        - "description"
*        - "price"
*   responses:
*    '200':
*     description: Successful operation
*
*
*  put:
*   tags:
*    - 'product'
*   security:
*    - bearerAuth: []
*   requestBody:
*    content:
*     multipart/form-data:
*      schema:
*       type: object
*       properties:
*        productId:
*         type: string
*        categoryId:
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
*        title:
*         type: string
*        description:
*         type: string
*        price:
*         type: integer
*        addons:
*         type: string
*         description: 'Provide modified addons array'
*         default: [{"title": "Souces","selectType": "checkbox","options": [{"name":"Cheese","price": 1}]}]
*       required:
*        - "productId"
*   responses:
*    '200':
*     description: Successful operation
*
*
* /products/{id}:
*  get:
*   tags:
*    - 'product'
*   parameters:
*    - in: path
*      name: id
*      required: true
*      schema:
*       type: string
*      description: Provide product id
*   responses:
*    '200':
*     description: Successful operation
*
*  delete:
*   tags:
*    - 'product'
*   security:
*    - bearerAuth: []
*   parameters:
*    - in: path
*      name: id
*      required: true
*      schema:
*       type: string
*      description: Provide product id
*   responses:
*    '200':
*     description: Successful operation
*/

/**
* 	@swagger
*
* /products/favourites/{id}:
*  put:
*   tags:
*    - 'product'
*   security:
*    - bearerAuth: []
*   parameters:
*    - in: path
*      name: id
*      required: true
*      schema:
*       type: string
*      description: Set or Unset favourite product
*   responses:
*    '200':
*     description: Successful operation
*
* /products/favourites:
*  get:
*   tags:
*    - 'product'
*   security:
*    - bearerAuth: []
*   responses:
*    '200':
*     description: Successful operation
*/