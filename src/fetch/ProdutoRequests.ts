import type { ProdutoDTO } from "../dto/ProdutoDTO";

class ProdutoRequests {

    private serverUrl: string;
    private endpoint: string;

    constructor() {
        this.serverUrl = "http://localhost:3333";
        this.endpoint = "/api/produtos";
    }

    async criar(produto: ProdutoDTO) {
        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${this.serverUrl}${this.endpoint}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(produto)
                }
            );

            if (!response.ok) {
                throw new Error("Erro ao cadastrar produto");
            }

            return await response.json();

        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async listar() {
        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${this.serverUrl}${this.endpoint}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            return await response.json();

        } catch (error) {
            console.error(error);
            return [];
        }
    }
    async obterProdutoPorId(id: number) {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
            `${this.serverUrl}/api/produtos/${id}`,
            {
                method: "GET",

                headers: {
                    "Content-Type": "application/json",
                    ...(token
                        ? {
                            Authorization: `Bearer ${token}`
                        }
                        : {})
                }
            }
        );

        if (!response.ok) {
            throw new Error("Produto não encontrado.");
        }

        return await response.json();

    } catch (error) {

        console.error(
            "Erro ao buscar produto por ID:",
            error
        );

        throw error;
    }
}
}

export default new ProdutoRequests();