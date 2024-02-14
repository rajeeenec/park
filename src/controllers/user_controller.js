import User from "../schemas/user_schemas.js";
import sendEmail from "../utils/emailutils.js";
export async function getUser() {
  try {
    return await User.find();
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function createUser(users) {
  try {
    const user = new User({
      name: users.name,
      email: users.email,
      phone_no: users.phone_no,
    });
    const newuser = await user.save();

    // Send email notification
    await sendEmail(
      "rajkumarsivaraj97@gmail.com",
      "New user Created",
      `A new user "${newuser.name}" has been created.`
    );

    return newuser;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function Login() {
  try {
  } catch (err) {}
}
