import { auth, firestore } from '@/firebase/clientApp';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Box, Text, Input, InputGroup, InputLeftElement, Flex, Radio, RadioGroup, Stack, Icon } from '@chakra-ui/react';
import { doc, getDoc, runTransaction, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsFillEyeFill, BsFillPersonFill } from 'react-icons/bs';
import { HiLockClosed } from 'react-icons/hi';

type CreateCommunityModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({ open, handleClose }) => {
  const [community, setCommunity] = useState("");
  const [characters, setCharacters] = useState(21);
  const [radioValue, setRadioValue] = useState("Public");
  const [error, setError] = useState("");
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue.length > 21) return;

    setCommunity(inputValue);
    setCharacters(21 - inputValue.length)
  }

  const handleCommunitySubmit = async () => {
    setError("");
    const format = /[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    const test = format.test(community);
    if (test || community.length < 3) {
      setError("Name must be at least 3 characters and can only contain letters, numbers and underscores");
      return;
    }

    setLoading(true);

    try {
      const communityDocRef = doc(firestore, "communities", community);

      await runTransaction(firestore, async (transaction) => {

        const communityDoc = await transaction.get(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error(`Sorry, r/${community} is taken, please try another`);
        }

        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: radioValue
        });

        transaction.set(doc(firestore, `users/${user?.uid}/communitySnippets`, community), {
          communityId: community,
          isModerator: true,

        })

      });

      setLoading(false);

    } catch (error: any) {
      console.error("handleCommunitySubmit error", error);
      setError(error.message)
    }
    handleClose();

  }


  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" flexDirection="column" fontSize={15} padding={3}>Create a Community</ModalHeader>
          <Box pl={3} pr={3}>
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Flex direction="column" mb={3}>
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
                    onChange={handleInputChange}
                  />
                </InputGroup>
                <Text fontSize="9pt" color={characters === 0 ? "red" : "gray.500"}>{characters} Characters remaining</Text>
                {error && <Text fontSize="9pt" color="red">{error}</Text>}
              </Flex>
              <Flex direction="column" mt={4} mb={4}>
                <Text fontWeight={600} fontSize={15} mb={2}>Community Type</Text>
                <RadioGroup onChange={setRadioValue} name="" value={radioValue}>
                  <Stack direction='column'>
                    <Radio value='Public'>
                      <Flex align="center">
                        <Icon as={BsFillPersonFill} color="gray.500" mr={1} />
                        <Text fontSize="10pt" mr={1}>Public</Text>
                        <Text fontSize="8pt" color="gray.500">Anyone can view, post, and comment to this community</Text>
                      </Flex>
                    </Radio>
                    <Radio value='Restricted'>
                      <Flex align="center">
                        <Icon as={BsFillEyeFill} color="gray.500" mr={1} />
                        <Text fontSize="10pt" mr={1}>Restricted</Text>
                        <Text fontSize="8pt" color="gray.500">Anyone can view, but only approved users can post to this community</Text>
                      </Flex>
                    </Radio>
                    <Radio value='Private'>
                      <Flex align="center">
                        <Icon as={HiLockClosed} color="gray.500" mr={1} />
                        <Text fontSize="10pt" mr={1}>Private</Text>
                        <Text fontSize="8pt" color="gray.500">Only approved users can view and submit to this community</Text>
                      </Flex>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Flex>
            </ModalBody>
          </Box>
          <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
            <Button variant="outline" height="30px" mr={3} onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleCommunitySubmit} isLoading={loading} height="30px" >Create Community</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default CreateCommunityModal;