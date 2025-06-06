declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      TEST_MONGO_URI: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
      JWT_SECRET: string;
      PAYPAL_CLIENT_ID: string;
      PUBLIC_KEY: string;
      PRIVATE_KEY: string;
      END_POINT: string;
      SENDGRID_API_KEY: string;
    }
  }
  namespace Express {
    interface Request {
      user: {
        id: string;
      };
      orinialUrl: string;
      userModal: any;
      file: any;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
