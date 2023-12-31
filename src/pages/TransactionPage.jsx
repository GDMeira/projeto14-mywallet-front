import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { headersAuth, pages, requisitions } from "../constants/routes";
import axios from "axios";
import { UserContext } from "../constants/UserContext";

export default function TransactionsPage() {
  const {user, setUser} = useContext(UserContext);
  const params = useParams();
  const navigate = useNavigate();
  const transacType = params.tipo;
  const [formStates, setFormStates] = useState({value: '', description: ''})

  useEffect(() => {
    if (!user && localStorage.user) setUser({...JSON.parse(localStorage.user)});
  }, [user]);

  function handleChange(e) {
    const newFormStates = {...formStates};
    newFormStates[e.target.id] = e.target.value;
    setFormStates(newFormStates);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newTransac = {...formStates,value: formStates.value.replace(',', '.'), type: transacType};
    
    axios.post(requisitions.postTransaction, newTransac, headersAuth(user.token))
      .then(() => navigate(pages.home))
      .catch(() => alert(error.response.data.message))
  }

  return (
    <TransactionsContainer>
      <h1>Nova {transacType}</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <input 
          id="value"
          placeholder="Valor" 
          type="text"
          value={formStates.value}
          onChange={e => handleChange(e)}
          data-test="registry-amount-input"
        />
        <input 
          id="description"
          placeholder="Descrição" 
          type="text" 
          value={formStates.description}
          onChange={e => handleChange(e)}
          data-test="registry-name-input"
        />
        <button data-test="registry-save">Salvar {transacType}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
