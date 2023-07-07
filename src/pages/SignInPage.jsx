import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { pages, requisitions } from "../constants/routes"
import { useState } from "react"

export default function SignInPage() {
  const [loginStates, setLoginStates] = useState({email: '', password: ''});

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      const response = await axios.post(requisitions.postSignin, loginStates);
      //TODO: salvar o token em algum lugar (localhost ou passar p alguma função no routes)
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  function handleChange(e) {
    const newLoginStates = loginStates;
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
          onChange={e => handleChange(e)}
        />
        <input 
          id="password"
          placeholder="Senha" 
          type="password" 
          autoComplete="new-password" 
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
