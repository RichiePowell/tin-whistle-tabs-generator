import { useState } from "react"
import Tabs from './Tabs'
import { Text, Container, Textarea, Box, Switch, FormControl, FormLabel, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Stack, StackItem, StackDivider } from '@chakra-ui/react'
import ResizeTextarea from "react-textarea-autosize";

const Generator = () => {
  const [tabs, setTabs] = useState<string>('');
  const [notesVisible, setNotesVisible] = useState<boolean>(false);
  const [spacing, setSpacing] = useState<number>(0);

  const handleNotesVisibleChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.persist();
    setNotesVisible(notesVisible => !notesVisible);
  };

  return (
    <>
      <Box bg="indigo" p={4} color="white">
        <Container maxW="container.lg">
          <Textarea
            spellcheck="false"
            value={tabs}
            border={0}
            background="rgba(255, 255, 255, 0.2)"
            color="white"
            padding="6"
            mb="3"
            resize="none"
            as={ResizeTextarea}
            focusBorderColor="gold"
            onChange={ e => setTabs(e.target.value) }
            size="lg"
            placeholder="Enter letters from the musical alphabet here..."
            _placeholder={{ color: 'rgba(255, 255, 255, 0.75)' }}
          ></Textarea>
          
          <Stack
            direction="row"
            spacing="5"
            align="center"
            divider={<StackDivider borderColor="whiteAlpha.400" />}
            shouldWrapChildren={false}
          >
            <StackItem>
              <FormControl
                display="flex"
                alignItems="center"
              >
                <Switch
                  id="notes-visible"
                  isChecked={notesVisible}
                  onChange={ e => handleNotesVisibleChange(e) }
                  colorScheme="yellow"
                  mr="3"
                />
                <FormLabel htmlFor="notes-visible" mb="0" cursor="pointer">
                  Show notes
                </FormLabel>
              </FormControl>
            </StackItem>

            <StackItem alignItems="center">
              <Text mr={3}>Spacing</Text>
              <Slider
                aria-label="spacer-slider"
                colorScheme="yellow"
                defaultValue={spacing}
                min={-2}
                max={20}
                width="300px"
                onChange={ val => setSpacing(val) }
                focusThumbOnChange={false}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </StackItem>
          </Stack>
        </Container>
      </Box>

      <Tabs data={tabs} notesVisible={notesVisible} spacing={spacing} />
    </>
  )
}

export default Generator;