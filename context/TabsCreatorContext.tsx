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
  handleTabsChange: (tabs: string) => void;
  parsedLines: ParsedLine[];
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
  handleSave: () => void;
  addNewSavedTabs: () => void;
  loadSavedTabs: (id: number) => void;
  changeTabs: (tabs: ITabs) => void;
  deleteSavedTabs: (id: number) => void;
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
  handleTabsChange: () => {},
  parsedLines: [],
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
  handleSave: () => {},
  addNewSavedTabs: () => {},
  preMadeTabs: [],
  loadSavedTabs: () => {},
  changeTabs: () => {},
  deleteSavedTabs: () => {},
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
  const [parsedLines, setParsedLines] = useState<ParsedLine[]>([]);
  const [currentTabId, setCurrentTabId] = useState<number | null>(null);
  const [isLyricsVisible, setIsLyricsVisible] = useState<boolean>(true);
  const [isNotesVisible, setIsNotesVisible] = useState<boolean>(true);
  const [tabSize, setTabSize] = useState<number>(10);
  const [verticalSpacing, setVerticalSpacing] = useState<number>(30);
  const [horizontalSpacing, setHorizontalSpacing] = useState<number>(5);
  const [savedTabs, setSavedTabs] = useState<ISavedTabs[]>([]);
  const [showClearConfirmation, setShowClearConfirmation] = useState<boolean>(false);
  const preMadeTabs = useMemo(
    () => [scarboroughFair, myHeartWillGoOn, hallelujah, greensleeves, drunkenSailor, concerningHobbits],
    []
  );
  const toast = useToast();

  useEffect(() => setShowClearConfirmation(false), [title, tabs]);
  useEffect(() => {
    const saved = localStorage.getItem("savedTabs");
    if (saved) {
      setSavedTabs(JSON.parse(saved));
    }
  }, []);

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
    (id: number) => {
      const savedTabs = localStorage.getItem("savedTabs") ? JSON.parse(localStorage.getItem("savedTabs")!) : [];
      const tab = savedTabs.find((tab: { id: number }) => tab.id === id);
      setTitle(tab.title);
      setTabs(tab.tabs);
      setCurrentTabId(tab.id);
    },
    [savedTabs]
  );

  /**
   * Handles the tabs textarea input change.
   */
  const handleTabsChange = (tabs: string) => parseTabs(tabs);

  /**
   * Parse the tabs data and set the parsedLines state.
   * @param tabs The tabs data to parse.
   * @returns The parsed lines.
   */
  const parseTabs = useCallback((tabs: string) => {
    const parseInput = tabs.split("\n").map((line) => {
      if (line.startsWith("---")) {
        return { type: "header", content: line.substring(3).trim() } as HeaderLine;
      } else if (line.startsWith("--")) {
        return { type: "lyrics", content: line.substring(2).trim().split(" ") } as LyricsLine;
      } else if (line.startsWith("-")) {
        return { type: "comment", content: line.substring(1).trim() } as CommentLine;
      } else {
        // Split the line by spaces to process individual groups
        const content = line
          .trim()
          .split(/(\s+)/)
          .filter((str) => str !== " ")
          .flatMap(
            (group) =>
              group
                .split("")
                .map((character) => parseNoteDetail(character))
                .filter((noteDetail) => noteDetail !== null) // Filter out nulls (invalid notes)
          );

        return {
          type: "notes",
          content,
        } as NotesLine;
      }
    });

    setParsedLines(parseInput);
    setTabs(tabs);
  }, []);

  /**
   * Parses a note string into a NoteDetail object.
   * @param noteString The note string to parse.
   * @returns The parsed note detail.
   */
  const parseNoteDetail = (noteString: string): NoteDetail | null => {
    // This regex now strictly matches valid single notes, including sharp (#) and octave indicators (+ or ++)
    const validNoteRegex = /^([abcdefg]#?\+{0,2}| $)/;
    if (validNoteRegex.test(noteString)) {
      return {
        note: noteString.replace(/#|\+{1,2}/g, ""), // Remove sharp and octave indicators for simplicity
        sharp: noteString.includes("#"),
        octaveShift: (noteString.match(/\+/g) || []).length, // Count '+' for octave shift
      };
    }
    return null; // Return null for non-matching, indicating an invalid note
  };

  /**
   * Changes the current tab's title and content to the selected pre-made tabs.
   * @param tabs
   */
  const changeTabs = (tabs: ITabs) => {
    setTitle(tabs.title);
    setTabs(tabs.tabs);
    setCurrentTabId(null);
  };

  /**
   * Deletes the selected tab from the savedTabs array and updates the localStorage.
   * @param id
   */
  const deleteSavedTabs = useCallback(
    (id: number) => {
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
   * Handles the save button click event.
   */
  const handleSave = useCallback(() => {
    if (currentTabId) {
      updateSavedTabs();
    } else {
      addNewSavedTabs();
    }
  }, [currentTabId, updateSavedTabs, addNewSavedTabs]);

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
        parsedLines,
        handleTabsChange,
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
        handleSave,
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
