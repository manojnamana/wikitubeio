import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import cookie from 'cookie';

type AuthResponse = {
  access?: string;
  error?: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { username, password }: { username: string; password: string } = req.body;

    try {
      const response = await axios.post<AuthResponse>(
        `/api/token/`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.access) {
        res.setHeader("Set-Cookie", [
          cookie.serialize("access", response.data.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 15,
            sameSite: "lax",
            path: "/",
          }),
        ]);

        return res.status(200).json({
          success: true,
        });
      } else {
        res.status(response.status).json({
          error: "Authentication failed",
        });
      }
    } catch (error: any) {
      res.status(error.response?.status || 500).json({
        error: error.response?.data?.error || "An error occurred",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
