import { Contact } from "@/types/Contact";

import { createContext, useReducer } from "react";

type AppContextData = {
  contactEditOverlay: {
    isOpen: boolean;
    contact?: Contact;
  };
};
const initialState: AppContextData = {
  contactEditOverlay: {
    isOpen: false,
  },
};

export const AppContext = createContext<AppContextType>({} as AppContextType);

type ActionType = "OPEN_CONTACT_EDIT" | "CLOSE_CONTACT_EDIT";

type AppContextAction = {
  type: ActionType;
  data?: Contact;
};

const actions = {
  OPEN_CONTACT_EDIT: "ADD_TODO_ITEM",
  CLOSE_CONTACT_EDIT: "REMOVE_TODO_ITEM",
};

const reducer = (
  state: AppContextData,
  action: AppContextAction
): AppContextData => {
  switch (action.type) {
    case "OPEN_CONTACT_EDIT": {
      return {
        ...state,
        contactEditOverlay: { isOpen: true, contact: action.data },
      };
    }
    case "CLOSE_CONTACT_EDIT": {
      return {
        ...state,
        contactEditOverlay: { isOpen: false, contact: undefined },
      };
    }
    default:
      return state;
  }
};

type AppContextType = {
  appContextData: AppContextData;

  openContactEditOverlay: (contact?: Contact) => void;
  closeContactEditOverlay: () => void;
  isContactEditOverlayOpen: boolean;
};

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value: AppContextType = {
    appContextData: state,
    openContactEditOverlay: (contact?: Contact) => {
      dispatch({ type: "OPEN_CONTACT_EDIT", data: contact });
    },
    closeContactEditOverlay() {
      dispatch({ type: "CLOSE_CONTACT_EDIT" });
    },
    isContactEditOverlayOpen: state.contactEditOverlay.isOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
