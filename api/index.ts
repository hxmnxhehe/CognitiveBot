import serverless from "serverless-http";
import app from "../server/index";

// Vercel serverless export
export const config = {
  api: {
    bodyParser: false
  }
};

export default serverless(app);