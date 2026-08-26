import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProdutoRequests from '../../../fetch/ProdutoRequests';
import type {ProdutoDTO} from '../../../dto/ProdutoDTO';
import Utilitario from '../../../utils/Utilitario';

function FormProduto() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState<ProdutoDTO>({
        id_categoria: 0,
        codigo: '',//s
        nome: '',//s
        descricao: '',//s
        preco_unitario: 0,//s
        quantidade_disponivel: 0,
        quantidade_minima: 0,
        ativo: true,
        data_cadastro: new Date()//s
    });

    // Atualiza o state a partir de qualquer input do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

				// Verifica se o campo alterado é o código, se sim irá formatar usando uma expressão regular
        if (name === 'codigo') {
            const codigoFormatado = Utilitario.formatarCodigo(value);
            setFormData(prev => ({ ...prev, [name]: codigoFormatado }));
            return;
        }
        		// Verifica se o campo alterado é o  Data, se sim irá formatar usando uma expressão regular
        if (name === 'Data') {
            const DataFormatado = Utilitario.formatarDataParaInput(value);
            setFormData(prev => ({ ...prev, [name]: DataFormatado }));
            return;
        }
        		// Verifica se o campo alterado é o  DataParaInput, se sim irá formatar usando uma expressão regular
        if (name === 'DataParaInput') {
            const DataFormatado = Utilitario.formatarDataParaInput(value);
            setFormData(prev => ({ ...prev, [name]: DataFormatado }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Envia os dados para a requisição
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault(); // evita o recarregamento da página
        
        // valida para saber se o campo preço contém uma expressão regular de e-mail
        if (!Utilitario.validarPreco(formData.preco_unitario)) {
            alert("Preço inválido");
            return;
        }

          // valida para saber se o campo nome contém uma expressão regular de e-mail
        if (!Utilitario.validarNome(formData.nome)) {
            alert("Nome inválido");
            return;
        }
          // valida para saber se o campo quantidade mínima contém uma expressão regular de e-mail
        if (!Utilitario.validarQuantidadeMinima(formData.quantidade_minima)) {
            alert("Quantidade mínima inválida");
            return;
        }
         // valida para saber se o campo preço contém uma expressão regular de e-mail
        if (!Utilitario.validarPreco(formData.preco_unitario)) {
            alert("Preço inválido");
            return;
        }
           // valida para saber se o campo categoria contém uma expressão regular de e-mail
        if (!Utilitario.validarCategoria(formData.id_categoria)) {
            alert("Categoria inválida");
            return;
        }
           // valida para saber se o campo código contém uma expressão regular de e-mail
        if (!Utilitario.validarCodigo(formData.codigo)) {
            alert("Código inválido");
            return;
        }
        // chama o método que irá fazer a requisição à API
        const resposta = await ProdutoRequests.criar(formData);
        if (resposta) {
            alert("Produto cadastrado com sucesso");
        } else {
            alert("Erro ao cadastrar produto");
        }

        if (resposta) {
    alert("Produto cadastrado com sucesso");
    navigate('/lista/produtos');
}
    };

    return (
        <main className="bg-gray-100 flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 border border-slate-200">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold text-slate-800 mb-8 sm:mb-12">
                        Cadastro de Produto
                    </h1>

                   {/* Código e Nome */}
<div className="flex flex-col sm:flex-row gap-6">

    <div className="flex-1">
        <label
            htmlFor="codigo"
            className="block text-sm font-semibold text-slate-700 mb-2"
        >
            Código do Produto
        </label>

        <input
            type="text"
            name="codigo"
            id="codigo"
            value={formData.codigo}
            required
            onChange={handleChange}
            placeholder="Digite o código do produto"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
        />
    </div>

    <div className="flex-1">
        <label
            htmlFor="nome"
            className="block text-sm font-semibold text-slate-700 mb-2"
        >
            Nome
        </label>

        <input
            type="text"
            name="nome"
            id="nome"
            required
            minLength={3}
            onChange={handleChange}
            placeholder="Digite o nome do produto"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
        />
    </div>

</div>

{/* Descrição e Categoria */}
<div className="flex flex-col sm:flex-row gap-6 mt-6">

    <div className="flex-1">
        <label
            htmlFor="descricao"
            className="block text-sm font-semibold text-slate-700 mb-2"
        >
            Descrição
        </label>

        <input
            type="text"
            name="descricao"
            id="descricao"
            onChange={handleChange}
            placeholder="Digite a descrição do produto"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
        />
    </div>

    <div className="flex-1">
        <label
            htmlFor="id_categoria"
            className="block text-sm font-semibold text-slate-700 mb-2"
        >
            Categoria
        </label>

        <input
            type="number"
            name="id_categoria"
            id="id_categoria"
            required
            onChange={handleChange}
            placeholder="Informe o ID da categoria"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all"
        />
    </div>

</div>

{/* Preço e Data */}
<div className="flex flex-col sm:flex-row gap-6 mt-6">

    <div className="flex-1">
        <label
            htmlFor="preco_unitario"
            className="block text-sm font-semibold text-slate-700 mb-2"
        >
            Preço Unitário
        </label>

        <input
            type="number"
            step="0.01"
            name="preco_unitario"
            id="preco_unitario"
            required
            onChange={handleChange}
            placeholder="0,00"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all"
        />
    </div>

    <div className="flex-1">
        <label
            htmlFor="data_cadastro"
            className="block text-sm font-semibold text-slate-700 mb-2"
        >
            Data de Cadastro
        </label>

        <input
            type="date"
            name="data_cadastro"
            id="data_cadastro"
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all"
        />
    </div>

</div>

{/* Quantidades */}
<div className="flex flex-col sm:flex-row gap-6 mt-6">

    <div className="flex-1">
        <label
            htmlFor="quantidade_disponivel"
            className="block text-sm font-semibold text-slate-700 mb-2"
        >
            Quantidade Disponível
        </label>

        <input
            type="number"
            name="quantidade_disponivel"
            id="quantidade_disponivel"
            onChange={handleChange}
            placeholder="0"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all"
        />
    </div>

    <div className="flex-1">
        <label
            htmlFor="quantidade_minima"
            className="block text-sm font-semibold text-slate-700 mb-2"
        >
            Quantidade Mínima
        </label>

        <input
            type="number"
            name="quantidade_minima"
            id="quantidade_minima"
            required
            onChange={handleChange}
            placeholder="0"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all"
        />
    </div>

</div>

{/* Ativo */}
<div className="mt-6">

    <label
        htmlFor="ativo"
        className="block text-sm font-semibold text-slate-700 mb-2"
    >
        Produto Ativo
    </label>

    <select
        id="ativo"
        name="ativo"
        onChange={(e) =>
            setFormData(prev => ({
                ...prev,
                ativo: e.target.value === "true"
            }))
        }
        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all"
    >
        <option value="true">Sim</option>
        <option value="false">Não</option>
    </select>

</div>
                </form>
            </div>
        </main>
    );
}

export default FormProduto;