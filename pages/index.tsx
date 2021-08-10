import Head from 'next/head'
import Image from 'next/image'
import Generator from '../components/Generator'
import { Box, Text, Heading, Container, Link, VStack, StackItem } from '@chakra-ui/react'

export default function Home() {
  return (
    <>
      <Head>
        <title>Tin Whistle Tabs Generator by Rich Powell</title>
        <meta name="description" content="Create tin whistle tabs from the musical alphabet and add customisations. Tin Whistle Tabs Generator made by Rich Powell." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <VStack minHeight="100%">
      <StackItem width="100%" flexGrow="1">
        <header className="text-center">
          <Box spacing="30px" py="8" background="indigo" color="white" align="center">
            <Heading as="h1" fontWeight="thin" letterSpacing="1px" mb="3" size="3xl">Tin Whistle Tabs Generator</Heading>
            <Text color="rgba(255, 255, 255, 0.75)" fontSize="larger" letterSpacing="1px" fontWeight="light">Easily create and customise tin whistle tabs from the musical alphabet.</Text>
          </Box>
        </header>

        <main className="mb-4">
          <Generator />
        </main>
      </StackItem>

      <StackItem marginTop="auto">
        <footer>
          <Container maxW="container.lg">
            <Text align="right" p="8">Made by <Link href="https://richpowell.co.uk/" fontWeight="bold">Rich Powell</Link></Text>
          </Container>
        </footer>
      </StackItem>
    </VStack>
    </>
    )
}
