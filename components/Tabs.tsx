import { useEffect, useState } from "react"
import Tab from './Tab'
import INotesData from '../types/NotesData'
import { Container, Box, Wrap, Divider } from '@chakra-ui/react'

interface TabsProps {
  data: string,
  notesVisible: boolean,
  spacing: number,
}

const Tabs: React.FC<TabsProps> = ({data, notesVisible, spacing}) => {
  const [ notes, setNotes ] = useState(['']);
  const [ notesData, setNotesData ] = useState<INotesData>([]);

  useEffect(() => {
    const tabs = data.match(/([a-g][#]?[+]{0,2})|(?:[\s\n])/ig) ?? [];
    if(JSON.stringify(tabs) !== JSON.stringify(notes)) {
      // Set the individual notes into an array so they can be checked in
      // above if statement next time there's a change
      setNotes(tabs);
    }
  }), [];

  useEffect(() => {
    // Separate the notes an add classes to each
    let tabsData: INotesData = [[]];
    let currentTabLine: number = 0;

    // Loop through each of the tabs and extract data for each one
    if(notes.length > 0) {
      notes.forEach((note, idx) => {
        let tabNote = note.match(/^([a-g][#]?)|(\n)|( )/i) ?? [''];
        const tabOctave = note.match(/([+]{0,2})$/i) ?? [''];
        let tabClass = '';

        if(tabNote[0] === " ") {
          tabClass = 'spacer';
        } else if(tabNote[0] != "\n") {
          tabClass = tabNote[0].replace('#', '');

          // Handle sharp note
          if(/#/.test(note)) {
            tabClass += '-sharp';
          }
          
          // Handle higher octaves
          if(tabOctave[0] === '+') {
            tabClass += '-plus';
            tabNote[0] = tabNote[0].toUpperCase();
          } else if(tabOctave[0] === '++') {
            tabClass += '-plus-plus';
            tabNote[0] = tabNote[0].toUpperCase();
          } else {
            tabNote[0] = tabNote[0].toLowerCase();
          }
        } else {
          currentTabLine++;
          tabsData[currentTabLine] = [];
          return;
        }

        tabsData[currentTabLine].push({
          note: tabNote[0],
          octave: tabOctave[0],
          class: tabClass,
        });

        setNotesData(tabsData);
      })
    } else {
      setNotesData([]);
    }
  }, [ notes ]);

  return (
    <>
      { notes.length > 0 ?
        <Container maxW="container.lg">
          <Box bg="white" shadow="md" mt={8} borderRadius="md" p={8}>
            <Wrap spacing="0">
              { notesData.map( (lines, idx) => {
                return ( 
                  <>
                    { Object.keys(lines).map( (note, idx) => {
                      return (
                        <Tab key={idx} data={lines[note]} spacing={spacing} notesVisible={notesVisible} />
                      )
                    })}
                    <Divider width="100%" borderColor="transparent" marginTop="10px" marginBottom="10px" />
                  </>
                )
              }) }
            </Wrap>
          </Box>
        </Container>
      : '' }
    </>
  )
}

export default Tabs;