import { Button, Flex, Input } from '@chakra-ui/react';
import React, { useState } from 'react';

type LoginProps = {

};

const Login: React.FC<LoginProps> = () => {
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

  const handleSubmit = () => {

  }

  return (
    <form onSubmit={handleSubmit} >
      <Flex p={2} direction="column" justify="center" align="center">
        <Input borderRadius="60px" name="email" placeholder="example@email.com" type="email" value={loginForm.email} mb={2} onChange={handleInputChange} />
        <Input borderRadius="60px" name="password" placeholder="***********" type="password" value={loginForm.password} mb={2} onChange={handleInputChange} />
        <Button variant="solid" type="submit" onClick={handleSubmit} >Log In</Button>
      </Flex>
    </form>
  )
}
export default Login;