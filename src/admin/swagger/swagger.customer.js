/**
* 	@swagger
*
* /admin/customers:
*  get:
*   tags:
*    - 'admin'
*   security:
*    - bearerAuth: []
*   parameters:
*    - in: query
*      name: skip
*      schema:
*       type: integer
*       format: int32
*    - in: query
*      name: limit
*      schema:
*       type: integer
*       format: int32
*    - in: query
*      name: email
*      description: 'Filter by email'
*      schema:
*       type: string
*    - in: query
*      name: status
*      schema:
*       type: integer
*       enum: [0, 1]
*       format: int32
*      description: "Numeric value status: 0 - unverified, 1 - verified"
*    - in: query
*      name: sortDate
*      schema:
*       type: string
*       enum: ['asc', 'desc']
*      description: "String values for sorting by user created dates"
*   responses:
*    '200':
*     description: Successful operation
*
* /admin/customers/{id}:
*  get:
*   tags:
*    - 'admin'
*   security:
*    - bearerAuth: []
*   parameters:
*    - in: path
*      name: id
*      schema:
*       type: string
*      description: Provide vendor id.
*   responses:
*    '200':
*     description: Successful operation
*
*/