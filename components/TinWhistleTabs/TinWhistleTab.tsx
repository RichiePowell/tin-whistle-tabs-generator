import { INoteData } from "../../types/NotesData";
import { Text, WrapItem, Box, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { tinWhistleTabsByKey } from "../../constants/tinWhistleTabsByKey";

interface TabProps {
  data: INoteData;
  isNotesVisible: boolean;
  isLyricsVisible: boolean;
  verticalSpacing: number;
  horizontalSpacing: number;
  tabSize: number;
  whistleKey: "D" | "C";
}

interface INote {
  fingers: number[];
  description: string;
}

const TinWhistleTab: React.FC<TabProps> = ({
  data,
  isNotesVisible,
  isLyricsVisible,
  horizontalSpacing,
  verticalSpacing,
  tabSize,
  whistleKey,
}) => {
  const [fingerPositions, setFingerPositions] = useState<Array<number>>([]);

  useEffect(() => {
    // Update finger positions based on the current note and key
    const noteData = tinWhistleTabsByKey[whistleKey][data.note + data.octave];
    if (noteData) {
      setFingerPositions(noteData.fingers);
    }
  }, [data]);

  return (
    <WrapItem position="relative">
      {data.note === "slur" ? (
        <Box height="100%" userSelect="none">
          <Box position="absolute" top="calc(50% - 20px)" left="-50%" transform="translateY(-50%) translateX(-150%)">
            <Text transform="rotate(-90deg)">{"("}</Text>
          </Box>
        </Box>
      ) : (
        <>
          <Box marginRight={`${horizontalSpacing}px`} marginBottom={`${verticalSpacing}px`}>
            {data.note === "spacer" ? (
              <Box width={`${tabSize}px`}></Box>
            ) : (
              <>
                <VStack direction="column" spacing={0.5}>
                  {fingerPositions.map((finger, index) => (
                    <>
                      <Box
                        key={index}
                        display="inline-block"
                        borderRadius="50%"
                        border="1px solid black"
                        width={`${tabSize}px`}
                        height={`${tabSize}px`}
                        background={
                          finger === 0
                            ? "white"
                            : finger === 1
                            ? "black"
                            : "linear-gradient(to left, black 50%, white 50%)"
                        }
                      ></Box>
                      {index === 2 && <Box height={`${tabSize / 3}px`}></Box>}
                    </>
                  ))}
                </VStack>
                {isNotesVisible && (
                  <VStack>
                    <Text fontSize="xs" height={2} mb={-1} position="absolute">
                      {data.octave}
                    </Text>
                    <Text fontSize="xs" height="20px" mt={3}>
                      {data.octave.length > 0 ? data.note.toUpperCase() : data.note}
                    </Text>
                  </VStack>
                )}
              </>
            )}
          </Box>
        </>
      )}
    </WrapItem>
  );
};

export default TinWhistleTab;
