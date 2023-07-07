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
    postSignup: API_URL + '/signup'
}