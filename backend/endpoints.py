import json
import uuid
from flask import Flask
from flask import request

app = Flask(__name__)

MEMBERS = {}

@app.route("/members", methods=['GET', 'POST', 'PUT'])
def members():
    if request.method == 'POST':
        return post_members(request.json)
    elif request.method == 'GET':
        return get_members()
    elif request.method == 'PUT':
        return update_members(request.json)
    else:
        return f"{request.method} request not allowed"

@app.route("/member", methods=['GET', 'POST', 'PUT', 'DELETE'])
def member():
    if request.method == 'POST':
        return post_member(request.json)
    elif request.method == 'GET':
        return get_member(request.args.get('id'))
    elif request.method == 'PUT':
        return update_member(request.args.get('id'), request.json)
    elif request.method == 'DELETE':
        return delete_member(
            request.args.get('id'), request.args.get('permanently', '0'))
    else:
        return f"{request.method} request not allowed"

def post_members(data):
    """
    data: 
    [
      { 
      "name": "John",
      "age": 40,
      "friends": ["Jim", "Jack"],
      "pet": {
          "type": "dog",
          "name": "Buddy"
      },
      "status": "active"
      }
    ]
    """
    response = {}
    for member in data:
        member['id'] = str(uuid.uuid4())
        MEMBERS[member['id']] = member
        response[member['id']] = member

    return response

def get_members():
    return MEMBERS

def update_members(data):
    """
    data: 
    [
      { 
      "id": "00"
      "name": "John",
      "age": 40,
      "friends": ["Jim", "Jack"],
      "pet": {
          "type": "dog",
          "name": "Buddy"
      },
      "status": "active"
      }
    ]
    """
    response = {}

    for member in data:
        MEMBERS[member['id']] = member
        response[member['id']] = member
    return response


def post_member(data):
    """
    data:
    { 
      "name": "John",
      "age": 40,
      "friends": ["Jim", "Jack"],
      "pet": {
          "type": "dog",
          "name": "Buddy"
      },
      "status": "active"
      }
    """
    data['id'] = str(uuid.uuid4())
    MEMBERS[data['id']] = data
    return data

def get_member(memberId):
    return MEMBERS[memberId]

def update_member(memberId, data):
    """
    data: 
      { 
      "name": "John",
      "age": 40,
      "friends": ["Jim", "Jack"],
      "pet": {
          "type": "dog",
          "name": "Buddy"
      },
      "status": "active"
      }
    """
    MEMBERS[memberId] = data
    return MEMBERS[memberId]

def delete_member(memberId, permanently='0'):
    if permanently == '0':
        MEMBERS[memberId]["status"] = "deleted"
        return {"deleted_id": memberId}
    elif permanently == '1':
        del MEMBERS[memberId]
        return {"permanently_deleted_id": memberId}