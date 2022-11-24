import axios, { AxiosResponse } from 'axios';
import { Account } from '../models/account.interface';
import { Transaction } from '../models/transaction.interface';
import { User } from '../models/user.interface';

const instance = axios.create({
	baseURL: 'http://localhost:8000/api',
	timeout: 15000,
});
const responseBody = (response: AxiosResponse) => response.data;


const requests = {
	get: (url: string, headers: {}) => instance.get(url, headers).then(responseBody),
	post: (url: string, body: {}, headers: {}) => instance.post(url, body, headers).then(responseBody),
	put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
	delete: (url: string) => instance.delete(url).then(responseBody),
};

export const Users = {
	createUsers: (user: User): Promise<User> =>
		requests.post('register', user, {}),
	login: (user: User): Promise<User> =>
		requests.post('login', user, {}),
	transferir: (transaction: Transaction): Promise<Transaction> =>
		requests.post('transferir', transaction, {}),
	getBalance: (id: number): Promise<Account> => requests.get(`balance/${id}`, { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } }),
	getUserId: (username: string): Promise<User> => requests.get(`userId/${username}`, { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } }),
	getUsername: (id: number): Promise<User> => requests.get(`user/${id}`, { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } }),
	logout: (id: number): Promise<User> => requests.get(`logout`, { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } })


};
export const Accounts = {
	createAccount: (account: Account): Promise<Account> =>
		requests.post('registeraccount', account, {}),
};