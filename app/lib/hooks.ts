import { useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  BOARD_SUBSCRIPTION,
  CREATE_COLUMN,
  CREATE_TASK,
  DELETE_COLUMN,
  DELETE_TASK,
  GET_BOARD,
  UPDATE_TASK,
} from "./queries";

export function useBoard() {
  return useQuery(GET_BOARD);
}

export function useBoardSubscription() {
  return useSubscription(BOARD_SUBSCRIPTION);
}

export function useCreateColumn() {
  return useMutation(CREATE_COLUMN);
}

export function useCreateTask() {
  return useMutation(CREATE_TASK);
}

export function useUpdateTask() {
  return useMutation(UPDATE_TASK);
}

export function useDeleteColumn() {
  return useMutation(DELETE_COLUMN);
}

export function useDeleteTask() {
  return useMutation(DELETE_TASK);
}
