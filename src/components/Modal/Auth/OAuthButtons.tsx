import { Button, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { auth } from '../../../firebase/clientApp';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  const handleGoogleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signInWithGoogle();
  }
  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button variant="oauth" onClick={handleGoogleSignUp} isLoading={loading}>
        <Image src="/images/googlelogo.png" height="20px" mr={2} alt="Google Logo"></Image>
        Continue with Google
      </Button>
      {error && <Text>{error.message}</Text>}
    </Flex>
  )
}
export default OAuthButtons;