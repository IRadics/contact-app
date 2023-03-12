import { Contact, ContactPayload } from "@/types/Contact";

import { createContext, useReducer } from "react";
import createContact from "../api/createContact";
import deleteContact from "../api/deleteContact";
import getContacts from "../api/getContacts";
import updateContact from "../api/updateContact";

type AppContextData = {
  contactEditOverlay: {
    isOpen: boolean;
    contact?: Contact;
  };
  contacts: Contact[];
};
const initialState: AppContextData = {
  contactEditOverlay: {
    isOpen: false,
  },
  contacts: [],
};

export const AppContext = createContext<AppContextType>({} as AppContextType);

type ActionType =
  | "OPEN_CONTACT_EDIT"
  | "CLOSE_CONTACT_EDIT"
  | "FETCH_CONTACTS"
  | "DELETE_CONTACT"
  | "UPDATE_CONTACT"
  | "CREATE_CONTACT";

type AppContextAction = {
  type: ActionType;
  data?: Contact | Contact[];
};

const reducer = (
  state: AppContextData,
  action: AppContextAction
): AppContextData => {
  switch (action.type) {
    case "OPEN_CONTACT_EDIT": {
      return {
        ...state,
        contactEditOverlay: { isOpen: true, contact: action.data as Contact },
      };
    }
    case "CLOSE_CONTACT_EDIT": {
      return {
        ...state,
        contactEditOverlay: { isOpen: false, contact: undefined },
      };
    }

    case "FETCH_CONTACTS": {
      return {
        ...state,
        contacts: action.data as Contact[],
      };
    }

    default:
      return state;
  }
};

type AppContextType = {
  api: {
    contacts: Contact[];
    fetchContacts: () => void;
    deleteContact: (contactId: number) => Promise<boolean>;
    updateContact: (contact: ContactPayload) => Promise<boolean>;
    createContact: (contact: ContactPayload) => Promise<boolean>;
  };

  contactEditOverlay: {
    open: (contact?: Contact) => void;
    close: () => void;
    isOpen: boolean;
    editedContact?: Contact;
  };
};

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //reusable fetch method defined here to use it after update/delete/create
  const fetchContacts = () => {
    getContacts().then((contacts) => {
      dispatch({ type: "FETCH_CONTACTS", data: contacts });
    });
  };

  const value: AppContextType = {
    contactEditOverlay: {
      open: (contact?: Contact) => {
        dispatch({ type: "OPEN_CONTACT_EDIT", data: contact });
      },
      close() {
        dispatch({ type: "CLOSE_CONTACT_EDIT" });
      },
      isOpen: state.contactEditOverlay.isOpen,
      editedContact: state.contactEditOverlay.contact,
    },

    api: {
      contacts: state.contacts,
      fetchContacts: fetchContacts,

      createContact: async (contact: ContactPayload) => {
        return await createContact(contact)
          .then(() => {
            fetchContacts();
            return true;
          })
          .catch((error) => {
            throw error;
          })
          .catch(() => {
            return false;
          });
      },

      updateContact: async (contact: ContactPayload) => {
        return await updateContact(contact)
          .then(() => {
            fetchContacts();
            return true;
          })
          .catch((error) => {
            throw error;
          })
          .catch(() => {
            return false;
          });
      },
      deleteContact: async (contactId: number) => {
        return await deleteContact(contactId)
          .then((deleted) => {
            fetchContacts();
            return true;
          })
          .catch((error) => {
            throw error;
          })
          .catch(() => {
            return false;
          });
      },
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
