import { Button, Flex, Input, Stack, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react';

type TextInputsProps = {
  textInputs: {
    title: string;
    body: string;
  },
  onTextChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCreatePost: () => void;
  loading: boolean;
};

const TextInputs: React.FC<TextInputsProps> = ({ textInputs, onTextChange, handleCreatePost, loading }) => {

  return (
    <Stack spacing={3} width="100%">
      <Input
        name="title"
        value={textInputs.title}
        onChange={onTextChange}
        fontSize="10pt"
        placeholder="Title"
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "black"
        }}
      />
      <Textarea
        name="body"
        value={textInputs.body}
        height="100px"
        fontSize="10pt"
        placeholder="Text (optional)"
        onChange={onTextChange}
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "black"
        }}
      />
      <Flex justify="flex-end" p={4}>
        <Button height="34px" padding="0px 30px" disabled={!textInputs.title} isLoading={loading} onClick={handleCreatePost}>Post</Button>
      </Flex>
    </Stack>
  )
}
export default TextInputs;