import './Rodape.css'

import { RiInstagramFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Rodape = () => {
    return (
        <>
        <footer>
            <div className="rodape_todos_links">
                <div className="rodape_links">
                    <div className="links">
                        <div className="sitemap">
                            <p className="sitemap_titu">Empresa</p>
                            <a href="" className="anchor2 menu-item2" role="link" aria-label="Ir para a seção 'Sobre'" tabIndex={5}>Sobre</a>
                            <a href="" className="anchor2 menu-item2" role="link" aria-label="Ir para a seção 'Vantagens'" tabIndex={5}>Vantagens</a>
                            <a href="" className="anchor2 menu-item2" role="link" aria-label="Ir para a seção 'Vídeo Pitch'" tabIndex={5}>Vídeo Pitch</a>
                            <a href="" className="anchor2 menu-item2" role="link" aria-label="Ir para a seção 'Equipe'" tabIndex={5}>Equipe</a>
                        </div>
                        <div className="sitemap4">
                            <p className="sitemap_titu">Links</p>
                            <a href="" className="anchor2 menu-item2" role="link" aria-label="Ir para o perfil do Instagram de @Vapt-Vupt" tabIndex={5}>Instagram</a>
                            <a href="" className="anchor2 menu-item2" role="link" aria-label="Ir para o canal do Youtube de @Vapt-Vupt" tabIndex={5}>Youtube</a>
                            <a href="" className="anchor2 menu-item2" role="link" aria-label="Ir para o perfil do GitHub de @Vapt-Vupt" tabIndex={5}>GitHub</a>
                        </div>
                    </div>
                    <div className="redes_sociais_rodape">
                        <a href="" className="redes_sociais" tabIndex={5}>
                            <RiInstagramFill size={18} />                              
                        </a>
                        <a href="" className="redes_sociais" tabIndex={5}>
                            <FaYoutube size={18} />                                                         
                        </a>
                        <a href="" className="redes_sociais" tabIndex={5}>
                            <FaGithub size={18} />                                                       
                        </a>
                    </div>
                </div>
            </div>  
            <div className="tudo_rodape_baixo">
                <div className="logo_rodape">
                </div>
                <a href="" className="lerami" role="link" aria-label="Ir para a página do Friendly" tabIndex={5}>© 2024 FRIENDLY</a>
            </div>
        </footer>
        </>
    )
}

export default Rodape