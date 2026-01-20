import {
  Box,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react'
import { FaExternalLinkAlt } from 'react-icons/fa'

type Props = {
  name: string
  setName: (name: string) => void
  nameError: string | null
  description: string
  setDescription: (description: string) => void
  ensSubName: string
  setSubName: (ensSubName: string) => void
  ensName: string
}

export default function CreateAgentInputs({
  name,
  setName,
  nameError,
  description,
  setDescription,
  ensSubName,
  setSubName,
  ensName,
}: Props) {
  return (
    <Stack
      w="100%"
      alignItems="flex-start"
      direction={['column', 'row']}
      justifyContent="space-between"
      spacing={8}
    >
      {/* LEFT COLUMN */}
      <Box w="100%">
        <FormControl mt={4} id="name" isInvalid={!!nameError}>
          <Box position="relative" w="100%">
            <Input
              w="100%"
              h="60px"
              borderRadius="8px"
              border="0.5px solid #3d3d3d"
              focusBorderColor="#3d3d3d"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
            />

            {nameError && (
              <Text color="red.200" mt={2} fontSize="xs">
                {nameError}
              </Text>
            )}

            <Box
              position="absolute"
              top={0}
              mt={-2}
              ml={3}
              px={2}
              bg="#1f2022"
              fontSize="xs"
              zIndex={1}
            >
              AI Agent
            </Box>
          </Box>
        </FormControl>

        <FormControl id="description" mt={12}>
          <Box position="relative" w="100%">
            <Input
              w="100%"
              h="60px"
              borderRadius="8px"
              border="0.5px solid #3d3d3d"
              focusBorderColor="#3d3d3d"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Text fontSize="xs" textAlign="right" color="gray">
              Optional
            </Text>

            <Box
              position="absolute"
              top={0}
              mt={-2}
              ml={3}
              px={2}
              bg="#1f2022"
              fontSize="xs"
              zIndex={1}
            >
              Short description
            </Box>
          </Box>
        </FormControl>

        <FormControl id="model" mt={12}>
          <Box position="relative" w="100%">
            <Select
              w="100%"
              h="60px"
              borderRadius="8px"
              border="0.5px solid #3d3d3d"
              focusBorderColor="#3d3d3d"
            >
              <option value="gpt-3">GPT-3</option>
            </Select>

            <Box
              position="absolute"
              top={0}
              mt={-2}
              ml={3}
              px={2}
              bg="#1f2022"
              fontSize="xs"
              zIndex={1}
            >
              Model
            </Box>
          </Box>
        </FormControl>
      </Box>

      {/* RIGHT COLUMN */}
      <Box w="100%">
        <FormControl mt={4} id="ens">
          <Box position="relative" w="100%">
            <InputGroup h="60px">
              <Input
                h="60px"
                borderRadius="8px"
                border="0.5px solid #3d3d3d"
                focusBorderColor="#3d3d3d"
                value={ensSubName}
                onChange={(e) => setSubName(e.target.value)}
                placeholder="Enter wrapped sub-name"
              />

              <InputRightAddon
                h="60px"
                bg="gray.700"
                border="1px solid #1f2022"
                borderRightRadius="8px"
                fontWeight="bold"
                letterSpacing="1.5px"
                cursor="pointer"
              >
                {ensName || 'not found'}
              </InputRightAddon>
            </InputGroup>

            <Flex
              mt={2}
              align="center"
              justifyContent="flex-end"
              cursor="pointer"
            >
              <Text mr={2} fontSize="xs" color="pink">
                Register
              </Text>
              <FaExternalLinkAlt color="pink" />
            </Flex>

            <Box
              position="absolute"
              top={0}
              mt={-2}
              ml={3}
              px={2}
              bg="#1f2022"
              fontSize="xs"
              zIndex={1}
            >
              ENS Subdomain
            </Box>
          </Box>
        </FormControl>

        <FormControl mt={12} id="chain">
          <Box position="relative" w="100%">
            <Input
              readOnly
              value="sepolia"
              h="60px"
              borderRadius="8px"
              border="0.5px solid #3d3d3d"
              focusBorderColor="#3d3d3d"
            />

            <Box
              position="absolute"
              top={0}
              mt={-2}
              ml={3}
              px={2}
              bg="#1f2022"
              fontSize="xs"
              zIndex={1}
            >
              Default chain
            </Box>
          </Box>
        </FormControl>
      </Box>
    </Stack>
  )
}
