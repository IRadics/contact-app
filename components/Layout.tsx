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

  const { contactEditOverlay } = useContext(AppContext);

  return (
    <main className={`flex flex-col h-screen divide-y ${divCol}`}>
      {contactEditOverlay.isOpen && (
        <ContactEditOverlay contact={contactEditOverlay.editedContact} />
      )}
      <div className={`h-full flex flex-row divide-x ${divCol}`}>
        {/*left column*/}
        <div className={`h-full grow divide-y ${divCol} shrink-0`}>
          <div className="h-24"></div>
          <div className="h-24 flex flex-row justify-end items-center px-6">
            <Button styleType="secondary" icon={backArrowIcon} />
          </div>
          <div></div>
        </div>

        {/*content*/}
        <div
          className={`flex flex-col max-w-3xl h-full m-auto grow divide-y ${divCol}`}
        >
          <div className="h-24"></div>
          <Header />
          {children}
        </div>

        {/*right column*/}
        <div className={`h-full grow divide-y ${divCol} shrink-0`}>
          <div className="h-24"></div>
          <div className="h-24 flex flex-row justify-start items-center px-6">
            <Button styleType="secondary" icon={lightModeIcon} />
          </div>
          <div></div>
        </div>
      </div>
    </main>
  );
}
