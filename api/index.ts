import serverless from "serverless-http";
import app from "../server/index";

// Vercel serverless export
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true
  }
};

// Wrap the Express app for serverless
const handler = serverless(app, {
  binary: ['image/*', 'font/*', 'audio/*', 'video/*']
});

export default handler;