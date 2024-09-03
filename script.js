// Mapeo de libros de la Biblia a sus abreviaturas
const librosAbreviados = {
    "Génesis": "GEN",
    "Éxodo": "EXO",
    "Levítico": "LEV",
    "Números": "NUM",
    "Deuteronomio": "DEU",
    "Josué": "JOS",
    "Jueces": "JDG",
    "Rut": "RUT",
    "1Samuel": "1SA",
    "2Samuel": "2SA",
    "1Reyes": "1KI",
    "2Reyes": "2KI",
    "1Crónicas": "1CH",
    "2Crónicas": "2CH",
    "Esdras": "EZR",
    "Nehemías": "NEH",
    "Ester": "EST",
    "Job": "JOB",
    "Salmos": "PSA",
    "Proverbios": "PRO",
    "Eclesiastés": "ECC",
    "Cantar de los Cantares": "SNG",
    "Isaías": "ISA",
    "Jeremías": "JER",
    "Lamentaciones": "LAM",
    "Ezequiel": "EZE",
    "Daniel": "DAN",
    "Oseas": "HOS",
    "Joel": "JOE",
    "Amós": "AMO",
    "Abdías": "OBA",
    "Jonás": "JON",
    "Miqueas": "MIC",
    "Nahúm": "NAH",
    "Habacuc": "HAB",
    "Sofonías": "ZEP",
    "Hageo": "HAG",
    "Zacarías": "ZEC",
    "Malaquías": "MAL",
    "Mateo": "MAT",
    "Marcos": "MRK",
    "Lucas": "LUK",
    "Juan": "JHN",
    "Hechos": "ACT",
    "Romanos": "ROM",
    "1Corintios": "1CO",
    "2Corintios": "2CO",
    "Gálatas": "GAL",
    "Efesios": "EPH",
    "Filipenses": "PHP",
    "Colosenses": "COL",
    "1Tesalonicenses": "1TH",
    "2Tesalonicenses": "2TH",
    "1Timoteo": "1TI",
    "2Timoteo": "2TI",
    "Tito": "TIT",
    "Filemón": "PHM",
    "Hebreos": "HEB",
    "Santiago": "JAS",
    "1Pedro": "1PE",
    "2Pedro": "2PE",
    "1Juan": "1JN",
    "2Juan": "2JN",
    "3Juan": "3JN",
    "Judas": "JUD",
    "Apocalipsis": "REV"
};

// Función para obtener el enlace de YouVersion
function obtenerEnlaceBiblia(referencia) {
    const partes = referencia.split(' ');
    const libro = partes[0];
    const capVerso = partes[1];
    
    const abreviatura = librosAbreviados[libro];
    if (!abreviatura) {
        console.error(`No se encontró la abreviatura para el libro: ${libro}`);
        return '';
    }

    return `https://www.bible.com/es/bible/127/${abreviatura}.${capVerso.replace('.', '.')}`;
}

document.querySelectorAll('.emocion').forEach(button => {
    button.addEventListener('click', () => {
        const emocion = button.getAttribute('data-emocion');
        fetch('versiculos.json')
            .then(response => response.json())
            .then(data => {
                const versiculos = data[emocion];
                if (!versiculos || versiculos.length === 0) {
                    console.error(`No se encontraron versículos para la emoción: ${emocion}`);
                    return;
                }
                
                const indiceAleatorio = Math.floor(Math.random() * versiculos.length);
                const versiculo = versiculos[indiceAleatorio];

                // Actualizar el contenido del modal
                document.getElementById('modal-texto-versiculo').textContent = versiculo.texto;
                document.getElementById('modal-referencia-versiculo').textContent = versiculo.versiculo;
                document.getElementById('modal-reflexion').textContent = versiculo.reflexion;

                // Genera el enlace del versículo
                const referencia = versiculo.versiculo; // Usar el texto del versículo
                const versiculoLink = obtenerEnlaceBiblia(referencia); // Llama a la función para obtener el enlace

                // Actualiza el botón para que redirija al enlace del versículo
                const irABibliaButton = document.getElementById('ir-a-biblia');
                irABibliaButton.onclick = function() {
                    window.open(versiculoLink, '_blank'); // Abre el enlace en una nueva pestaña
                };

                // Aplicar desenfoque al contenido de la página
                document.getElementById('page-content').classList.add('modal-open');

                // Mostrar el modal
                const modal = document.getElementById('versiculo-modal');
                modal.style.display = "block";
            })
            .catch(error => console.error('Error al cargar los versículos:', error));
    });
});

// Cerrar el modal cuando se haga clic en el botón de cerrar
document.querySelector('.close').addEventListener('click', () => {
    const modal = document.getElementById('versiculo-modal');
    modal.style.display = "none";
    document.getElementById('page-content').classList.remove('modal-open');
});