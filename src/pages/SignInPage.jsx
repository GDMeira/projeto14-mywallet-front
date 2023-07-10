import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { pages, requisitions } from "../constants/routes"
import { useState } from "react"
import axios from "axios"

export default function SignInPage() {
  const [loginStates, setLoginStates] = useState({email: 'gabriel3@gmail.com', password: '1234'});
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      const resp = await axios.post(requisitions.postSignin, loginStates);
      //TODO: Receber informações de usuário no logIn
      localStorage.setItem('token', resp.data);
      navigate(pages.home);
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  function handleChange(e) {
    const newLoginStates = {...loginStates};
    newLoginStates[e.target.id] = e.target.value;
    setLoginStates(newLoginStates);
  }

  return (
    <SingInContainer>
      <form onSubmit={e => handleSubmit(e)}>
        <MyWalletLogo />
        <input 
          id="email"
          placeholder="E-mail" 
          type="email" 
          autoComplete="username" 
          value = {loginStates.email}
          onChange={e => handleChange(e)}
        />
        <input 
          id="password"
          placeholder="Senha" 
          type="password" 
          autoComplete="password" 
          value = {loginStates.password}
          onChange={e => handleChange(e)}
        />
        <button type="submit">Entrar</button>
      </form>

      <Link to={pages.signUp}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
