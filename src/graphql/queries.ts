import { gql } from "@apollo/client";

export const GET_USERS = gql`
query Query {
  getUsers {
    _id
    firstName
    lastName
    email
    role
  }
}
`

export const GET_GROUPS = gql`
query Query {
  getGroups {
    name
    _id
    members {
      uid
      permission
    }
  }
}
`