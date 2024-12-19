import { getEventById, getItemsByEventId } from "@/app/_lib/dataFetching";
import EventDetailsContent from "@/components/EventDetailsContent";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export default async function EventDetailsPage(props) {
  const params = await props.params;
  const event = await getEventById(params.eventId);
  const items = await getItemsByEventId(params.eventId);
  const token = (await cookies()).get("token")?.value;
  let isSuperUser = false;
  if (!token) {
    redirect("/login");
  }
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

  return (
    <EventDetailsContent
      event={event}
      items={items}
      isSuperUser={isSuperUser}
    />
  );
}
