import axios from "axios"

const PACOTE_API_URL = "http://localhost:8080/api/v1/pacotes"

class PacoteService {

    getAllPacotes() {
        return axios.get(PACOTE_API_URL);
    }

    createPacote(pacote) {
        return axios.post(PACOTE_API_URL, pacote);
    }

    getPacoteById(pacoteId) {
        return axios.get(PACOTE_API_URL + "/" + pacoteId);
    }

    updatePacote(pacoteId, pacote) {
        return axios.put(PACOTE_API_URL + "/" + pacoteId, pacote);
    }

    deletePacote(pacoteId) {
        return axios.delete(PACOTE_API_URL + "/" + pacoteId);
    }
}

export default new PacoteService();