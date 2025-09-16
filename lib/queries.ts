import { gql } from "@apollo/client";

// ✅ Board query
export const GET_BOARD = gql`
  query GetBoard {
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

// ✅ Board subscription
export const BOARD_SUBSCRIPTION = gql`
  subscription BoardSubscription {
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

// ✅ Create column
export const CREATE_COLUMN = gql`
  mutation CreateColumn($title: String!, $position: Int!) {
    insert_columns_one(object: { title: $title, position: $position }) {
      id
      title
      position
    }
  }
`;

// ✅ Delete column
export const DELETE_COLUMN = gql`
  mutation DeleteColumn($id: uuid!) {
    delete_columns_by_pk(id: $id) {
      id
    }
  }
`;

// ✅ Create task
export const ADD_TASK = gql`
  mutation AddTask($title: String!, $column_id: uuid!, $position: Int!) {
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

// ✅ Update task position
export const UPDATE_TASK_POSITION = gql`
  mutation UpdateTaskPosition($id: uuid!, $column_id: uuid!, $position: Int!) {
    update_tasks_by_pk(
      pk_columns: { id: $id }
      _set: { column_id: $column_id, position: $position }
    ) {
      id
      column_id
      position
    }
  }
`;

// ✅ Delete task
export const DELETE_TASK = gql`
  mutation DeleteTask($id: uuid!) {
    delete_tasks_by_pk(id: $id) {
      id
    }
  }
`;

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
// lib/queries.ts