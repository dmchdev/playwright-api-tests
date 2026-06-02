export const member_schema = {
  "type": "object",
  "properties": {
    "id": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "age": {
      "type": "number"
    },
    "friends": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "pet": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "name"
      ]
    },
    "status": {
      "type": "string"
    }
  },
  "required": [
    "id",
    "name",
    "age",
    "friends",
    "pet",
    "status"
  ]
}