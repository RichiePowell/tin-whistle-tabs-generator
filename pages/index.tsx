import Head from "next/head";
import Generator from "../components/Generator";
import {
  Box,
  Text,
  Heading,
  StackItem,
  SliderTrack,
  Slider,
  FormLabel,
  Switch,
  FormControl,
  Stack,
  Textarea,
  SliderFilledTrack,
  SliderThumb,
  StackDivider,
  HStack,
  Input,
  Flex,
  Spacer,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";
import ResizeTextarea from "react-textarea-autosize";
import Tabs from "../components/Tabs";

export default function Home() {
  const [title, setTitle] = useState("");
  const [tabs, setTabs] = useState("");
  const [notesVisible, setNotesVisible] = useState(false);
  const [tabSize, setTabSize] = useState(50);
  const [verticalSpacing, setVerticalSpacing] = useState(30);
  const [horizontalSpacing, setHorizontalSpacing] = useState(5);

  const handleNotesVisibleChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.persist();
    setNotesVisible((notesVisible) => !notesVisible);
  };

  return (
    <>
      <Head>
        <title>Tin Whistle Tabs Generator by Rich Powell</title>
        <meta
          name="description"
          content="Create tin whistle tabs from the musical alphabet and add customisations. Tin Whistle Tabs Generator made by Rich Powell."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HStack spacing={0} minHeight="100%">
        <StackItem
          as="header"
          width="50%"
          color="white"
          height="100vh"
          background="#067f4a"
          textAlign="center"
          px={50}
          flexDirection="column"
          justifyContent="center"
          display="flex"
        >
          <Flex height="31%" justifyContent="center" direction="column" py={50}>
            <Heading as="h1" fontWeight="thin" letterSpacing="1px" mb="3" size="3xl">
              Tin Whistle
              <br />
              Tabs Generator
            </Heading>
            <Text color="rgba(255, 255, 255, 0.75)" fontSize="larger" letterSpacing="1px" fontWeight="light">
              Easily create and customise tin whistle tabs from the musical alphabet.
            </Text>
          </Flex>

          <Textarea
            spellCheck="false"
            value={tabs}
            background="rgba(255, 255, 255, 0.2)"
            color="white"
            padding="6"
            mb="3"
            resize="none"
            h="50%"
            focusBorderColor="gold"
            onChange={(e) => setTabs(e.target.value)}
            size="lg"
            placeholder="Enter letters from the musical alphabet here..."
            _placeholder={{ color: "rgba(255, 255, 255, 0.75)" }}
            m="auto"
          ></Textarea>

          <Flex height="18%" justifyContent="end" direction="column" py={5} fontSize="sm">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title (optional)"
              size="lg"
              mb="3"
              background="rgba(255, 255, 255, 0.2)"
              _placeholder={{ color: "rgba(255, 255, 255, 0.75)" }}
              focusBorderColor="gold"
            />

            <SimpleGrid
              columns={4}
              spacing="5"
              mt={3}
              alignItems="center"
              divider={<StackDivider borderColor="whiteAlpha.400" />}
              shouldWrapChildren={false}
            >
              <StackItem>
                <FormControl display="flex" alignItems="center">
                  <Switch
                    id="notes-visible"
                    isChecked={notesVisible}
                    onChange={(e) => handleNotesVisibleChange(e)}
                    colorScheme="yellow"
                    mr="3"
                  />
                  <FormLabel htmlFor="notes-visible" mb="0" fontSize="sm" cursor="pointer">
                    Show notes
                  </FormLabel>
                </FormControl>
              </StackItem>

              <StackItem alignItems="center">
                <Text mr={3}>Horizontal Spacing</Text>
                <Slider
                  aria-label="spacer-slider"
                  colorScheme="yellow"
                  defaultValue={horizontalSpacing}
                  min={1}
                  max={20}
                  width="100%"
                  onChange={(val) => setHorizontalSpacing(val)}
                  focusThumbOnChange={false}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </StackItem>

              <StackItem alignItems="center">
                <Text mr={3}>Vertical Spacing</Text>
                <Slider
                  aria-label="spacer-slider"
                  colorScheme="yellow"
                  defaultValue={verticalSpacing}
                  min={10}
                  max={70}
                  width="100%"
                  onChange={(val) => setVerticalSpacing(val)}
                  focusThumbOnChange={false}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </StackItem>

              <StackItem alignItems="center">
                <Text mr={3}>Tab Size</Text>
                <Slider
                  aria-label="spacer-slider"
                  colorScheme="yellow"
                  defaultValue={tabSize}
                  min={10}
                  max={70}
                  width="100%"
                  onChange={(val) => setTabSize(val)}
                  focusThumbOnChange={false}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </StackItem>
            </SimpleGrid>
          </Flex>
        </StackItem>

        <StackItem overflowY="auto" maxHeight="100vh" width="50%">
          {title && (
            <Heading as="h2" size="xl" mb="3" mt="50" textAlign="center" fontWeight="normal">
              {title}
            </Heading>
          )}
          <Tabs
            data={tabs}
            notesVisible={notesVisible}
            horizontalSpacing={horizontalSpacing}
            verticalSpacing={verticalSpacing}
            tabSize={tabSize}
          />
        </StackItem>
      </HStack>
    </>
  );
}
