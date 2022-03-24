import axios from 'axios'

const CLIENTE_API_URL = "http://localhost:8080/api/v1/clientes"

class ClienteService {
    getAllClientes() {
        return axios.get(CLIENTE_API_URL);
    }

    createCliente(cliente) {
        return axios.post(CLIENTE_API_URL, cliente);
    }

    getClienteById(id) {
        return axios.get(CLIENTE_API_URL + "/" + id);
    }

    updateCliente(id, cliente) {
        return axios.put(CLIENTE_API_URL + "/" + id, cliente);
    }

    deleteCliente(id) {
        return axios.delete(CLIENTE_API_URL + "/" + id);
    }
}

export default new ClienteService();