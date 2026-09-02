
import { useState, type FormEvent } from "react";

import Navegacao from "./components/Navegacao/Navegacao";
import Rodape from "./components/Rodape/Rodape";

import "./App.css";

interface Produto {
    id_produto: number;
    id_categoria: number;
    codigo: string;
    nome: string;
    descricao?: string;
    preco_unitario: number;
    quantidade_disponivel?: number;
    quantidade_minima: number;
    ativo?: boolean;
}

function App() {

    const [produto, setProduto] = useState({
        id_categoria: "",
        codigo: "",
        nome: "",
        descricao: "",
        preco_unitario: "",
        quantidade_disponivel: "",
        quantidade_minima: "",
        ativo: true
    });

    const [produtos, setProdutos] = useState<Produto[]>([]);

    const handleChange = (
        campo: string,
        valor: string | boolean
    ) => {
        setProduto({
            ...produto,
            [campo]: valor
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (
            !produto.id_categoria ||
            !produto.codigo ||
            !produto.nome ||
            !produto.preco_unitario ||
            !produto.quantidade_minima
        ) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        const novoProduto = {
            id_categoria: Number(produto.id_categoria),
            codigo: produto.codigo,
            nome: produto.nome,
            descricao: produto.descricao,
            preco_unitario: Number(produto.preco_unitario),
            quantidade_disponivel: Number(
                produto.quantidade_disponivel || 0
            ),
            quantidade_minima: Number(produto.quantidade_minima),
            ativo: produto.ativo
        };

        try {
            const resposta = await fetch("http://localhost:3333/api/produtos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(novoProduto)
            });

            if (!resposta.ok) {
                throw new Error("Erro ao cadastrar produto.");
            }

            const produtoCadastrado = await resposta.json();

            setProdutos((listaAtual) => [
                ...listaAtual,
                produtoCadastrado
            ]);

            setProduto({
                id_categoria: "",
                codigo: "",
                nome: "",
                descricao: "",
                preco_unitario: "",
                quantidade_disponivel: "",
                quantidade_minima: "",
                ativo: true
            });

            alert("Produto cadastrado com sucesso!");

        } catch (error) {
            console.error(error);

            alert(
                "Não foi possível cadastrar o produto. Verifique se a API está funcionando."
            );
        }
    };

    return (
        <div className="app-container">

            <Navegacao />

            <main className="main-content">

                <section className="produto-container">

                    <div className="page-header">

                        <div>
                            <span className="page-tag">
                                GESTÃO DE ESTOQUE
                            </span>

                            <h1>
                                Cadastro de Produtos
                            </h1>

                            <p className="produto-subtitulo">
                                Cadastre e gerencie os produtos da
                                InfoTech Informática.
                            </p>
                        </div>

                    </div>

                    <div className="produto-form-card">

                        <div className="card-header">
                            <div className="card-icon">
                                +
                            </div>

                            <div>
                                <h2>Novo Produto</h2>

                                <p>
                                    Preencha as informações abaixo para
                                    cadastrar um produto.
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="form-grid">

                                <div className="form-group">

                                    <label htmlFor="categoria">
                                        Categoria
                                    </label>

                                    <select
                                        id="categoria"
                                        value={produto.id_categoria}
                                        onChange={(event) =>
                                            handleChange(
                                                "id_categoria",
                                                event.target.value
                                            )
                                        }
                                    >
                                        <option value="">
                                            Selecione uma categoria
                                        </option>

                                        <option value="1">
                                            Computadores
                                        </option>

                                        <option value="2">
                                            Periféricos
                                        </option>

                                        <option value="3">
                                            Acessórios
                                        </option>
                                    </select>

                                </div>

                                <div className="form-group">

                                    <label htmlFor="codigo">
                                        Código
                                    </label>

                                    <input
                                        id="codigo"
                                        type="text"
                                        placeholder="Ex: TEC001"
                                        value={produto.codigo}
                                        onChange={(event) =>
                                            handleChange(
                                                "codigo",
                                                event.target.value
                                            )
                                        }
                                    />

                                </div>

                                <div className="form-group full-width">

                                    <label htmlFor="nome">
                                        Nome do produto
                                    </label>

                                    <input
                                        id="nome"
                                        type="text"
                                        placeholder="Ex: Teclado Gamer RGB"
                                        value={produto.nome}
                                        onChange={(event) =>
                                            handleChange(
                                                "nome",
                                                event.target.value
                                            )
                                        }
                                    />

                                </div>

                                <div className="form-group full-width">

                                    <label htmlFor="descricao">
                                        Descrição
                                    </label>

                                    <textarea
                                        id="descricao"
                                        placeholder="Digite uma descrição para o produto..."
                                        value={produto.descricao}
                                        onChange={(event) =>
                                            handleChange(
                                                "descricao",
                                                event.target.value
                                            )
                                        }
                                    />

                                </div>

                                <div className="form-group">

                                    <label htmlFor="preco">
                                        Preço unitário
                                    </label>

                                    <div className="input-money">

                                        <span>R$</span>

                                        <input
                                            id="preco"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            placeholder="0,00"
                                            value={produto.preco_unitario}
                                            onChange={(event) =>
                                                handleChange(
                                                    "preco_unitario",
                                                    event.target.value
                                                )
                                            }
                                        />

                                    </div>

                                </div>

                                <div className="form-group">

                                    <label htmlFor="quantidade">
                                        Quantidade disponível
                                    </label>

                                    <input
                                        id="quantidade"
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        value={
                                            produto.quantidade_disponivel
                                        }
                                        onChange={(event) =>
                                            handleChange(
                                                "quantidade_disponivel",
                                                event.target.value
                                            )
                                        }
                                    />

                                </div>

                                <div className="form-group">

                                    <label htmlFor="quantidadeMinima">
                                        Quantidade mínima
                                    </label>

                                    <input
                                        id="quantidadeMinima"
                                        type="number"
                                        min="0"
                                        placeholder="Ex: 5"
                                        value={
                                            produto.quantidade_minima
                                        }
                                        onChange={(event) =>
                                            handleChange(
                                                "quantidade_minima",
                                                event.target.value
                                            )
                                        }
                                    />

                                </div>

                            </div>

                            <div className="form-footer">

                                <label className="checkbox-group">

                                    <input
                                        type="checkbox"
                                        checked={produto.ativo}
                                        onChange={(event) =>
                                            handleChange(
                                                "ativo",
                                                event.target.checked
                                            )
                                        }
                                    />

                                    <span className="checkmark"></span>

                                    <span>
                                        Produto ativo
                                    </span>

                                </label>

                                <button
                                    type="submit"
                                    className="btn-cadastrar"
                                >
                                    Cadastrar Produto
                                </button>

                            </div>

                        </form>

                    </div>

                    <section className="produtos-section">

                        <div className="section-title">

                            <div>
                                <span className="page-tag">
                                    ESTOQUE
                                </span>

                                <h2>
                                    Produtos cadastrados
                                </h2>
                            </div>

                            <span className="produto-count">
                                {produtos.length} produto(s)
                            </span>

                        </div>

                        {produtos.length === 0 ? (

                            <div className="sem-produtos">

                                <div className="empty-icon">
                                    📦
                                </div>

                                <h3>
                                    Nenhum produto cadastrado
                                </h3>

                                <p>
                                    Os produtos cadastrados aparecerão
                                    aqui.
                                </p>

                            </div>

                        ) : (

                            <div className="produtos-grid">

                                {produtos.map((item) => (

                                    <div
                                        className="produto-card"
                                        key={item.id_produto}
                                    >

                                        <div className="produto-card-top">

                                            <span className="produto-codigo">
                                                {item.codigo}
                                            </span>

                                            <span
                                                className={
                                                    item.ativo
                                                        ? "status-ativo"
                                                        : "status-inativo"
                                                }
                                            >
                                                {item.ativo
                                                    ? "Ativo"
                                                    : "Inativo"}
                                            </span>

                                        </div>

                                        <h3>
                                            {item.nome}
                                        </h3>

                                        <p>
                                            {item.descricao ||
                                                "Sem descrição."}
                                        </p>

                                        <div className="produto-info">

                                            <strong>
                                                R${" "}
                                                {Number(
                                                    item.preco_unitario
                                                ).toFixed(2)}
                                            </strong>

                                            <span>
                                                Estoque:{" "}
                                                {item.quantidade_disponivel ??
                                                    0}
                                            </span>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </section>

                </section>

            </main>

            <Rodape />

        </div>
    );
}

export default App;

