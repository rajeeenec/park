import express from "express";
const router = express.Router();
import admin from "firebase-admin";
import { getUser, createUser } from "../controllers/user_controller.js";
const serviceAccount = {
  type: "service_account",
  project_id: "test1-5f966",
  private_key_id: "77f02ab14dc488e11c72788d78d4468fe4651900",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDDGTGa2U0J//tT\ndKXaZYlBlgX6hxObXRFB0MczmGsqGO1xTHOj0ITFaw4f4Ijcdwp2UzDsvrQOZnjQ\n11SHmxmRaoCpf5UZi25dPQ8xLC7uk8zJmdjjV+ZksJODFjZd+6YnfNVlNICiPg2w\noHW6gzwiK4SuXIH36DG1CgeKHFTxpteXSiI8eEkjivc0Tw9gRop1BG48CSCYLkZr\nly1YyESzhd3ewOeAjdsfQLSXGkQRN7vWeaTEY046zXkARQ20zForUyFCBShhYdu8\nioIbtRtIylMcd59umk3Vm7Sb0LaXMOyQMgo1hv+MA47revp41bJpDTWmKDDxyvzq\nXzG9mWdbAgMBAAECggEAPsstlZbqPlU3KanKNexnTIZCX1u5elBunP3bF6avm0mR\npt1B/RBAo5/s2GK2+iqQYfwtq41Hu7jMmv8rdEf95zldtvBa53FisLzV1nBPnLdS\nevK7BZVFkNPqbo8oKYC0/lGmB2BqJI4PbvF+Yu0ZXjAekNYyeL2xvgC/43px9qK5\nOxzMEN8VKdCofp1XOsxm81ziZ4yCNaDO1Ry9A+Xdfx2EYvKndTa8tBCThzO73KTB\nq+3iwfqcEwH6b4Qw1vBsDZ2kWQokRtUu3v2MjwKKAihKAXWokSfBkY6kytdrYLX4\n+2sFNWvVYADsV5nhiNT8cqMG481uYh2JkKSy0WorAQKBgQD7HPGU1qQWJ2yi7oHA\nmznseRvk48q7buRvzfxOkIOBp8InoohXYBXdzbvvkqoayDjn9EmmtwKHUFjNcDUG\nllQG0TWpjaXEaRTsclkZnfdJbKmXpx2IeA74xUveReKpr5K935QIVrFJHnXugJCu\nHoE/tgB6c6sZX1oBLIEVaBPgWwKBgQDG5S7CIna63ZwQpSXZ2gT687ZRmMY0cabY\nr5WQqIufLUwdAD+MdQh2dGOpBv7oyAzlY1rbJLfQFu3Y3j54OqQ/WcdrsYCiaxTW\nbqn6HyYdMcb1ABThnp4u+1mDBnbG4cnEn/QvxvlcHEvQBcR2FNep8Wg1ltdJsFvP\nJOWQG7dFAQKBgQDjaCTHG1Jh1bYmH0RV/r0ID+1Y7YltEFHDhpFVPL47Loc/iYtb\nRWLICUaHARUXR/dw5+PDHL0neXXSJil/G6hgvBmSwPo70sXmEu/pqQqG7ebvtaGj\nMsasN1ArrLJF5QBI/y56FrhadUFrifZ8GJgH8HSicBmk0psZsQn9LtHBPQKBgQCA\nGegtvUi/PjBgQB3K3DLM9t78Wut9p52QfjZUf1m94czd+OT1MAONV5VArnLLtt0n\neQBxmIqTCdGTFkEh6pMTAl4ArMhu040ONyRfJmTD9OVxsuXAEwtKszSJwUYK/i2X\n6HW7t+mvO8JQbwaEDxSALi2yJj7vBRl8pwT79f3qAQKBgASqYmEWoZWLvXmLgPJw\nOXghmbJ5dGBU9NMgUpGeDj6/13bMA2ywuDWrJUh0YcrKSq5Jjg45673Zmqmwk6CR\nbBpCJQGUiTr1xpHC2M3O3d6T3rYsEIGFvs2zK23S8wqaCS7qnmmgxTl/7yJUo77S\ngNboyxmwk43kFPLAG0zij+Vj\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-ysutc@test1-5f966.iam.gserviceaccount.com",
  client_id: "101981982052750273730",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ysutc%40test1-5f966.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
router.get("/list", async (req, res) => {
  try {
    const user = await getUser();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().getUserByEmail(email);

    const customToken = await admin.auth().createCustomToken(userRecord.uid);

    res.json({ token: customToken });
  } catch (error) {
    console.error("Error logging in: ", error.message);
    res.status(400).json({ error: error.message });
  }
});

export default router;
