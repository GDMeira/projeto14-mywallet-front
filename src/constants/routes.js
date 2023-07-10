export const pages = {
    signIn: '/',
    signUp: '/cadastro',
    home: '/home',
    inbound: '/nova-transacao/entrada',
    outbound: '/nova-transacao/saida',
}

const API_URL = import.meta.env.VITE_API_URL;

export const requisitions = {
    postSignin: API_URL + '/signin',
    postSignup: API_URL + '/signup',
    postTransaction: API_URL + '/transaction',
    getTransactions: API_URL + '/transaction',
    logout: API_URL + '/logout'
}

export const headers = {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
}