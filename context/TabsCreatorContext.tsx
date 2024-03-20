import React, { createContext } from "react";
import { ISavedTabs } from "../types/SavedTabs";
import { useToast } from "@chakra-ui/react";
import { ITabs } from "../types/Tabs";
import scarboroughFair from "../data/scarborough-fair.json";
import myHeartWillGoOn from "../data/my-heart-will-go-on.json";
import drunkenSailor from "../data/drunken-sailor.json";
import greensleeves from "../data/greensleeves.json";
import hallelujah from "../data/hallelujah.json";
import concerningHobbits from "../data/concerning-hobbits.json";

interface ITabsCreatorContext {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  tabs: string;
  setTabs: React.Dispatch<React.SetStateAction<string>>;
  currentTabId: number | null;
  setCurrentTabId: React.Dispatch<React.SetStateAction<number | null>>;
  isLyricsVisible: boolean;
  setIsLyricsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isNotesVisible: boolean;
  setIsNotesVisible: React.Dispatch<React.SetStateAction<boolean>>;
  tabSize: number;
  setTabSize: React.Dispatch<React.SetStateAction<number>>;
  verticalSpacing: number;
  setVerticalSpacing: React.Dispatch<React.SetStateAction<number>>;
  horizontalSpacing: number;
  setHorizontalSpacing: React.Dispatch<React.SetStateAction<number>>;
  savedTabs: ISavedTabs[];
  setSavedTabs: React.Dispatch<React.SetStateAction<ISavedTabs[]>>;
  preMadeTabs: ITabs[];
}

export const TabsCreatorContext = createContext<ITabsCreatorContext>({
  title: "",
  setTitle: () => {},
  tabs: "",
  setTabs: () => {},
  currentTabId: null,
  setCurrentTabId: () => {},
  isLyricsVisible: false,
  setIsLyricsVisible: () => {},
  isNotesVisible: false,
  setIsNotesVisible: () => {},
  tabSize: 10,
  setTabSize: () => {},
  verticalSpacing: 30,
  setVerticalSpacing: () => {},
  horizontalSpacing: 5,
  setHorizontalSpacing: () => {},
  savedTabs: [],
  setSavedTabs: () => {},
  preMadeTabs: [],
});

export const TabsCreatorProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [title, setTitle] = React.useState<string>("");
  const [tabs, setTabs] = React.useState<string>("");
  const [currentTabId, setCurrentTabId] = React.useState<number | null>(null);
  const [isLyricsVisible, setIsLyricsVisible] = React.useState<boolean>(true);
  const [isNotesVisible, setIsNotesVisible] = React.useState<boolean>(true);
  const [tabSize, setTabSize] = React.useState<number>(10);
  const [verticalSpacing, setVerticalSpacing] = React.useState<number>(30);
  const [horizontalSpacing, setHorizontalSpacing] = React.useState<number>(5);
  const [savedTabs, setSavedTabs] = React.useState<ISavedTabs[]>([]);
  const preMadeTabs = [scarboroughFair, myHeartWillGoOn, hallelujah, greensleeves, drunkenSailor, concerningHobbits];
  const toast = useToast();

  const addNewSavedTabs = () => {
    const newTab = { id: Date.now(), title, tabs };
    localStorage.setItem("savedTabs", JSON.stringify([...savedTabs, newTab]));
    setSavedTabs([...savedTabs, newTab]);
    setCurrentTabId(newTab.id);
    toast({
      title: "Successfully saved tabs" + (title ? " for " + title : ""),
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom-right",
    });
  };

  return (
    <TabsCreatorContext.Provider
      value={{
        title,
        setTitle,
        tabs,
        setTabs,
        currentTabId,
        setCurrentTabId,
        isLyricsVisible,
        setIsLyricsVisible,
        isNotesVisible,
        setIsNotesVisible,
        tabSize,
        setTabSize,
        verticalSpacing,
        setVerticalSpacing,
        horizontalSpacing,
        setHorizontalSpacing,
        savedTabs,
        setSavedTabs,
        preMadeTabs,
      }}
    >
      {children}
    </TabsCreatorContext.Provider>
  );
};
