import { asyncHandler } from "../utils/asyncHandler.js";
// async handler is nothing but higher order function which accepts the
// which accepts the other function.
const registerUser = asyncHandler(async (req, res) => {

   console.log("Register route hit"); // Debugging
    
   res.status(200).json({
    message: "ok",
  });
});
// method to bana dia maga execute jab hoga jab koi url hit hoga.


export { registerUser }