import { createContext } from "react";
import UserModel from "../../models/user.model";

const UserContext = createContext(new UserModel());

export default UserContext;
