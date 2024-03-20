import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ISavedTabs } from "../types/SavedTabs";
import { useToast } from "@chakra-ui/react";
import { ITabs } from "../types/Tabs";

// Import the pre-made tabs
import scarboroughFair from "../data/scarborough-fair.json";
import myHeartWillGoOn from "../data/my-heart-will-go-on.json";
import drunkenSailor from "../data/drunken-sailor.json";
import greensleeves from "../data/greensleeves.json";
import hallelujah from "../data/hallelujah.json";
import concerningHobbits from "../data/concerning-hobbits.json";

interface ITabsCreatorContext {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  tabs: string;
  setTabs: Dispatch<SetStateAction<string>>;
  currentTabId: number | null;
  setCurrentTabId: Dispatch<SetStateAction<number | null>>;
  isLyricsVisible: boolean;
  setIsLyricsVisible: Dispatch<SetStateAction<boolean>>;
  isNotesVisible: boolean;
  setIsNotesVisible: Dispatch<SetStateAction<boolean>>;
  tabSize: number;
  setTabSize: Dispatch<SetStateAction<number>>;
  verticalSpacing: number;
  setVerticalSpacing: Dispatch<SetStateAction<number>>;
  horizontalSpacing: number;
  setHorizontalSpacing: Dispatch<SetStateAction<number>>;
  savedTabs: ISavedTabs[];
  setSavedTabs: Dispatch<SetStateAction<ISavedTabs[]>>;
  preMadeTabs: ITabs[];
  updateSavedTabs: () => void;
  addNewSavedTabs: () => void;
  loadSavedTabs: (id: number) => () => void;
  changeTabs: (tabs: ITabs) => () => void;
  deleteSavedTabs: (id: number) => () => void;
  handleClearConfirmation: () => void;
  showClearConfirmation: boolean;
  canSaveTabs: () => boolean;
  canSaveNewTabs: () => boolean;
  toggleIsNotesVisible: () => void;
  toggleIsLyricsVisible: () => void;
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
  updateSavedTabs: () => {},
  addNewSavedTabs: () => {},
  preMadeTabs: [],
  loadSavedTabs: () => () => {},
  changeTabs: () => () => {},
  deleteSavedTabs: () => () => {},
  handleClearConfirmation: () => false,
  showClearConfirmation: false,
  canSaveTabs: () => false,
  canSaveNewTabs: () => false,
  toggleIsNotesVisible: () => {},
  toggleIsLyricsVisible: () => {},
});

export const TabsCreatorProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [title, setTitle] = useState<string>("");
  const [tabs, setTabs] = useState<string>("");
  const [currentTabId, setCurrentTabId] = useState<number | null>(null);
  const [isLyricsVisible, setIsLyricsVisible] = useState<boolean>(true);
  const [isNotesVisible, setIsNotesVisible] = useState<boolean>(true);
  const [tabSize, setTabSize] = useState<number>(10);
  const [verticalSpacing, setVerticalSpacing] = useState<number>(30);
  const [horizontalSpacing, setHorizontalSpacing] = useState<number>(5);
  const [savedTabs, setSavedTabs] = useState<ISavedTabs[]>(() => {
    const saved = localStorage.getItem("savedTabs");
    return saved ? JSON.parse(saved) : [];
  });
  const [showClearConfirmation, setShowClearConfirmation] = useState<boolean>(false);
  const preMadeTabs = useMemo(
    () => [scarboroughFair, myHeartWillGoOn, hallelujah, greensleeves, drunkenSailor, concerningHobbits],
    []
  );
  const toast = useToast();

  useEffect(() => setShowClearConfirmation(false), [title, tabs]);

  /**
   * Adds a new tab to the savedTabs array and updates the localStorage.
   */
  const addNewSavedTabs = useCallback(() => {
    const newTab = { id: Date.now(), title, tabs };
    try {
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
    } catch (error) {
      let errorTitle = "Error";
      let errorDescription = "An unexpected error occurred.";

      if (error instanceof DOMException && error.name === "QuotaExceededError") {
        errorTitle = "Storage not available";
        errorDescription = "LocalStorage is not available in your browser mode or settings.";
      }

      toast({
        title: errorTitle,
        description: errorDescription,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  }, [savedTabs, title, tabs, toast]);

  /**
   * Updates the current tab's title and content in both the local state and localStorage.
   */
  const updateSavedTabs = useCallback(() => {
    const savedTabs = localStorage.getItem("savedTabs") ? JSON.parse(localStorage.getItem("savedTabs")!) : [];
    const newSavedTabs = savedTabs.map((tab: { id: number; title: string; tabs: string }) => {
      if (tab.id === currentTabId) {
        tab.title = title;
        tab.tabs = tabs;
      }
      return tab;
    });

    try {
      localStorage.setItem("savedTabs", JSON.stringify(newSavedTabs));
      setSavedTabs(newSavedTabs);
      toast({
        title: "Successfully updated tabs" + (title ? " for " + title : ""),
        status: "success",
        position: "bottom-right",
      });
    } catch (error) {
      let errorTitle = "Error";
      let errorDescription = "An unexpected error occurred.";

      if (error instanceof DOMException && error.name === "QuotaExceededError") {
        errorTitle = "Storage not available";
        errorDescription = "LocalStorage is not available in your browser mode or settings.";
      }

      toast({
        title: errorTitle,
        description: errorDescription,
        status: "error",
        position: "bottom-right",
      });
    }
  }, [currentTabId, title, tabs, toast]);

  /**
   * Loads the saved tabs from the localStorage and sets the current tab's title and content.
   *
   * @param id
   */
  const loadSavedTabs = useCallback(
    (id: number) => () => {
      const savedTabs = localStorage.getItem("savedTabs") ? JSON.parse(localStorage.getItem("savedTabs")!) : [];
      const tab = savedTabs.find((tab: { id: number }) => tab.id === id);
      setTitle(tab.title);
      setTabs(tab.tabs);
      setCurrentTabId(tab.id);
    },
    [savedTabs]
  );

  /**
   * Changes the current tab's title and content to the selected pre-made tabs.
   *
   * @param tabs
   */
  const changeTabs = (tabs: ITabs) => () => {
    setTitle(tabs.title);
    setTabs(tabs.tabs);
    setCurrentTabId(null);
  };

  /**
   * Deletes the selected tab from the savedTabs array and updates the localStorage.
   *
   * @param id
   */
  const deleteSavedTabs = useCallback(
    (id: number) => () => {
      const savedTabs = localStorage.getItem("savedTabs") ? JSON.parse(localStorage.getItem("savedTabs")!) : [];
      const newSavedTabs = savedTabs.filter((tab: { id: number }) => tab.id !== id);
      localStorage.setItem("savedTabs", JSON.stringify(newSavedTabs));
      setSavedTabs(newSavedTabs);
      if (id === currentTabId) {
        setTitle("");
        setTabs("");
        setCurrentTabId(null);
      }
      toast({
        title: "Successfully deleted tabs",
        status: "error",
        position: "bottom-right",
      });
    },
    [currentTabId, toast]
  );

  /**
   * Clears the current tab's title and content.
   */
  const handleClearConfirmation = () => {
    setShowClearConfirmation(!showClearConfirmation);
    if (showClearConfirmation) {
      setTitle("");
      setTabs("");
      setCurrentTabId(null);
    }
  };

  /**
   * Returns true if the current tab's title and content are not empty.
   */
  const canSaveNewTabs = () => {
    if (canSaveTabs() && currentTabId) {
      const tab = savedTabs.find((tab: { id: number }) => tab.id === currentTabId);
      if (tab && (tab.title !== title || tab.tabs !== tabs)) {
        return true;
      }
    }
    return false;
  };

  /**
   * Returns true if the current tab's title and content are not empty.
   */
  const canSaveTabs = () => title !== "" || tabs !== "";

  /**
   * Updates the savedTabs array with the localStorage data.
   */
  const toggleIsNotesVisible = () => setIsNotesVisible((isNotesVisible) => !isNotesVisible);

  /**
   * Updates the savedTabs array with the localStorage data.
   */
  const toggleIsLyricsVisible = () => setIsLyricsVisible((isLyricsVisible) => !isLyricsVisible);

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
        updateSavedTabs,
        addNewSavedTabs,
        loadSavedTabs,
        changeTabs,
        deleteSavedTabs,
        handleClearConfirmation,
        showClearConfirmation,
        canSaveTabs,
        canSaveNewTabs,
        toggleIsNotesVisible,
        toggleIsLyricsVisible,
      }}
    >
      {children}
    </TabsCreatorContext.Provider>
  );
};
