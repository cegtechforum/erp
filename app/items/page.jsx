import { jwtVerify } from "jose";
import toast from "react-hot-toast";
import Items from "@/components/Items";
import { cookies } from "next/headers";

async function SuperUserCheck({ children, req }) {
  const token = (await cookies()).get("token")?.value;
  let isSuperUser = false;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      isSuperUser = payload.isSuperUser;
    } catch (error) {
      console.error("Token verification failed:", error);
      toast.error(error.message || "Error occured");
    }
  }

  return <Items isSuperUser={isSuperUser} />;
}

export default SuperUserCheck;
