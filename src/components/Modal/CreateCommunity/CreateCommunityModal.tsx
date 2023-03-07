import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Box, Text, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React, { useState } from 'react';

type CreateCommunityModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({ open, handleClose }) => {
  const [community, setCommunity] = useState("");
  const [characters, setCharacters] = useState(21);

  const handleCommunity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue.length > 21) return;

    setCommunity(inputValue);
    setCharacters(21 - inputValue.length)
  }

  return (
    <>
      <Modal isOpen={open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" flexDirection="column" fontSize={15} padding={3}>Create a Community</ModalHeader>
          <Box pl={3} pr={3}>
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Text fontWeight={600} fontSize={15}>Name</Text>
              <Text fontSize={11} color="gray.500">Community names including capitalization cannot be changed</Text>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <Text mb={2} color="gray.400">r/</Text>
                </InputLeftElement>
                <Input
                  type='text'
                  size="sm"
                  value={community}
                  onChange={handleCommunity}
                />
              </InputGroup>
              <Text fontSize="9pt" color={characters === 0 ? "red" : "gray.500"}>{characters} Characters remaining</Text>
            </ModalBody>
          </Box>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleClose}>
              Cancel
            </Button>
            <Button variant='ghost'>Create Community</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default CreateCommunityModal;