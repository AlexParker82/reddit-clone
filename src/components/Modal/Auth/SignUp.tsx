import { authModalState } from '@/atoms/authModalAtom';
import { Flex, Input, Button, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';

const SignUp: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    passwordConfirm: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSignUp = () => {

  }

  return (
    <form onSubmit={handleSignUp} >
      <Flex p={2} direction="column" justify="center" align="center">
        <Input
          required
          name="email"
          placeholder="example@email.com"
          type="email"
          value={signUpForm.email}
          mb={2}
          fontSize="10pt"
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            border: "1px solid blue.500"
          }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid blue.500"
          }}
          bg="gray.50"
          onChange={handleInputChange}
        />
        <Input
          required
          name="password"
          placeholder="Password"
          type="password"
          value={signUpForm.password}
          mb={2}
          fontSize="10pt"
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            border: "1px solid blue.500"
          }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid blue.500"
          }}
          bg="gray.50"
          onChange={handleInputChange}
        />
        <Input
          required
          name="passwordConfirm"
          placeholder="Confirm Password"
          type="password"
          value={signUpForm.passwordConfirm}
          mb={2}
          fontSize="10pt"
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            border: "1px solid blue.500"
          }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid blue.500"
          }}
          bg="gray.50"
          onChange={handleInputChange}
        />
        <Button variant="solid" type="submit" width="100%" mb={2} onClick={handleSignUp} >Sign Up</Button>
        <Flex fontSize="9pt" justifyContent="center">
          <Text mr={1}>Already a member?</Text>
          <Text
            color="blue.500"
            fontWeight={700}
            cursor="pointer"
            onClick={() => setAuthModalState(prev => ({
              ...prev,
              view: "login"
            }))}
          >
            LOGIN
          </Text>
        </Flex>
      </Flex>
    </form>
  )
}
export default SignUp;