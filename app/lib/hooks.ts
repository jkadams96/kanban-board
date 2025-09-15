"use client";

import { useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  ADD_TASK,
  BOARD_SUBSCRIPTION,
  CREATE_COLUMN,
  DELETE_COLUMN,
  DELETE_TASK,
  GET_BOARD,
  UPDATE_TASK_POSITION,
} from "lib/queries";

// ✅ useBoardQuery
export function useBoardQuery() {
  return useQuery(GET_BOARD);
}

// ✅ useBoardSubscription
export function useBoardSubscription() {
  return useSubscription(BOARD_SUBSCRIPTION);
}

// ✅ useCreateColumn
export function useCreateColumn() {
  return useMutation(CREATE_COLUMN);
}

// ✅ useDeleteColumn
export function useDeleteColumn() {
  return useMutation(DELETE_COLUMN);
}

// ✅ useAddTask
export function useAddTask() {
  return useMutation(ADD_TASK);
}

// ✅ useUpdateTaskPosition
export function useUpdateTaskPosition() {
  return useMutation(UPDATE_TASK_POSITION);
}

// ✅ useDeleteTask
export function useDeleteTask() {
  return useMutation(DELETE_TASK);
}
