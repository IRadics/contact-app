import Head from "next/head";
import React, { useContext, useEffect } from "react";
import ContactListItem from "@/components/ContactListItem";
import { AppContext } from "@/clientFunctions/context/appContext";

export default function Home() {
  const {
    api: { fetchContacts, contacts },
  } = useContext(AppContext);

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Contact App</title>
        <meta
          name="description"
          content="Contact app for UX studio dev challenge"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex flex-col gap-6">
          {contacts &&
            contacts.map((contact) => {
              return (
                <ContactListItem
                  contact={contact}
                  key={contact.id}
                ></ContactListItem>
              );
            })}
        </div>
      </main>
    </>
  );
}
