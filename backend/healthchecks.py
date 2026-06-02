import requests
import random


def generate_member():
    random_string = ''.join(random.choices(
        "1234567890QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm", k=6))
    return { 
      "name": "John_"+ random_string,
      "age": 40,
      "friends": ["Jim", "Jack"],
      "pet": {
          "type": "dog",
          "name": "Buddy_" + random_string
      },
      "status": "active" # also inactive, deleted
    }


def test_get_members():
    print("test_get_members")
    return requests.get("http://127.0.0.1:5000/members")


def test_get_member():
    member_data = members.generate_member()
    new_member = requests.post(
        "http://127.0.0.1:5000/member",
        json=member_data).json()
    member_id = new_member['id']

    print("test_get_member")
    return requests.get(f"http://127.0.0.1:5000/member?id={member_id}")


def test_post_members():
    new_members_data = []
    for i in range(3):
        new_members_data.append(members.generate_member())
    print("test_post_members")
    return requests.post(
        "http://127.0.0.1:5000/members",
        json=new_members_data)
    


def test_post_member():
    new_member_data = members.generate_member()
    print("test_post_member")
    return requests.post(
        "http://127.0.0.1:5000/member",
        json=new_member_data)


def test_update_members():
    new_members_data = []
    for i in range(2):
        new_members_data.append(members.generate_member())
    new_members = requests.post(
        "http://127.0.0.1:5000/members",
        json=new_members_data).json()
    updated_new_members = []
    for k in new_members.keys():
        new_members[k]["name"] += "_UPDATED"
        updated_new_members.append(new_members[k])

    print("test_update_members")
    return requests.put(
        "http://127.0.0.1:5000/members",
        json=updated_new_members)


def test_update_member():
    new_member_data = members.generate_member()
    new_member = requests.post(
        "http://127.0.0.1:5000/member",
        json=new_member_data).json()
    new_member["name"] += "_UPDATED"
    member_id = new_member['id']

    print("test_update_member")
    return requests.put(
        f"http://127.0.0.1:5000/member?id={member_id}",
        json=new_member)


def test_soft_delete_member():
    print("test_soft_delete_member")
    new_member_data = members.generate_member()
    new_member = requests.post(
        "http://127.0.0.1:5000/member",
        json=new_member_data).json()
    member_id = new_member['id']
    print(">>>>>>>>>>>>")
    print(new_member)
    print("<<<<<<<<<<<<")

    return requests.delete(
        f"http://127.0.0.1:5000/member?id={member_id}")


def test_permanently_delete_member():
    print("test_permanently_delete_member")
    new_member_data = members.generate_member()
    new_member = requests.post(
        "http://127.0.0.1:5000/member",
        json=new_member_data).json()
    member_id = new_member['id']
    print(">>>>>>>>>>>>")
    print(new_member)
    print("<<<<<<<<<<<<")

    return requests.delete(
        f"http://127.0.0.1:5000/member?id={member_id}&permanently=1")

# test_get_member()
# test_post_members()
# test_post_member()
# test_update_members()
# test_update_member()
# test_soft_delete_member()
# test_permanently_delete_member()
test_get_members()