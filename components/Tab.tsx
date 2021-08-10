import INoteData from '../types/NotesData'
import { Text, WrapItem, Box } from '@chakra-ui/react'

interface TabProps {
  data: INoteData,
  notesVisible: boolean,
  spacing: number,
}

const Tab: React.FC<TabProps> = ({data, notesVisible, spacing}) => {
  return (
    <WrapItem>
      <Box className="tab text-center" marginRight={`${spacing}px`}>
        <div className={ `tab--${data.class}` }>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        { notesVisible ?
          <>
            <Text
              fontSize="xs"
              color="gray.400"
              height={2}>{ data.octave }</Text>
            <Text fontSize="sm">{ data.note }</Text>
          </>
        : '' }
      </Box>
    </WrapItem>
  )
}


export default Tab;