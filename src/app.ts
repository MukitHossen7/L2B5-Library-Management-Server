import express, { Request, Response } from "express";
import cors from "cors";
import routes from "./routes";

export const app = express();

//middleware
app.use([
  cors({
    origin: [
      "http://localhost:5173",
      "https://library-management-mukit.vercel.app",
    ],
    credentials: true,
  }),
  express.json(),
]);

//routes
app.use(routes);

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "This is Library Management API",
  });
});
