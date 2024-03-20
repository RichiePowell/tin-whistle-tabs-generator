import Head from "next/head";
import {
  Text,
  Heading,
  StackItem,
  Textarea,
  HStack,
  Input,
  Flex,
  SimpleGrid,
  TabList,
  Tabs,
  TabPanels,
  TabPanel,
  Link,
  Button,
  Box,
  useToast,
  Card,
  InputGroup,
  ScaleFade,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ResizeTextarea from "react-textarea-autosize";
import TinWhistleTabs from "../components/TinWhistleTabs/TinWhistleTabs";
import scarboroughFair from "../data/scarborough-fair.json";
import myHeartWillGoOn from "../data/my-heart-will-go-on.json";
import drunkenSailor from "../data/drunken-sailor.json";
import greensleeves from "../data/greensleeves.json";
import hallelujah from "../data/hallelujah.json";
import concerningHobbits from "../data/concerning-hobbits.json";
import {
  SlMagnifier,
  SlCloudDownload,
  SlPlaylist,
  SlSettings,
  SlTrash,
  SlNote,
  SlPrinter,
  SlRefresh,
} from "react-icons/sl";
import { PanelTab } from "../components/Settings/PanelTab";
import { ITabs } from "../types/Tabs";
import { ISavedTabs } from "../types/SavedTabs";
import ReactToPrint from "react-to-print";
import { SquigglyArrow } from "../components/SquigglyArrow";
import { PanelRangeSlider } from "../components/Settings/PanelRangeSlider";
import { PanelSwitch } from "../components/Settings/PanelSwitch";

export default function Home() {
  const [title, setTitle] = useState("");
  const [tabs, setTabs] = useState("");
  const [currentTabId, setCurrentTabId] = useState<number | null>(null);
  const [isLyricsVisible, setIsLyricsVisible] = useState(false);
  const [isNotesVisible, setIsNotesVisible] = useState(false);
  const [tabSize, setTabSize] = useState(10);
  const [verticalSpacing, setVerticalSpacing] = useState(30);
  const [horizontalSpacing, setHorizontalSpacing] = useState(5);
  const [clearConfirm, setClearConfirm] = useState(false);
  const [savedTabs, setSavedTabs] = useState<ISavedTabs[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const toast = useToast();
  const preMadeTabs: ITabs[] = [
    scarboroughFair,
    myHeartWillGoOn,
    hallelujah,
    greensleeves,
    drunkenSailor,
    concerningHobbits,
  ];
  const ref = React.useRef<HTMLDivElement>(null);

  const handlePreMadeTabsSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const clearPreMadeTabsSearch = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    const savedTabs = localStorage.getItem("savedTabs") ? JSON.parse(localStorage.getItem("savedTabs")!) : [];
    setSavedTabs(savedTabs);
  }, []);

  useEffect(() => setClearConfirm(false), [title, tabs]);

  const toggleIsNotesVisible = () => setIsNotesVisible((isNotesVisible) => !isNotesVisible);
  const toggleIsLyricsVisible = () => setIsLyricsVisible((isLyricsVisible) => !isLyricsVisible);

  const changeTabs = (tabs: ITabs) => () => {
    setTitle(tabs.title);
    setTabs(tabs.tabs);
    setCurrentTabId(null);
  };

  const canSaveTabs = () => title !== "" || tabs !== "";

  const canSaveNewTabs = () => {
    if (canSaveTabs() && currentTabId) {
      const tab = savedTabs.find((tab: { id: number }) => tab.id === currentTabId);
      if (tab && (tab.title !== title || tab.tabs !== tabs)) {
        return true;
      }
    }
    return false;
  };

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

  const updateSavedTabs = () => {
    const savedTabs = localStorage.getItem("savedTabs") ? JSON.parse(localStorage.getItem("savedTabs")!) : [];
    const newSavedTabs = savedTabs.map((tab: { id: number; title: string; tabs: string }) => {
      if (tab.id === currentTabId) {
        tab.title = title;
        tab.tabs = tabs;
      }
      return tab;
    });
    localStorage.setItem("savedTabs", JSON.stringify(newSavedTabs));
    setSavedTabs(newSavedTabs);
    toast({
      title: "Successfully updated tabs" + (title ? " for " + title : ""),
      status: "success",
      position: "bottom-right",
    });
  };

  const loadSavedTabs = (id: number) => () => {
    const savedTabs = localStorage.getItem("savedTabs") ? JSON.parse(localStorage.getItem("savedTabs")!) : [];
    const tab = savedTabs.find((tab: { id: number }) => tab.id === id);
    setTitle(tab.title);
    setTabs(tab.tabs);
    setCurrentTabId(tab.id);
  };

  const deleteSavedTabs = (id: number) => () => {
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
  };

  const clearTabs = () => {
    setClearConfirm(!clearConfirm);
    if (clearConfirm) {
      setTitle("");
      setTabs("");
      setCurrentTabId(null);
    }
  };

  return (
    <>
      <Head>
        <title>Tin Whistle Tabs Creator by Rich Powell</title>
        <meta
          name="description"
          content="Create tin whistle tabs from the musical alphabet and add customisations. Tin Whistle Tabs Generator made by Rich Powell."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HStack spacing={0} minHeight="100%">
        <StackItem
          as="header"
          maxWidth="650px"
          color="white"
          height="100vh"
          background="#067f4a"
          textAlign="center"
          flexDirection="column"
          justifyContent="center"
          display="flex"
        >
          <Flex direction="column" justifyContent="center" position="relative" h="100%">
            <Box px={50} pb={200}>
              <Box margin="auto">
                <Flex direction="column" py={50}>
                  <Heading as="h1" fontWeight="thin" letterSpacing="1px" mb="3" size="3xl">
                    Tin Whistle
                    <br />
                    Tabs Creator
                  </Heading>
                  <Text color="rgba(255, 255, 255, 0.75)" fontSize="larger" letterSpacing="1px" fontWeight="light">
                    Easily create and customise tin whistle tabs using the musical alphabet.
                  </Text>
                </Flex>

                <Textarea
                  spellCheck="false"
                  value={tabs}
                  background="rgba(0,0,0, 0.2)"
                  borderColor="rgba(255,255,255,0.75)"
                  color="white"
                  p={6}
                  mb={3}
                  resize="none"
                  focusBorderColor="gold"
                  onChange={(e) => setTabs(e.target.value)}
                  size="lg"
                  placeholder="Enter letters from the musical alphabet here..."
                  _placeholder={{ color: "rgba(255, 255, 255, 0.75)" }}
                  as={ResizeTextarea}
                ></Textarea>

                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title (optional)"
                  size="lg"
                  background="rgba(0,0,0, 0.2)"
                  borderColor="rgba(255,255,255,0.75)"
                  _placeholder={{ color: "rgba(255, 255, 255, 0.75)" }}
                  focusBorderColor="gold"
                  mt={5}
                  mb={10}
                />

                <HStack mb={10}>
                  <Button
                    colorScheme="yellow"
                    onClick={() => (currentTabId ? updateSavedTabs() : addNewSavedTabs())}
                    isDisabled={!canSaveTabs()}
                  >
                    <SlNote /> <Text ml={2}>Save</Text>
                  </Button>
                  <Button variant="light-transparent" hidden={!canSaveNewTabs()} onClick={addNewSavedTabs}>
                    Save As New
                  </Button>
                  {currentTabId !== null && (
                    <Button variant="light-transparent" onClick={() => deleteSavedTabs(currentTabId)}>
                      <SlTrash /> <Text ml={2}>Delete</Text>
                    </Button>
                  )}
                  <Button variant="light-transparent" onClick={clearTabs} hidden={!canSaveTabs()}>
                    <SlRefresh />
                    <Text ml={2}>{clearConfirm ? "Are you sure?" : "Clear"}</Text>
                  </Button>
                  <ReactToPrint
                    bodyClass="print-agreement"
                    content={() => ref.current}
                    trigger={() => (
                      <Button
                        variant="light-transparent"
                        onClick={() => window.print()}
                        hidden={title.length === 0 && tabs.length === 0}
                      >
                        <SlPrinter /> <Text ml={2}>Print</Text>
                      </Button>
                    )}
                  />
                </HStack>
              </Box>
            </Box>

            <Tabs colorScheme="white" width="100%" overflow="auto" position="absolute" bottom={0}>
              <TabList borderColor="rgba(255, 255, 255, 0.3)" px={50}>
                <PanelTab icon={<SlSettings />}>Settings</PanelTab>
                <PanelTab counter={savedTabs.length} icon={<SlPlaylist />}>
                  Saved Tabs
                </PanelTab>
                <PanelTab counter={preMadeTabs.length} icon={<SlCloudDownload />}>
                  Pre-Made Tabs
                </PanelTab>
              </TabList>

              <TabPanels height="150px" background="rgba(0, 0, 0, 0.2)">
                <TabPanel p={0} pt={7} px={41} height="150px">
                  <SimpleGrid
                    columns={3}
                    fontSize="sm"
                    spacing={3}
                    alignItems="center"
                    justifyContent="center"
                    justifyItems="center"
                  >
                    <PanelRangeSlider
                      label="Horizontal Spacing"
                      defaultValue={horizontalSpacing}
                      min={1}
                      max={20}
                      onChange={(val) => setHorizontalSpacing(val)}
                    />
                    <PanelRangeSlider
                      label="Vertical Spacing"
                      defaultValue={verticalSpacing}
                      min={5}
                      max={40}
                      onChange={(val) => setVerticalSpacing(val)}
                    />
                    <PanelRangeSlider
                      label="Tab Size"
                      defaultValue={tabSize}
                      min={10}
                      max={20}
                      onChange={(val) => setTabSize(val)}
                    />

                    <PanelSwitch
                      id="notes-switch"
                      label="Show notes"
                      isChecked={isNotesVisible}
                      onChange={toggleIsNotesVisible}
                    />
                    <PanelSwitch
                      id="lyrics-switch"
                      label="Show lyrics"
                      isChecked={isLyricsVisible}
                      onChange={toggleIsLyricsVisible}
                    />
                  </SimpleGrid>
                </TabPanel>

                <TabPanel p={0} height="150px" overflow="auto">
                  {savedTabs.length === 0 ? (
                    <Flex justifyContent="center" height="100%" alignItems="center">
                      <Text p={5}>You currently have no saved tabs.</Text>
                    </Flex>
                  ) : (
                    <>
                      {savedTabs.map((tab: { id: number; title: string; tabs: string }) => (
                        <Box borderBottom="1px solid rgba(255, 255, 255, 0.3)" key={tab.id} textAlign="left">
                          <Flex
                            alignItems="center"
                            _hover={{
                              background: tab.id === currentTabId ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.1)",
                            }}
                            background={tab.id === currentTabId ? "rgba(0,0,0,0.2)" : ""}
                            role="group"
                          >
                            <Link
                              onClick={loadSavedTabs(tab.id)}
                              p={1}
                              px={55}
                              width="100%"
                              display="block"
                              _hover={{ textDecoration: "none" }}
                            >
                              {tab.title || "[Untitled Tabs]"}{" "}
                              <Text
                                fontSize="xs"
                                color="rgba(255, 255, 255, 0.5)"
                                as="span"
                                pointerEvents="none"
                                userSelect="none"
                              >
                                added {new Date(tab.id).toLocaleDateString()} at {new Date(tab.id).toLocaleTimeString()}
                              </Text>
                            </Link>
                            <Link
                              p={1}
                              px={2}
                              _hover={{ color: "gold" }}
                              onClick={deleteSavedTabs(tab.id)}
                              display="none"
                              _groupHover={{ display: "inline-block" }}
                            >
                              <SlTrash />
                            </Link>
                          </Flex>
                        </Box>
                      ))}
                    </>
                  )}
                </TabPanel>

                <TabPanel p={0} height="150px" overflow="auto">
                  {preMadeTabs.length === 0 ? (
                    <Flex justifyContent="center" height="100%" alignItems="center">
                      <Text p={5}>There are currently no pre-made tabs.</Text>
                    </Flex>
                  ) : (
                    <>
                      {preMadeTabs.length > 3 && (
                        <InputGroup>
                          <Box
                            position="absolute"
                            top="50%"
                            transform="translateY(-50%)"
                            left="50px"
                            zIndex="1"
                            pointerEvents="none"
                          >
                            <SlMagnifier size={14} />
                          </Box>
                          <Input
                            placeholder="Search for pre-made tabs..."
                            borderTop="none"
                            borderLeft="none"
                            borderRight="none"
                            borderBottom="1px solid rgba(255, 255, 255, 0.5)"
                            background="rgba(0,0,0, 0.2)"
                            onChange={handlePreMadeTabsSearch}
                            pl={70}
                            value={searchTerm}
                            _placeholder={{ color: "rgba(255, 255, 255, 0.5)" }}
                            _focus={{ borderBottomColor: "rgba(255, 255, 255, 0.5)", boxShadow: "none" }}
                            borderRadius={0}
                          />
                          <Box
                            position="absolute"
                            top="50%"
                            transform="translateY(-50%)"
                            right={3}
                            p={2}
                            zIndex="1"
                            cursor="pointer"
                            onClick={clearPreMadeTabsSearch}
                            _hover={{ color: "gold" }}
                            fontSize="xl"
                            transition="opacity 0.2s ease"
                            opacity={searchTerm.length > 0 ? 1 : 0}
                          >
                            x
                          </Box>
                        </InputGroup>
                      )}
                      {preMadeTabs
                        .filter((tab) => tab.title.toLowerCase().includes(searchTerm))
                        .sort((a, b) => a.title.localeCompare(b.title))
                        .map((tab: { title: string; tabs: string }) => (
                          <Box borderBottom="1px solid rgba(255, 255, 255, 0.3)" key={tab.title} textAlign="left">
                            <Flex
                              alignItems="center"
                              _hover={{
                                background:
                                  tab.title === title && tab.tabs === tabs
                                    ? "rgba(0, 0, 0, 0.3)"
                                    : "rgba(255, 255, 255, 0.1)",
                              }}
                              background={tab.title === title && tab.tabs === tabs ? "rgba(0,0,0,0.2)" : ""}
                            >
                              <Link
                                onClick={changeTabs(tab)}
                                p={1}
                                px={55}
                                width="100%"
                                display="block"
                                _hover={{ textDecoration: "none" }}
                              >
                                {tab.title}
                              </Link>
                            </Flex>
                          </Box>
                        ))}
                    </>
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </StackItem>

        <StackItem overflowY="auto" maxHeight="100vh" width="calc(100% - 650px)" overflow="auto" p={50}>
          {!title && !tabs ? (
            <ScaleFade in={!title && !tabs}>
              <Flex alignItems="center" direction="row" height="100%">
                <Box opacity={0.2} width={150} position="relative" top={4} marginRight={5}>
                  <SquigglyArrow />
                </Box>
                <Text fontSize="x-large" textAlign="center" opacity={0.5} userSelect="none">
                  Create or load tabs to get started.
                </Text>
              </Flex>
            </ScaleFade>
          ) : (
            <ScaleFade in={title || tabs ? true : false}>
              <Card p={5} m="auto" shadow="0 5px 10px rgba(0, 0, 0, 0.1)" maxWidth="800px">
                <Box ref={ref}>
                  {title && (
                    <Heading as="h2" size="xl" mb="3" mt="50" textAlign="center" fontWeight="normal">
                      {title}
                    </Heading>
                  )}
                  <TinWhistleTabs
                    data={tabs}
                    isNotesVisible={isNotesVisible}
                    isLyricsVisible={isLyricsVisible}
                    horizontalSpacing={horizontalSpacing}
                    verticalSpacing={verticalSpacing}
                    tabSize={tabSize}
                  />
                </Box>
              </Card>
            </ScaleFade>
          )}
        </StackItem>
      </HStack>
    </>
  );
}
