import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { headersAuth, pages, requisitions } from "../constants/routes";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { UserContext } from "../constants/UserContext";

export default function HomePage( ) {
  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();
  const [transacList, setTransacList] = useState(undefined);

  useEffect(() => {
    if (!user && localStorage.user) {
      setUser({...JSON.parse(localStorage.user)});
    } else {
      axios.get(requisitions.getTransactions, headersAuth(user.token))
        .then(resp => setTransacList(resp.data))
        .catch(error => {
          navigate(pages.signIn);
          alert(error.response.data.message);
        });
    }
  }, [user]);
  
  function getBalance() {
    let balance = 0;

    transacList.forEach(transaction => {
      balance += (transaction.type === 'entrada' ? transaction.value : -transaction.value);
    });

    const color = (balance > 0 ? 'positivo' : 'negativo');
    const value = Math.abs(balance).toFixed(2).replace('.', ',');
    return  <Value color={color} data-test="total-amount">{value}</Value>
  }

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {user.name}</h1>
        <BiExit onClick={async () => {
            try {
              await axios.delete(requisitions.logout, headersAuth(user.token));
            } catch (error) {
              alert(error.response.data.message);
            }

            localStorage.removeItem('token');
            setUser(0);
            navigate(pages.signIn)
          }}
          data-test="logout"
        />
      </Header>

      {transacList !== undefined || <h1>Loading...</h1>}
      <TransactionsContainer>
        <ul>
          {transacList && transacList.map(transaction => {
            return (<ListItemContainer key={transaction._id.toString()}>
              <div>
                <span>{dayjs(transaction.date).format('DD/MM')}</span>
                <strong data-test="registry-name">{transaction.description}</strong>
              </div>
              <Value 
                color={(transaction.type === 'entrada' ? 'positivo' : 'negativo')}
                data-test="registry-amount"
              >
                {transaction.value.toFixed(2).replace('.', ',')}
              </Value>
            </ListItemContainer>)
          })}
        </ul>

        <article>
          <strong>Saldo</strong>
          {transacList && getBalance()}
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={() => navigate(pages.inbound)} data-test="new-income">
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => navigate(pages.outbound)} data-test="new-expense">
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div.attrs(props => ({'data-test': props['data-test']}))`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`