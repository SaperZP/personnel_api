import {Request, Response} from 'express';
import PersonnelModel from "../models/Personnel.model";
import ErrorResponse from "../helpers/ErrorResponse";

const login = async (req: Request, res: Response) => {
  const {username, password} = req.body;

  if (!username || !password) {
    throw new ErrorResponse(401, 'Please, enter a username and password');
  }

  const user = await PersonnelModel.findOne({username});

  if (!user) {
    throw new ErrorResponse(401, 'Invalid credentials');
  }

  const match = await user.checkPassword(password);
  if (!match) {
    throw new ErrorResponse(401, 'Invalid credentials');
  }

  req.session = {id: user._id}

  res.status(200).send({
    error: false,
    user
  })

}
const logout = async (req: Request, res: Response) => {
  req.session = null;
  res.status(200).send({
    error: false,
    message: "Logout: Sessions Deleted!"
  })
}

export default {login, logout}
