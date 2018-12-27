import { userSaveAction, userGetAction, userUpdateAction, userDeleteAction } from "./controller/UserAction";

/**
 * All application routes.
 */
export const AppRoutes = [
  {
    path: "/users",
    method: "post",
    action: userSaveAction
  },
  {
    path: "/users/:id",
    method: "get",
    action: userGetAction
  },
  {
    path: '/users/:id',
    method: 'put',
    action: userUpdateAction
  },
  {
    path: '/users/:id',
    method: 'del',
    action: userDeleteAction
  }
];