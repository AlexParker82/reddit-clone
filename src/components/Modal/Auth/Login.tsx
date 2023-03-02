import { authModalState } from '@/atoms/authModalAtom';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';

type LoginProps = {

};

const Login: React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))

  }

  // Firebase Logic
  const handleSubmit = () => { }

  return (
    <form>
      <Flex p={2} direction="column" justify="center" align="center" width="300px">
        <Input
          required
          name="email"
          placeholder="example@email.com"
          type="email"
          value={loginForm.email}
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
          value={loginForm.password}
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
        <Button variant="solid" type="submit" width="100%" mb={2} onClick={handleSubmit} >Log In</Button>
        <Flex fontSize="9pt" justifyContent="center">
          <Text mr={1}>New here?</Text>
          <Text
            color="blue.500"
            fontWeight={700}
            cursor="pointer"
            onClick={() => setAuthModalState(prev => ({
              ...prev,
              view: "signup"
            }))}
          >
            SIGN UP
          </Text>
        </Flex>
      </Flex>
    </form>
  )
}
export default Login;