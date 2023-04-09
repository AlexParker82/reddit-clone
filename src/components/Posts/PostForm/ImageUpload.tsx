import { Button, Flex, Image, Input, Stack } from '@chakra-ui/react';
import React, { useRef } from 'react';

type ImageUploadProps = {
  selectedFile: string | null;
  onSelectImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedTab: (val: string) => void;
  setSelectedFile: (val: string) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({ selectedFile, onSelectImage, setSelectedTab, setSelectedFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Flex justify="center" align="center" width="100%">
      {selectedFile ? (
        <Flex direction="column" justify="center" align="center" mt={4} >
          <Image src={selectedFile} alt="selected image" maxHeight="400px" maxWidth="400px" />
          <Stack direction="row" spacing={10} p={4} >
            <Button height="28px" onClick={() => setSelectedTab("Post")}>Back to Post</Button>
            <Button height="28px" variant="outline" onClick={() => setSelectedFile("")}>Remove</Button>
          </Stack>
        </Flex>
      ) : (
        <Flex justify="center" align="center" p={20} border="1px dashed" borderColor="gray.200" width="100%"
          borderRadius={4}>
          <Button variant="outline" height="28px" onClick={() => fileInputRef.current?.click()}>Upload</Button>
          <Input onChange={onSelectImage} accept='.jpg, .png, .jpeg' ref={fileInputRef} type="file" hidden />
        </Flex>
      )}
    </Flex>

  )
}
export default ImageUpload;