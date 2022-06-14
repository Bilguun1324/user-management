import { gql } from "@apollo/client";

export const ADD_USER = gql`
mutation Mutation($firstName: String, $email: String, $lastName: String, $role: String) {
  addUser(firstName: $firstName, email: $email, lastName: $lastName, role: $role) {
    _id
    firstName
    lastName
    email
    role
  }
}
`

export const ADD_GROUP = gql`
mutation AddGroup($name: String, $members: [member], $description: String) {
  addGroup(name: $name, members: $members, description: $description) {
    _id
    name
    description
    members {
      uid
      permission
    }
  }
}
`

export const INVITE_USER_TO_GROUP = gql`
mutation Mutation($uid: String, $permission: String, $id: String) {
  inviteUser(uid: $uid, permission: $permission, _id: $id) {
    _id
    name
    members {
      uid
      permission
    }
  }
}
`