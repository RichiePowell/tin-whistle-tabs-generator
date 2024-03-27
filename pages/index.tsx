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
  Card,
  InputGroup,
  ScaleFade,
  Tooltip,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import ResizeTextarea from "react-textarea-autosize";
import TinWhistleTabs from "../components/TinWhistleTabs/TinWhistleTabs";
import {
  SlMagnifier as ZoomIcon,
  SlCloudDownload as CloudIcon,
  SlDocs as CopyIcon,
  SlPlaylist as PlaylistIcon,
  SlSettings as SettingsIcon,
  SlTrash as DeleteIcon,
  SlNote as NewIcon,
  SlPrinter as PrinterIcon,
  SlRefresh as RefreshIcon,
} from "react-icons/sl";
import { CiFloppyDisk as SaveIcon } from "react-icons/ci";
import { PanelTab } from "../components/Settings/PanelTab";
import ReactToPrint from "react-to-print";
import { SquigglyArrow } from "../components/SquigglyArrow";
import { PanelRangeSlider } from "../components/Settings/PanelRangeSlider";
import { PanelSwitch } from "../components/Settings/PanelSwitch";
import { TabsCreatorContext } from "../context/TabsCreatorContext";

export default function Home() {
  const [searchTermForPreMadeTabs, setSearchTermForPreMadeTabs] = useState("");
  const [searchTermForSavedTabs, setSearchTermForSavedTabs] = useState("");
  const [hasCopiedNotes, setHasCopiedNotes] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const {
    title,
    setTitle,
    tabs,
    handleTabsChange,
    savedTabs,
    addNewSavedTabs,
    currentTabId,
    handleSave,
    deleteSavedTabs,
    loadSavedTabs,
    preMadeTabs,
    changeTabs,
    canSaveTabs,
    canSaveNewTabs,
    isNotesVisible,
    isLyricsVisible,
    tabSize,
    setTabSize,
    verticalSpacing,
    setVerticalSpacing,
    horizontalSpacing,
    setHorizontalSpacing,
    toggleIsNotesVisible,
    toggleIsLyricsVisible,
    handleClearConfirmation,
    showClearConfirmation,
  } = useContext(TabsCreatorContext);

  const handlePreMadeTabsSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTermForPreMadeTabs(e.target.value.toLowerCase());
  const clearPreMadeTabsSearch = () => setSearchTermForPreMadeTabs("");
  const handleSavedTabsSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTermForSavedTabs(e.target.value.toLowerCase());
  const clearSavedTabsSearch = () => setSearchTermForSavedTabs("");

  const copyNotesToClipboard = () => {
    navigator.clipboard.writeText(tabs);
    setHasCopiedNotes(true);
    setTimeout(() => setHasCopiedNotes(false), 1000);
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

      <HStack spacing={0} minHeight="100%" flexDirection={{ base: "column", xl: "row" }}>
        <StackItem
          as="header"
          maxWidth={{ xl: "650px" }}
          width="100%"
          color="white"
          height={{ xl: "100vh" }}
          background="#067f4a"
          textAlign="center"
          flexDirection="column"
          justifyContent="center"
          display="flex"
        >
          <Flex direction="column" justifyContent="center" position="relative" h="100%">
            <Box px={50} pb={{ base: 0, xl: 200 }}>
              <Box margin="auto" position="relative">
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

                {tabs && (
                  <Tooltip
                    label={hasCopiedNotes ? "Copied!" : "Copy to clipboard"}
                    placement="top"
                    hasArrow
                    aria-label="Copy to clipboard"
                    closeOnClick={false}
                  >
                    <Text
                      size="sm"
                      textTransform="uppercase"
                      position="absolute"
                      right="5px"
                      marginTop="5px"
                      zIndex={2}
                      cursor="pointer"
                      p={1}
                      opacity={0.75}
                      _hover={{ color: "gold", opacity: 1 }}
                      onClick={() => copyNotesToClipboard()}
                    >
                      <CopyIcon />
                    </Text>
                  </Tooltip>
                )}
                <Textarea
                  spellCheck="false"
                  value={tabs}
                  background="rgba(0,0,0, 0.2)"
                  borderColor="rgba(255,255,255,0.75)"
                  color="white"
                  p={6}
                  mb={8}
                  resize="none"
                  focusBorderColor="gold"
                  onChange={(e) => handleTabsChange(e.target.value)}
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
                  mb={8}
                  maxLength={100}
                />

                <HStack mb={8}>
                  <Button colorScheme="yellow" onClick={handleSave} isDisabled={!canSaveTabs()} size="sm">
                    <SaveIcon size={21} />{" "}
                    <Text ml={2} as="span">
                      Save
                    </Text>
                  </Button>
                  <Button variant="light-transparent" hidden={!canSaveNewTabs()} onClick={addNewSavedTabs} size="sm">
                    <NewIcon />
                    <Text ml={2} as="span">
                      Save As New
                    </Text>
                  </Button>
                  {currentTabId !== null && (
                    <Button variant="light-transparent" onClick={deleteSavedTabs(currentTabId)} size="sm">
                      <DeleteIcon />{" "}
                      <Text ml={2} as="span">
                        Delete
                      </Text>
                    </Button>
                  )}
                  <Button
                    variant="light-transparent"
                    onClick={handleClearConfirmation}
                    hidden={!canSaveTabs()}
                    size="sm"
                  >
                    <RefreshIcon />
                    <Text ml={2} as="span">
                      {showClearConfirmation ? "Are you sure?" : "Clear All"}
                    </Text>
                  </Button>
                  <ReactToPrint
                    bodyClass="print-agreement"
                    content={() => ref.current}
                    trigger={() => (
                      <Button
                        variant="light-transparent"
                        onClick={() => window.print()}
                        size="sm"
                        hidden={title.length === 0 && tabs.length === 0}
                      >
                        <PrinterIcon />
                        <Text ml={2} as="span">
                          Print
                        </Text>
                      </Button>
                    )}
                  />
                </HStack>
              </Box>
            </Box>

            <Tabs colorScheme="white" width="100%" position={{ base: "relative", xl: "absolute" }} bottom={0}>
              <TabList borderColor="rgba(255, 255, 255, 0.3)" px={{ base: 0, md: 50 }}>
                <PanelTab icon={<SettingsIcon />}>Settings</PanelTab>
                <PanelTab counter={savedTabs.length} icon={<PlaylistIcon />}>
                  Saved Tabs
                </PanelTab>
                <PanelTab counter={preMadeTabs.length} icon={<CloudIcon />}>
                  Pre-Made Tabs
                </PanelTab>
              </TabList>

              <TabPanels
                background="rgba(0, 0, 0, 0.2)"
                maxHeight={{ base: "200px", xl: "150px" }}
                height={{ xl: "150px" }}
                overflow="auto"
              >
                <TabPanel p={7} px={41} height="100%">
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
                    {/* <PanelSwitch
                      id="lyrics-switch"
                      label="Show lyrics"
                      isChecked={isLyricsVisible}
                      onChange={toggleIsLyricsVisible}
                    /> */}
                  </SimpleGrid>
                </TabPanel>

                <TabPanel p={0} height="100%" overflow="auto">
                  {savedTabs.length === 0 ? (
                    <Flex justifyContent="center" height="100%" alignItems="center">
                      <Text p={5}>You currently have no saved tabs.</Text>
                    </Flex>
                  ) : (
                    <>
                      {savedTabs.length > 3 && (
                        <InputGroup>
                          <Box
                            position="absolute"
                            top="50%"
                            transform="translateY(-50%)"
                            left="50px"
                            zIndex="1"
                            pointerEvents="none"
                          >
                            <ZoomIcon size={14} />
                          </Box>
                          <Input
                            placeholder="Search saved tabs..."
                            borderTop="none"
                            borderLeft="none"
                            borderRight="none"
                            borderBottom="1px solid rgba(255, 255, 255, 0.5)"
                            background="rgba(0,0,0, 0.2)"
                            onChange={handleSavedTabsSearch}
                            pl={70}
                            value={searchTermForSavedTabs}
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
                            onClick={clearSavedTabsSearch}
                            _hover={{ color: "gold" }}
                            fontSize="xl"
                            transition="opacity 0.2s ease"
                            opacity={searchTermForSavedTabs.length > 0 ? 1 : 0}
                          >
                            x
                          </Box>
                        </InputGroup>
                      )}
                      {savedTabs
                        .filter((tab) => tab.title.toLowerCase().includes(searchTermForSavedTabs))
                        .sort((a, b) => a.title.localeCompare(b.title))
                        .map((tab: { id: number; title: string; tabs: string }) => (
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
                                  added{" "}
                                  {new Date(tab.id).toLocaleDateString("en-GB", {
                                    year: "2-digit",
                                    month: "2-digit",
                                    day: "2-digit",
                                  })}{" "}
                                  at{" "}
                                  {new Date(tab.id).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                                </Text>
                              </Link>
                              <Tooltip label="Delete" placement="right" hasArrow>
                                <Link
                                  p={1}
                                  px={2}
                                  _hover={{ color: "gold" }}
                                  onClick={deleteSavedTabs(tab.id)}
                                  display="none"
                                  _groupHover={{ display: "inline-block" }}
                                >
                                  <DeleteIcon />
                                </Link>
                              </Tooltip>
                            </Flex>
                          </Box>
                        ))}
                    </>
                  )}
                </TabPanel>

                <TabPanel p={0} height="100%" overflow="auto">
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
                            <ZoomIcon size={14} />
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
                            value={searchTermForPreMadeTabs}
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
                            opacity={searchTermForPreMadeTabs.length > 0 ? 1 : 0}
                          >
                            x
                          </Box>
                        </InputGroup>
                      )}
                      {preMadeTabs
                        .filter((tab) => tab.title.toLowerCase().includes(searchTermForPreMadeTabs))
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

        <StackItem
          overflowY="auto"
          maxHeight={{ base: "none", xl: "100vh" }}
          width={{ base: "100%", xl: "calc(100% - 650px)" }}
          overflow="auto"
          p={!title && !tabs ? { base: 0, xl: 50 } : { base: 0, md: 50 }}
        >
          {!title && !tabs ? (
            <Flex
              alignItems="center"
              direction="row"
              height="100%"
              display={{ base: "none", xl: "flex" }}
              hidden={title || tabs ? true : false}
            >
              <Box opacity={0.2} width={150} position="relative" top={4} marginRight={5}>
                <SquigglyArrow />
              </Box>
              <Text fontSize="x-large" textAlign="center" opacity={0.5} userSelect="none">
                Create or load tabs to get started.
              </Text>
            </Flex>
          ) : (
            <ScaleFade in={title || tabs ? true : false}>
              <Card
                p={{ md: 5 }}
                m="auto"
                shadow={{ md: "0 5px 10px rgba(0, 0, 0, 0.1)" }}
                maxWidth="800px"
                hidden={!title && !tabs ? true : false}
              >
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
