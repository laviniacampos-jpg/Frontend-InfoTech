import { type JSX, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Navegacao.css";
import appIcon from "../../assets/app-icon.png";
import AuthRequests from "../../fetch/AuthRequests";

function Navegacao(): JSX.Element {
    const navigate = useNavigate();

    const [menuAberto, setMenuAberto] = useState(false);

    const isAuthenticated = (() => {
        const isAuth = localStorage.getItem("isAuth");
        const token = localStorage.getItem("token");

        return !!(
            isAuth &&
            token &&
            AuthRequests.checkTokenExpiry()
        );
    })();

    const nome = localStorage.getItem("nome") || "Usuário";
    const email = localStorage.getItem("email") || "";

    const navegar = (rota: string) => {
        navigate(rota);
        setMenuAberto(false);
    };

    const sair = () => {
        AuthRequests.removeToken();
        navigate("/login");
        setMenuAberto(false);
    };

    return (
        <nav className="navegacao">

            <div className="nav-container">

                {/* LOGO */}
                <div
                    className="nav-logo-container"
                    onClick={() => navegar("/")}
                >
                    <img
                        src={appIcon}
                        alt="Logo"
                        className="nav-logo-img"
                    />

                    <h1 className="nav-logo">
                        Meu Site
                    </h1>
                </div>

                {/* BOTÃO MOBILE */}
                <button
                    className="nav-toggle"
                    onClick={() => setMenuAberto(!menuAberto)}
                >
                    ☰
                </button>

                {/* MENU */}
                <ul
                    className={`nav-menu ${
                        menuAberto ? "nav-menu-aberto" : ""
                    }`}
                >

                    {/* HOME */}
                    <li className="nav-item">
                        <button
                            className="nav-link"
                            onClick={() => navegar("/")}
                        >
                            <span>⌂</span>
                            Home
                        </button>
                    </li>

                    {/* PRODUTOS */}
                    {isAuthenticated && (
                        <li className="nav-item">
                            <button
                                className="nav-link"
                                onClick={() =>
                                    navegar("/lista/produtos")
                                }
                            >
                                <span>📦</span>
                                Produtos
                            </button>
                        </li>
                    )}

                    {/* CATEGORIAS */}
                    {isAuthenticated && (
                        <li className="nav-item">
                            <button
                                className="nav-link"
                                onClick={() =>
                                    navegar("/lista/categorias")
                                }
                            >
                                <span>🏷️</span>
                                Categorias
                            </button>
                        </li>
                    )}

                    {/* ESTOQUE */}
                    {isAuthenticated && (
                        <li className="nav-item">
                            <button
                                className="nav-link"
                                onClick={() =>
                                    navegar("/estoque")
                                }
                            >
                                <span>📊</span>
                                Estoque
                            </button>
                        </li>
                    )}

                    {/* USUÁRIO */}
                    {isAuthenticated ? (
                        <li className="nav-user">

                            <div className="nav-user-info">
                                <strong>{nome}</strong>
                                <span>{email}</span>
                            </div>

                            <button
                                className="nav-button-sair"
                                onClick={sair}
                            >
                                Sair
                            </button>

                        </li>
                    ) : (
                        <li className="nav-item">
                            <button
                                className="nav-button-login"
                                onClick={() => navegar("/login")}
                            >
                                Login
                            </button>
                        </li>
                    )}

                </ul>

            </div>

        </nav>
    );
}

export default Navegacao;