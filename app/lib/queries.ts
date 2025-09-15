import { gql } from "@apollo/client";

export const GET_COLUMNS_WITH_TASKS = gql`
  query GetColumnsWithTasks {
    columns(order_by: { position: asc }) {
      id
      title
      position
      tasks(order_by: { position: asc }) {
        id
        title
        position
      }
    }
  }
`;

export const UPDATE_TASK_POSITION = gql`
  mutation UpdateTaskPosition($id: uuid!, $position: float8!, $column_id: uuid!) {
    update_tasks_by_pk(
      pk_columns: { id: $id }
      _set: { position: $position, column_id: $column_id }
    ) {
      id
      title
      position
      column_id
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: uuid!) {
    delete_tasks_by_pk(id: $id) {
      id
    }
  }
`;

export const ADD_TASK = gql`
  mutation AddTask($title: String!, $column_id: uuid!, $position: float8!) {
    insert_tasks_one(
      object: { title: $title, column_id: $column_id, position: $position }
    ) {
      id
      title
      position
      column_id
    }
  }
`;
