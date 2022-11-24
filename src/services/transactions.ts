import axios, { AxiosResponse } from 'axios';
import { Transaction } from '../models/transaction.interface';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 15000,
});
const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string, headers: {}) => instance.get(url, headers).then(responseBody),
    post: (url: string, body: {}, headers: {}) => instance.post(url, body, headers).then(responseBody),
    put: (url: string, body: {}, headers: {}) => instance.put(url, body, headers).then(responseBody),
    delete: (url: string) => instance.delete(url).then(responseBody),
};

export const Transactions = {
    transferir: (transaction: Transaction): Promise<Transaction> =>
        requests.put('transferir', transaction, { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } }),
    getTransactionsFromId: (id: number): Promise<any> => requests.get(`transactions/${id}`, { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } }),

};
