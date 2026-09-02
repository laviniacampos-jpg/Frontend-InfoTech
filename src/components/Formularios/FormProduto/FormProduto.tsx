import React, { useState } from "react";
import ProdutoRequests from "../../../fetch/ProdutoRequests";

interface IProduto {
  id_produto: number;
  id_categoria: number;
  codigo: string;
  nome: string;
  descricao: string;
  preco_unitario: number;
  quantidade_disponivel: number;
  quantidade_minima: number;
  ativo: boolean;
}

interface FormProdutoProps {
  produtos?: IProduto[];
  onSuccess?: () => void;
}

export default function FormProduto({ produtos = [], onSuccess }: FormProdutoProps) {
  const [formData, setFormData] = useState({
    id_categoria: 1,
    codigo: "",
    nome: "",
    descricao: "",
    preco_unitario: 0,
    quantidade_disponivel: 0,
    quantidade_minima: 0,
    ativo: true,
  });
  const [erroTela, setErroTela] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    let val: string | number | boolean = value;

    if (type === "checkbox") {
      val = (e.target as HTMLInputElement).checked;
    } else if (type === "number") {
      val = value === "" ? 0 : Number(value);
    } else if (name === "id_categoria") {
      val = Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Formulário enviado:", formData);
    setErroTela(null);

    if (!formData.codigo.trim() || !formData.nome.trim()) {
      const erroValidacao = "Por favor, preencha o Código e o Nome do produto.";
      console.error("Erro de validação:", erroValidacao, formData);
      setErroTela(`Erro ao cadastrar: ${erroValidacao}`);
      return;
    }

    const precoInformado = String(formData.preco_unitario)
      .replace(/R\$\s*/g, "")
      .replace(",", ".");
    const payload = {
      ...formData,
      id_categoria: Number(formData.id_categoria),
      preco_unitario: Number(precoInformado),
      quantidade_disponivel: Number(formData.quantidade_disponivel),
      quantidade_minima: Number(formData.quantidade_minima),
    };

    try {
      console.log("Payload enviado:", payload);
      const resposta = await ProdutoRequests.criar(payload);
      console.log("Resposta do servidor:", resposta);

      if (!resposta) {
        throw new Error(
          "O servidor recusou o cadastro. Verifique se o Código do produto já existe no banco!"
        );
      }

      alert("Produto cadastrado com sucesso!");
      setFormData({
        id_categoria: 1,
        codigo: "",
        nome: "",
        descricao: "",
        preco_unitario: 0,
        quantidade_disponivel: 0,
        quantidade_minima: 0,
        ativo: true,
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      const erroApi = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      setErroTela(
        "Erro ao cadastrar: " +
        (erroApi.response?.data?.message || erroApi.message || "Erro desconhecido")
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="form-container mb-8">
        <h2>Cadastro de Produtos</h2>

        <div>
          <label>Categoria:</label>
          <select
            name="id_categoria"
            value={formData.id_categoria}
            onChange={handleChange}
          >
            <option value={1}>Periféricos</option>
            <option value={2}>Hardware</option>
          </select>
        </div>

        <div>
          <label>Código:</label>
          <input
            type="text"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Nome do produto:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Descrição:</label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Preço unitário:</label>
          <input
            type="number"
            step="0.01"
            name="preco_unitario"
            value={formData.preco_unitario}
            onChange={(e) =>
              setFormData({
                ...formData,
                preco_unitario: e.target.value === "" ? 0 : parseFloat(e.target.value),
              })
            }
            required
          />
        </div>

        <div>
          <label>Quantidade disponível:</label>
          <input
            type="number"
            name="quantidade_disponivel"
            value={formData.quantidade_disponivel}
            onChange={(e) =>
              setFormData({
                ...formData,
                quantidade_disponivel: e.target.value === "" ? 0 : parseInt(e.target.value, 10),
              })
            }
            required
          />
        </div>

        <div>
          <label>Quantidade mínima:</label>
          <input
            type="number"
            name="quantidade_minima"
            value={formData.quantidade_minima}
            onChange={(e) =>
              setFormData({
                ...formData,
                quantidade_minima: e.target.value === "" ? 0 : parseInt(e.target.value, 10),
              })
            }
            required
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="ativo"
              checked={formData.ativo}
              onChange={handleChange}
            />
            Produto ativo
          </label>
        </div>

        {erroTela && (
          <div
            style={{
              color: "red",
              backgroundColor: "#fee2e2",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          >
            {erroTela}
          </div>
        )}

        <button
          type="submit"
          className="button-class"
        >
          Cadastrar Produto
        </button>
      </form>

      {/* Exibição da Lista */}
      <section className="produtos-cadastrados">
        <h3>Produtos Cadastrados ({produtos.length})</h3>
        {produtos.length === 0 ? (
          <p>Nenhum produto cadastrado.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {produtos.map((item, index) => (
              <div key={item.id_produto || index} className="border p-4 rounded shadow">
                <h4>{item.nome}</h4>
                <p>Código: {item.codigo}</p>
                <p>{item.descricao || "Sem descrição."}</p>
                <p><strong>R$ {Number(item.preco_unitario || 0).toFixed(2)}</strong></p>
                <span>Estoque: {item.quantidade_disponivel ?? 0}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}