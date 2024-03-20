import React, { useEffect, useState } from "react";
import Tab from "./TinWhistleTab";
import { Box, Wrap, Divider, ScaleFade } from "@chakra-ui/react";
import { NotesData } from "../../types/NotesData";

interface TabsProps {
  data: string;
  isNotesVisible: boolean;
  isLyricsVisible: boolean;
  horizontalSpacing: number;
  verticalSpacing: number;
  tabSize: number;
}

const TinWhistleTabs: React.FC<TabsProps> = ({
  data,
  isNotesVisible,
  isLyricsVisible,
  verticalSpacing,
  horizontalSpacing,
  tabSize,
}) => {
  const [notesData, setNotesData] = useState<NotesData>([]);

  const parseTabs = (data: string): NotesData => {
    const tabsData: NotesData = [];
    const lines = data.split("\n");

    lines.forEach((line: string, lineIndex: number) => {
      if (line.trim().startsWith("//")) return; // Skip comment lines

      const notesInLine = line.match(/([a-g][#]?[+]{0,2})|[-\s]/gi) ?? [];
      const lineData = notesInLine.map((note) => {
        const tabNote = note.match(/^([a-gA-G][#]?)|(-)|( )/i) ?? [""];
        const tabOctave = note.match(/([+]{0,2})$/i) ?? [""];

        let noteValue = tabNote[0];
        let octaveValue = tabOctave[0];

        if (noteValue === " ") {
          noteValue = "spacer";
          octaveValue = "";
        } else if (noteValue === "-") {
          noteValue = "slur";
          octaveValue = "";
        } else if (noteValue.toUpperCase() === noteValue) {
          noteValue = noteValue.toLowerCase();
          octaveValue = octaveValue ? "++" : "+";
        }

        return { note: noteValue, octave: octaveValue };
      });

      tabsData[lineIndex] = lineData;
    });

    return tabsData;
  };

  useEffect(() => {
    const parsedNotesData = parseTabs(data);
    setNotesData(parsedNotesData);
  }, [data]);

  return (
    <Box p={50} pb={0}>
      <Wrap spacing="0">
        {notesData.length > 0 ? (
          notesData.map((line, idx) => (
            <React.Fragment key={idx}>
              {line.map((noteData, noteIdx) => (
                <ScaleFade initialScale={0.5} in={true}>
                  <Tab
                    key={noteIdx}
                    data={noteData}
                    horizontalSpacing={horizontalSpacing}
                    verticalSpacing={verticalSpacing}
                    isNotesVisible={isNotesVisible}
                    isLyricsVisible={isLyricsVisible}
                    tabSize={tabSize}
                    whistleKey="D"
                  />
                </ScaleFade>
              ))}
              <Divider width="100%" borderColor="transparent" marginTop="10px" marginBottom="10px" />
            </React.Fragment>
          ))
        ) : (
          <p>No notes to display</p>
        )}
      </Wrap>
    </Box>
  );
};

export default TinWhistleTabs;
