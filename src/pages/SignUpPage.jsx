import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { pages, requisitions } from "../constants/routes"
import { useState } from "react"
import axios from "axios"

export default function SignUpPage() {
  const [formStates, setFormStates] = useState({
    name: 0,
    email: 0,
    password: 0,
    checkPassword: 0
  })

  const navigate = useNavigate();

  async function handleChange(e) {
    e.preventDeafult();

    if (formStates.password !== formStates.checkPassword) {
      return alert('Confirmação de senha está incorreta!')
    }

    try {
      await axios.post(requisitions.postSignup);
      navigate(pages.signIn);
    } catch (error) {
      alert(error.message)
    }
  }

  function handleChange(e) {
    const newFormStates = formStates;
    newFormStates[e.target.id] = e.targe.value;
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
          onChange={e => handleChange(e)}
        />
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
        <input 
          id="checkPassword"
          placeholder="Confirme a senha" 
          type="password" 
          autoComplete="new-password" 
          onChange={e => handleChange(e)}
        />
        <button type="submit">Cadastrar</button>
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
