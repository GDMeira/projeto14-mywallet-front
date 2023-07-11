import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { pages, requisitions } from "../constants/routes"
import { useState } from "react"
import axios from "axios"

export default function SignUpPage() {
  const [formStates, setFormStates] = useState({
    name: '',
    email: '',
    password: '',
    checkPassword: ''
  })

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (formStates.password !== formStates.checkPassword) {
      return alert('Confirmação de senha está incorreta!')
    }

    const newUser = {...formStates};
    delete newUser.checkPassword;

    axios.post(requisitions.postSignup, newUser)
      .then(() => navigate(pages.signIn))
      .catch(error => alert(error.response.data.message))
  }

  function handleChange(e) {
    const newFormStates = {...formStates};
    newFormStates[e.target.id] = e.target.value;
    setFormStates(newFormStates);
  }

  return (
    <SingUpContainer>
      <form onSubmit={e => handleSubmit(e)}>
        <MyWalletLogo />
        <input
          id="name"
          placeholder="Nome" 
          type="text" 
          value={formStates.name}
          onChange={e => handleChange(e)}
          data-test="name"
        />
        <input
          id="email"
          placeholder="E-mail" 
          type="email"
          autoComplete="username"
          value={formStates.email}
          onChange={e => handleChange(e)}
          data-test="email"
        />
        <input
          id="password"
          placeholder="Senha" 
          type="password" 
          autoComplete="new-password" 
          value={formStates.password}
          onChange={e => handleChange(e)}
          data-test="password"
        />
        <input 
          id="checkPassword"
          placeholder="Confirme a senha" 
          type="password" 
          autoComplete="new-password" 
          value={formStates.checkPassword}
          onChange={e => handleChange(e)}
          data-test="conf-password"
        />
        <button type="submit" data-test="sign-up-submit">Cadastrar</button>
      </form>

      <Link to={pages.signIn}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
