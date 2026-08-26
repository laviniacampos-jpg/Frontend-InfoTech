import type { JSX } from "react";

import Navegacao from "../../../components/Navegacao/Navegacao";
import ListagemProduto from "../../../components/Listagens/ListagensProduto/ListagensProduto";
import Rodape from "../../../components/Rodape/Rodape";

function PListagemProduto(): JSX.Element {
    return (
        <>
            <Navegacao />

            <ListagemProduto />

            <Rodape />
        </>
    );
}

export default PListagemProduto;