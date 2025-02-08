import UserModel from "../model/UsersModel.js";
import { Cookie_EXPIRE_TIME } from '../config/config.js';
import { EncodeToken } from '../utility/tokenUtility.js';



export const registerService = async (req) => {
  try {
    let reqBody = req.body;
    let existingUser = await UserModel.find({ email: reqBody.email });

    if (existingUser.length > 0) {
      return { status: false, msg: "User exist" };
    }

    let data = await UserModel.create(reqBody);
    return { status: true, data: data, msg: "Register success." };
  } catch (e) {
    return { status: false, error: e };
  }
};


export const loginService = async (req, res) => {
    try {
      
      let existingUser = await UserModel.findOne({email: req.body.email});
      if (!existingUser) {
        return { status: false, msg: "User not found" };
      }

      let reqBody = req.body;
      let data = await UserModel.aggregate([
        { $match: reqBody},
        { $project: {_id: 1, email: 1}},
      ])

      if(data.length === 1){
        let token = EncodeToken(data[0]["email"]);
        let options = {
          maxAge: Cookie_EXPIRE_TIME,
          httpOnly: false,
          sameSite:"none",
          secure: true,
          path: "/",
        };
        
              res.cookie("token", token, options);
              return { status: true, msg: "Login successful" };
      }else{
        return { status: false, msg: "Invalid credentials" };
      }
    } catch (e) {
      return { status: false, error: e.toString() };
    }
  };


  export const logoutService = async (req, res) => {
    try {
      res.clearCookie("token");
      return { status: true, msg: "Logout success." };
    } catch (e) {
      return { status: false, error: e };
    }
  };
  



