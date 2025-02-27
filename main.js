document.addEventListener("DOMContentLoaded", function() {
  const contenedor_inputs = document.getElementById('contenedor_inputs');
  const glosarioContainer = document.getElementById("glosario");
  const searchInput = document.getElementById("searchInput");
  const app = document.querySelector('.app');
  const lateral = document.getElementById('lateral');
  const principal = document.getElementById('principal');
  
  let despliegue = false;
  
  function CERRAR_MENU() {
    console.log('invisible');
    lateral.style.left = '-250px';
    despliegue = false;
  }
  
  function ABRIR_MENU() {
    console.log('visible');
    lateral.style.left = '0';
    despliegue = true;
    
  }
  
  function evento_app() {
    
    if (despliegue) {
      CERRAR_MENU();
    } else {
      ABRIR_MENU();
    }
  }
  
  function loadJSON(callback) {
    const xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open('GET', 'glosario.json', true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(xhr.responseText);
      }
    };
    xhr.send(null);
  }
  
  function renderGlosario(data) {
    glosarioContainer.innerHTML = ""; // Limpiar el contenido anterior
    
    // Ordenar el array alfabéticamente por siglas antes de renderizar
    data.sort((a, b) => a.siglas.localeCompare(b.siglas));
    data.forEach((entry, index) => {
      const termElement = document.createElement("div");
      termElement.classList.add("term");
      termElement.setAttribute('id', 'term');
      
      // Crear el elemento para las siglas y la definición
      const siglasElement = document.createElement("strong");
      siglasElement.innerHTML = `${entry.siglas}  <span id='significado'>${entry.significado}</span><span id='definicion'>${entry.definicion}</span> <img id='img_termino' class='img_termino' src='${entry.img}' alt='${index}'></img>`;
      
      // Crear el elemento para la traducción
      const traductionElement = document.createElement("div");
      traductionElement.classList.add("traduction");
      traductionElement.setAttribute('id', 'traduction');
      traductionElement.textContent = `${entry.traduccion}`;
      
      // Crear el elemento para la explicación
      const explicacionElement = document.createElement("div");
      explicacionElement.classList.add("explicacion");
      explicacionElement.textContent = entry.explicacion;
      
      // Añadir los elementos al contenedor del término
      termElement.appendChild(siglasElement);
      termElement.appendChild(traductionElement);
      termElement.appendChild(explicacionElement);
      
      // Añadir el término al contenedor del glosario
      glosarioContainer.appendChild(termElement);
    });
  }
  // Evento de búsqueda al escribir en el campo
  searchInput.addEventListener("input", function() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    // Filtrar términos del glosario según la búsqueda
    const filteredData = glosarioData.filter(entry =>
      entry.siglas.toLowerCase().includes(searchTerm) ||
      entry.definicion.toLowerCase().includes(searchTerm) ||
      entry.traduccion.toLowerCase().includes(searchTerm)
    );
    
    renderGlosario(filteredData);
    
  });
  
  // Cargar el JSON externo y renderizar el glosario inicialmente
  loadJSON(function(response) {
    glosarioData = JSON.parse(response);
    renderGlosario(glosarioData);
  });
  
  
  
  
  
  contenedor_inputs.addEventListener('click', (e) => {
    CAMPOS_DE_TEXTO_OPACIDAD_20();
  });
  
  const CAMPOS_DE_TEXTO_OPACIDAD_20 = () => {
    //contenedor_inputs.style.opacity='100%';
    // Cambiar la opacidad a 100%
    contenedor_inputs.style.opacity = '1'; // 1 es equivalente al 100%
    // Esperar unos minutos (por ejemplo, 5 minutos = 300,000 milisegundos)
    /*  setTimeout(function() {
        // Cambiar la opacidad de vuelta a 10%
        contenedor_inputs.style.opacity = '0.2'; // 0.01 es equivalente al 20%


    }, 30000); // 300000 milisegundos = 5 minutos
*/
  }
  /*function width_95wv() {
      contenedor_inputs.style.width='95vw';
  }*/
  glosarioContainer.addEventListener('click', (e) => {
    //contenedor_inputs.style.display='block';
    CAMPOS_DE_TEXTO_OPACIDAD_20();
    const click = e.target.closest('.term');
    if (click) {
      MAXIMIZAR();
      
      // Obtener los valores de siglas, definición y traducción del elemento clickeado
      const siglas = click.querySelector('strong').textContent. /*trim()*/ split(' ')[0]; // Las siglas son el primer segmento antes del espacio
      
      const definicion = click.querySelector('span').textContent.slice(1, -1); // Obtener definición sin paréntesis
      const traduccion = click.querySelector('.traduction').textContent.trim(); // Traducción es el texto del siguiente elemento
      
      // Llenar los campos de texto con los valores recuperados
      siglasInput.value = siglas;
      definicionInput.value = definicion;
      traduccionInput.value = traduccion;
      
      // También puedes guardar los valores en el localStorage si lo deseas
      /* localStorage.setItem('siglas', siglas);
       localStorage.setItem('definicion', definicion);
       localStorage.setItem('traduccion', traduccion);*/
    }
    
  });
  const MINIMIZAR = () => {
    contenedor_inputs.style.width = '70px';
    contenedor_inputs.style.height = '50px';
    siglasInput.style.display = 'none';
    definicionInput.style.display = 'none';
    traduccionInput.style.display = 'none';
    btn_registrar.style.display = 'none';
    
  }
  const MAXIMIZAR = () => {
    contenedor_inputs.style.display = 'block';
    contenedor_inputs.style.width = '95vw';
    contenedor_inputs.style.height = 'auto';
    //  contenedor_inputs.style.display='flex';
    siglasInput.style.display = 'block';
    definicionInput.style.display = 'block';
    traduccionInput.style.display = 'block';
    btn_registrar.style.display = 'block';
  }
  const CERRAR = () => {
    contenedor_inputs.style.display = 'none';
  }
  const barra_task = document.querySelector('#barra_task');
  barra_task.addEventListener('click', (e) => {
    const clicket = e.target;
    switch (clicket.id) {
      case 'minimizar':
        if (contenedor_inputs.style.width === '70px' && contenedor_inputs.style.height === '50px') {
          MAXIMIZAR();
        } else {
          MINIMIZAR();
        }
        break;
      case 'cerrar':
        CERRAR();
        break;
    }
  });
  const ininicializar_programa = () => {
    // programar como debe ser inicializado la ventana de edicion de registros
    MINIMIZAR();
  }
  ininicializar_programa();
  
  
  document.addEventListener('click', (e) => {
    //  principal.addEventListener('click', (e) => {
    //console.log(e.target.id)
    const CLICKED = e.target;
    // console.log( CLICKED.tagName)
    switch (CLICKED.id) {
      case 'app':
        // console.log('click hiciste')
        evento_app();
        break;
        
      case 'lat_emcabezado':
        //lateral.style.left = '-250px';
        CERRAR_MENU();
        break;
      case 'titulo':
        //lateral.style.left = '-250px';
        CERRAR_MENU();
        break;
      case 'searchInput':
        //lateral.style.left = '-250px';
        CERRAR_MENU();
        break;
      case 'glosario':
        //lateral.style.left = '-250px';
        CERRAR_MENU();
        break;
      case 'term':
        //lateral.style.left = '-250px';
        CERRAR_MENU();
        break;
      case 'definicion':
        //lateral.style.left = '-250px';
        CERRAR_MENU();
        break;
      case 'traduction':
        //lateral.style.left = '-250px';
        CERRAR_MENU();
        break;
      case 'barra_task':
        //lateral.style.left = '-250px';
        CERRAR_MENU();
        break;
      case 'minimizar':
        //lateral.style.left = '-250px';
        CERRAR_MENU();
        break;
      case 'cerrar':
        //lateral.style.left = '-250px';
        break;
        CERRAR_MENU();
      case 'siglasInput':
        //lateral.style.left = '-250px';
        CERRAR_MENU();
        break;
      case 'definicionInput':
        //lateral.style.left = '-250px';
        CERRAR_MENU();
        break;
      case 'traduccionInput':
        //lateral.style.left = '-250px';
        CERRAR_MENU();
        break;
      case 'btn_registrar':
        //lateral.style.left = '-250px';
        CERRAR_MENU();
        break;
        
      default:
        // Tab to edit
    }
    
  });
  
  
  
  
  const array = ['block', 'boton2', 'boton3'];
  //console.log(array);
  const contenedor_botones = document.createElement('div');
  lateral.appendChild(contenedor_botones);
  contenedor_botones.setAttribute('id', 'contenedor_botones');
  for (let prop of array) {
    // console.log(prop);
    const btn = document.createElement('button');
    btn.innerHTML = prop;
    contenedor_botones.appendChild(btn);
    btn.setAttribute('id', 'botones_lateral');
  }
});