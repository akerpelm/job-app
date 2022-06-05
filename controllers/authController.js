import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const emailIsTaken = await User.findOne({ email });
  if (emailIsTaken) {
    throw new BadRequestError("An account with this email already exists.");
  }

  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    token,
    location: user.location,
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password.");
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const isPassword = await user.validatePassword(password);
  if (!isPassword) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const token = user.createJWT();
  user.password = undefined; //omit password
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
  res.send("login user");
};

const updateUser = async (req, res) => {
  res.send("updateUser");
};

export { register, login, updateUser };
