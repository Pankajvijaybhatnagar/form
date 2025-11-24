"use client";

import { useEffect, useState } from "react";
import EventForm from "@/components/events/EventForm";
import eventServices from "@/lib/services/eventServices";
import { useAuth } from "@/context/AuthContext";

export default function Page({ params }) {
  const { slug } = params;
  const { access_token } = useAuth();
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await eventServices.getAdminEvents({ slug }, access_token);
      const data = res?.data?.data?.[0]
      //modify decode uri description before setting to state
      data.description = decodeURIComponent(data.description);
      setEventData(data);
    }
    if (access_token) load();
  }, [slug, access_token]);

  if (!eventData) return <div>Loading...</div>;

  return <EventForm mode="edit" eventData={eventData} />;
}
