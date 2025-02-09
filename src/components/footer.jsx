export default function Footer() {
    return (
        <footer className="bg-blue-800 text-white py-6 mt-16 text-center">
            <p>&copy; 2025 Calendario DOR-DEW. All rights reserved.</p>
            <div className="col-md-3">
                <ul className="list-unstyled flex justify-center gap-4 mt-4">
                    <li className="w-20">
                        <a target="_blank" className="text-light">
                            <img className="accessibility-logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAV9ELEFT9u8Xa_I5hh263FcymceK0iQF0g&s" alt="Logo Ilunion" />
                        </a>
                    </li>
                    <li className="w-12"><a target="_blank" className="text-light"><img className="accessibility-logo" src="https://www.caixabank.es/deployedfiles/particulares/Estaticos/Imagenes/General/Sello-AENOR_adecuacion_funcional.png" alt="Logo AENOR" /></a></li>
                    <li className="w-12"><a target="_blank" className="text-light"><img className="accessibility-logo" src="https://www.caixabank.es/deployedfiles/particulares/Estaticos/Imagenes/Seguridad/ISO-27001.jpg" alt="Logo BSI" /></a></li>
                </ul>
            </div>
        </footer>
    )
}