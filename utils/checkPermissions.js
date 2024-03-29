import { UnauthenticatedError } from "../errors/index.js";

export const checkPermission = (requestUser, actionUser) => {
  // if role === admin return
  if (requestUser.userId === actionUser.toString()) return;
  throw new UnauthenticatedError("You are not authorized to access this route");
};
