import Button from "./Button";
import Header from "./Header";
import backArrowIcon from "../assets/icons/backArrow.svg";
import lightModeIcon from "../assets/icons/lightMode.svg";
import { useContext } from "react";
import { AppContext } from "@/clientFunctions/context/appContext";
import ContactEditOverlay from "./ContactEditOverlay";

interface props {
  children: JSX.Element;
}

export default function Layout({ children }: props) {
  const divCol = "divide-uicolor-60";
  const centerPadding = "px-6 max-xxs:px-2";

  const { contactEditOverlay } = useContext(AppContext);

  return (
    <main className={`flex flex-col h-screen divide-y ${divCol}`}>
      {contactEditOverlay.isOpen && (
        <ContactEditOverlay contact={contactEditOverlay.editedContact} />
      )}
      <div className={`h-full flex flex-row divide-x ${divCol}`}>
        {/*left column*/}
        <div className={`h-full grow divide-y ${divCol} flex-shrink min-w-fit`}>
          <div className="h-24"></div>
          <div className="h-24 flex flex-row justify-end items-center px-6 max-sm:px-1 max-sm:justify-center">
            <Button
              styleType="secondary"
              icon={backArrowIcon}
              className="shrink-0"
            />
          </div>
          <div></div>
        </div>

        {/*content*/}
        <div
          className={`flex flex-col max-w-3xl h-full m-auto grow divide-y ${divCol}`}
        >
          <div className="h-24 shrink-0"></div>
          <Header className={`h-24 ${centerPadding}`} />
          <div className={`py-3 ${centerPadding}`}>{children}</div>
        </div>

        {/*right column*/}
        <div className={`h-full grow divide-y ${divCol} shrink-0 min-w-fit`}>
          <div className="h-24"></div>
          <div className="h-24 flex flex-row justify-start items-center px-6 max-sm:px-1 max-sm:justify-center">
            <Button
              styleType="secondary"
              icon={lightModeIcon}
              className="shrink-0"
            />
          </div>
          <div></div>
        </div>
      </div>
    </main>
  );
}
