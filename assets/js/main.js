/**
 * main.js - Lógica principal de la landing page StreamFlix
 * ========================================================
 * 
 * Este archivo contiene toda la manipulación del DOM y la interactividad de la página.
 * Se utilizan patrones modernos de JavaScript y buenas prácticas de accesibilidad.
 * 
 * @author StreamFlix Team
 * @version 1.2.0
 */

/**
 * Configuración global de la aplicación
 * Centraliza todos los datos y parámetros configurables
 */
const CONFIG = {
    // Configuración del slider de imágenes
    slider: {
        interval: 4000,        // Intervalo entre transiciones (ms)
        transitionTime: 1000,  // Duración de la transición (ms)
        images: [
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
            'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
            'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
            'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1465101178521-c1a9136a3fdc?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1468071174046-657d9d351a40?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=900&q=80'
        ]
    },
    
    // Datos de películas para mostrar en las secciones
    peliculas: {
        tendencias: [
            { titulo: 'Inception', genero: 'Ciencia Ficción', imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb' },
            { titulo: 'Interstellar', genero: 'Aventura', imagen: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca' },
            { titulo: 'Joker', genero: 'Drama', imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308' },
            { titulo: 'Spider-Man: No Way Home', genero: 'Acción', imagen: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=500&q=80' },
            { titulo: 'Dune', genero: 'Ciencia Ficción', imagen: 'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=500&q=80' }
        ],
        miLista: [
            { titulo: 'Matrix', genero: 'Acción', imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=500&q=80' },
            { titulo: 'Avengers', genero: 'Superhéroes', imagen: 'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=500&q=80' },
            { titulo: 'Titanic', genero: 'Romance', imagen: 'https://images.unsplash.com/photo-1468071174046-657d9d351a40?auto=format&fit=crop&w=500&q=80' },
            { titulo: 'El Padrino', genero: 'Crimen', imagen: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=500&q=80' }
        ]
    },

    // Configuración del formulario
    form: {
        validations: {
            nombre: {
                pattern: /.+/,
                message: 'Nombre requerido'
            },
            email: {
                pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                message: 'Email inválido'
            },
            numero: {
                pattern: /^\+56\s?9\s?\d{4}\s?\d{4}$/,
                message: 'Número debe ser formato +56 9 XXXX XXXX'
            },
            mensaje: {
                pattern: /.+/,
                message: 'Mensaje requerido'
            }
        }
    }
};

/**
 * Utilidades para manipulación del DOM
 * Proporciona métodos reutilizables para acceder y manipular elementos HTML
 */
const DOM = {
    /**
     * Obtiene un elemento por su ID
     * @param {string} id - ID del elemento a obtener
     * @return {HTMLElement|null} - El elemento encontrado o null
     */
    get: id => document.getElementById(id),
    
    /**
     * Crea un nuevo elemento HTML
     * @param {string} tag - Nombre de la etiqueta HTML
     * @return {HTMLElement} - El elemento creado
     */
    create: tag => document.createElement(tag),
    
    /**
     * Selecciona el primer elemento que coincida con el selector
     * @param {string} sel - Selector CSS
     * @return {HTMLElement|null} - El primer elemento encontrado o null
     */
    query: sel => document.querySelector(sel),
    
    /**
     * Selecciona todos los elementos que coincidan con el selector
     * @param {string} sel - Selector CSS
     * @return {NodeList} - Lista de elementos encontrados
     */
    queryAll: sel => document.querySelectorAll(sel),
    
    /**
     * Alterna la visibilidad de un elemento
     * @param {HTMLElement} element - Elemento a mostrar/ocultar
     * @return {boolean} - true si se mostró, false si se ocultó
     */
    toggleDisplay: element => {
        const isHidden = getComputedStyle(element).display === 'none';
        element.style.display = isHidden ? 'block' : 'none';
        return isHidden;
    },
    
    /**
     * Añade un evento a un elemento si existe
     * @param {string} id - ID del elemento
     * @param {string} event - Nombre del evento
     * @param {Function} callback - Función a ejecutar
     */
    addEvent: (id, event, callback) => {
        const element = document.getElementById(id);
        if (element) element.addEventListener(event, callback);
    }
};

/**
 * Inicializa el slider de imágenes en el banner principal
 * Crea un efecto de transición suave entre imágenes
 */
const initSlider = () => {
    const banner = DOM.query('.banner');
    if (!banner) return;

    // Crear el overlay para las transiciones
    const overlay = DOM.create('div');
    Object.assign(overlay.style, {
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        transition: 'opacity 1s ease',
        opacity: 1
    });
    
    // Preparar el banner para posicionamiento absoluto
    banner.style.position = 'relative';
    banner.insertBefore(overlay, banner.firstChild);

    let current = 0;
    
    /**
     * Establece el fondo del banner con la imagen actual
     * @param {number} idx - Índice de la imagen en el array
     */
    const setBannerBackground = idx => {
        overlay.style.background = `linear-gradient(rgba(20,20,20,0.7), rgba(20,20,20,0.7)), 
            url('${CONFIG.slider.images[idx]}') center/cover no-repeat`;
    };

    // Establecer la primera imagen
    setBannerBackground(current);
    
    // Iniciar el ciclo de transiciones
    setInterval(() => {
        // Primero reducir la opacidad
        overlay.style.opacity = 0;
        
        // Luego cambiar la imagen y restaurar opacidad
        setTimeout(() => {
            current = (current + 1) % CONFIG.slider.images.length;
            setBannerBackground(current);
            overlay.style.opacity = 1;
        }, CONFIG.slider.transitionTime);
    }, CONFIG.slider.interval);
};

/**
 * Inicializa el comportamiento de scroll en la página
 * Incluye navegación suave y efectos en el header
 */
const initScrollBehavior = () => {
    const header = DOM.query('header');
    
    // Cambiar clase del header al hacer scroll
    window.addEventListener('scroll', () => 
        header?.classList[window.scrollY > 50 ? 'add' : 'remove']('scrolled'));

    // Navegación suave para enlaces internos
    DOM.queryAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const targetId = anchor.getAttribute('href');
            const target = DOM.query(targetId);
            
            if (target) {
                e.preventDefault();
                
                // Anunciar a lectores de pantalla
                const anuncio = DOM.create('div');
                anuncio.setAttribute('aria-live', 'polite');
                anuncio.textContent = `Navegando a ${targetId.substring(1)}`;
                document.body.appendChild(anuncio);
                
                // Navegar suavemente
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Actualizar historial
                history.pushState(null, '', targetId);
                
                // Remover anuncio temporal
                setTimeout(() => anuncio.remove(), 1000);
            }
        });
    });
    
    // Enlazar botón "Ver tendencias" a la sección correspondiente
    DOM.addEvent('ver-tendencias', 'click', () => {
        const tendencias = DOM.query('#tendencias');
        if (tendencias) {
            tendencias.scrollIntoView({ behavior: 'smooth' });
        }
    });
};

/**
 * Inicializa el menú móvil con funcionalidades de accesibilidad
 * Gestiona el toggle del menú y su cierre al hacer clic fuera
 */
const initMobileMenu = () => {
    const menuToggle = DOM.query('.menu-toggle');
    const navList = DOM.query('.nav-list');
    
    if (!menuToggle || !navList) return;
    
    // Alternar visibilidad del menú
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        const newState = !isExpanded;
        
        menuToggle.setAttribute('aria-expanded', newState);
        navList.classList.toggle('active');
        
        // Mejorar accesibilidad anunciando estado
        menuToggle.setAttribute('aria-label', 
            newState ? 'Cerrar menú' : 'Abrir menú');
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', e => {
        if (navList.classList.contains('active') && 
            !navList.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menú');
            navList.classList.remove('active');
        }
    });
    
    // Cerrar menú con ESC
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && navList.classList.contains('active')) {
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menú');
            navList.classList.remove('active');
            menuToggle.focus();
        }
    });
};

/**
 * Renderiza un conjunto de películas en un contenedor
 * Implementa lazy loading para mejorar el rendimiento
 * 
 * @param {Array} peliculas - Array de objetos película
 * @param {string} containerId - ID del contenedor donde se mostrarán
 */
const renderPeliculas = (peliculas, containerId) => {
    const container = DOM.get(containerId);
    if (!container) return;
    
    // Usar fragmento para mejor rendimiento
    const fragment = document.createDocumentFragment();
    
    // Procesar cada película
    peliculas.forEach(({ titulo, genero, imagen }) => {
        const card = DOM.create('div');
        card.className = 'pelicula-card';
        
        // Agregar atributos para accesibilidad
        card.setAttribute('role', 'listitem');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `${titulo}, ${genero}`);
        
        // Estructura interna con lazy loading
        card.innerHTML = `
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" 
                 data-src="${imagen}" 
                 alt="Carátula de ${titulo}"
                 loading="lazy">
            <div class="info">
                <div class="titulo">${titulo}</div>
                <div class="genero">${genero}</div>
            </div>
        `;
        
        // Agregar atajos de teclado para accesibilidad
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const modal = DOM.get('contact-modal');
                if (modal) {
                    // Simular clic para abrir modal
                    card.click();
                }
            }
        });
        
        fragment.appendChild(card);
    });

    // Añadir todas las películas al contenedor
    container.appendChild(fragment);
    
    // Implementar lazy loading de imágenes
    const lazyImages = container.querySelectorAll('img[data-src]');
    
    /**
     * Carga la imagen cuando aparece en el viewport
     * @param {HTMLElement} target - Elemento imagen a cargar
     */
    const lazyLoad = target => {
        // Usar Intersection Observer para detectar visibilidad
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Cargar la imagen real
                    img.src = img.dataset.src;
                    
                    // Añadir clase para animación de carga
                    img.addEventListener('load', () => {
                        img.classList.add('loaded');
                        img.removeAttribute('data-src');
                    });
                    
                    // Desconectar el observer después de la carga
                    observer.disconnect();
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        io.observe(target);
    };
    
    // Aplicar lazy loading a todas las imágenes
    lazyImages.forEach(lazyLoad);
};

/**
 * Inicializa el formulario de contacto con validación
 * Aplica validación en tiempo real y al enviar
 */
const initContactForm = () => {
    const form = DOM.get('contact-form');
    if (!form) return;

    /**
     * Valida un campo del formulario
     * @param {HTMLElement} field - Campo a validar
     * @param {RegExp} pattern - Patrón de validación
     * @param {string} message - Mensaje de error
     * @return {boolean} - true si es válido, false si no
     */
    const validateField = (field, pattern, message) => {
        // Crear ID único para el mensaje de error
        const errorId = `${field.id}-error`;
        const errorElement = DOM.get(errorId);
        
        // Validar usando el patrón proporcionado
        const isValid = pattern.test(field.value.trim());
        
        if (!isValid) {
            // Mostrar mensaje de error si no existe
            if (!errorElement) {
                const error = DOM.create('span');
                error.id = errorId;
                error.className = 'error-message';
                error.textContent = message;
                error.setAttribute('aria-live', 'assertive');
                field.parentNode.appendChild(error);
            }
            
            // Marcar campo como inválido
            field.setAttribute('aria-invalid', 'true');
        } else {
            // Eliminar mensaje de error si existe
            if (errorElement) {
                errorElement.remove();
            }
            
            // Marcar campo como válido
            field.removeAttribute('aria-invalid');
        }
        
        return isValid;
    };

    // Validación al enviar
    form.addEventListener('submit', e => {
        e.preventDefault();
        
        // Limpiar mensajes de error previos
        form.querySelectorAll('.error-message').forEach(el => el.remove());
        
        // Configurar validaciones
        const validationFields = [
            { field: DOM.get('contact-nombre'), ...CONFIG.form.validations.nombre },
            { field: DOM.get('contact-email'), ...CONFIG.form.validations.email },
            { field: DOM.get('contact-numero'), ...CONFIG.form.validations.numero },
            { field: DOM.get('contact-mensaje'), ...CONFIG.form.validations.mensaje }
        ];

        // Validar todos los campos
        const isValid = validationFields.every(({ field, pattern, message }) => 
            field && validateField(field, pattern, message));

        if (isValid) {
            // Simular envío (aquí iría la integración real)
            console.log('Formulario válido, enviando...');
            
            // Mostrar mensaje de éxito
            const successMessage = DOM.create('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Gracias por tu mensaje. Te contactaremos pronto.';
            successMessage.setAttribute('aria-live', 'assertive');
            
            form.appendChild(successMessage);
            
            // Limpiar formulario
            form.reset();
            
            // Remover mensaje después de un tiempo
            setTimeout(() => {
                successMessage.remove();
                // Cerrar modal tras envío exitoso
                closeModal();
            }, 3000);
        } else {
            // Enfocar primer campo con error
            const firstInvalid = form.querySelector('[aria-invalid="true"]');
            if (firstInvalid) firstInvalid.focus();
        }
    });
    
    // Validación en tiempo real para mejor UX
    form.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('blur', () => {
            // Obtener configuración de validación para este campo
            const fieldName = field.id.replace('contact-', '');
            const validation = CONFIG.form.validations[fieldName];
            
            if (validation) {
                validateField(field, validation.pattern, validation.message);
            }
        });
    });
};

/**
 * Inicializa la funcionalidad del modal
 * Gestiona apertura, cierre y accesibilidad
 */
const initModal = () => {
    const modal = DOM.get('contact-modal');
    if (!modal) return;

    /**
     * Cierra el modal y restaura el estado
     */
    const closeModal = () => {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        
        // Restaurar scroll del body
        document.body.style.overflow = '';
        
        // Restaurar foco al último elemento
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    };

    /**
     * Abre el modal y almacena el estado anterior
     */
    const openModal = () => {
        // Guardar elemento con foco para restaurar después
        lastFocusedElement = document.activeElement;
        
        // Mostrar modal
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        
        // Evitar scroll en el fondo
        document.body.style.overflow = 'hidden';
        
        // Enfocar primer campo para accesibilidad
        const firstField = DOM.get('contact-nombre');
        if (firstField) {
            setTimeout(() => firstField.focus(), 100);
        }
    };
    
    // Referencia para restaurar el foco
    let lastFocusedElement = null;

    // Abrir modal al hacer clic en tarjetas de películas
    document.addEventListener('click', e => {
        if (e.target.closest('.pelicula-card')) {
            openModal();
        }
    });

    // Cerrar modal con botón
    DOM.addEvent('close-contact', 'click', closeModal);

    // Cerrar modal haciendo clic fuera del contenido
    modal.addEventListener('click', e => {
        if (e.target === modal) closeModal();
    });

    // Cerrar modal con Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
    
    // Hacer disponible la función de cierre globalmente
    window.closeModal = closeModal;
};

/**
 * Inicializa los ejemplos interactivos
 * Gestiona funcionalidades como mostrar/ocultar, saludos, etc.
 */
const initExamples = () => {
    // 1. Mostrar/Ocultar mensaje
    const btnMostrar = DOM.get('btnMostrar');
    const mensaje = DOM.get('mensaje');
    
    if (btnMostrar && mensaje) {
        btnMostrar.addEventListener('click', () => {
            const isVisible = DOM.toggleDisplay(mensaje);
            
            // Actualizar estado para accesibilidad
            btnMostrar.setAttribute('aria-expanded', isVisible);
            btnMostrar.textContent = isVisible ? 'Ocultar Mensaje' : 'Mostrar Mensaje';
        });
    }

    // 2. Saludo personalizado
    const input = DOM.get('nombre');
    const saludo = DOM.get('saludo');
    
    if (input && saludo) {
        // Actualizar en tiempo real
        input.addEventListener('input', () => {
            saludo.textContent = input.value ? `Hola, ${input.value}!` : '';
        });
        
        // Mostrar sugerencia
        input.addEventListener('focus', () => {
            if (!input.value) {
                saludo.textContent = 'Escribe tu nombre para un saludo personalizado';
            }
        });
    }

    // 3. Funciones para crear y eliminar películas
    /**
     * Crea una nueva película con datos proporcionados por el usuario
     */
    const crearPelicula = () => {
        // Solicitar datos con validación
        let titulo = prompt('Ingresa el título de la película:');
        if (!titulo) return;
        
        let genero = prompt('Ingresa el género de la película:');
        if (!genero) return;
        
        // Proporcionar imagen por defecto si no se ingresa
        let imagen = prompt('Ingresa la URL de la imagen (o deja vacío para imagen por defecto):');
        if (!imagen) {
            imagen = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=500&q=80';
        }

        // Crear tarjeta de película con accesibilidad
        const card = DOM.create('div');
        card.className = 'pelicula-card';
        card.setAttribute('role', 'listitem');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `${titulo}, ${genero}`);
        card.innerHTML = `
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" 
                 data-src="${imagen}" 
                 alt="Carátula de ${titulo}"
                 loading="lazy">
            <div class="info">
                <div class="titulo">${titulo}</div>
                <div class="genero">${genero}</div>
            </div>
        `;

        // Añadir película a la lista
        const container = DOM.get('peliculas-lista');
        if (container) {
            container.appendChild(card);
            
            // Anunciar para lectores de pantalla
            const anuncio = DOM.create('div');
            anuncio.setAttribute('aria-live', 'polite');
            anuncio.textContent = `Película ${titulo} añadida a tu lista`;
            document.body.appendChild(anuncio);
            setTimeout(() => anuncio.remove(), 2000);
            
            // Aplicar lazy loading
            const img = card.querySelector('img');
            if (img) {
                const io = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            img.addEventListener('load', () => img.classList.add('loaded'));
                            observer.disconnect();
                        }
                    });
                });
                io.observe(img);
            }
        }
    };

    /**
     * Elimina la última película de la lista
     */
    const eliminarPelicula = () => {
        const container = DOM.get('peliculas-lista');
        if (container && container.lastChild) {
            const pelicula = container.lastChild;
            const titulo = pelicula.querySelector('.titulo')?.textContent || 'Película';
            
            // Anunciar para lectores de pantalla
            const anuncio = DOM.create('div');
            anuncio.setAttribute('aria-live', 'polite');
            anuncio.textContent = `Película ${titulo} eliminada de tu lista`;
            document.body.appendChild(anuncio);
            
            // Eliminar película
            container.removeChild(pelicula);
            
            // Remover anuncio
            setTimeout(() => anuncio.remove(), 2000);
        } else {
            // Anunciar si no hay películas
            const anuncio = DOM.create('div');
            anuncio.setAttribute('aria-live', 'polite');
            anuncio.textContent = 'No hay películas para eliminar';
            document.body.appendChild(anuncio);
            setTimeout(() => anuncio.remove(), 2000);
        }
    };

    // Asignar eventos a los botones existentes
    DOM.addEvent('crearPelicula', 'click', crearPelicula);
    DOM.addEvent('eliminarPelicula', 'click', eliminarPelicula);
};

/**
 * Inicialización principal cuando el DOM está listo
 * Ejecuta todas las inicializaciones en el orden adecuado
 */
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar componentes visuales
    initSlider();
    initScrollBehavior();
    initMobileMenu();
    
    // Renderizar datos
    renderPeliculas(CONFIG.peliculas.tendencias, 'peliculas-tendencias');
    renderPeliculas(CONFIG.peliculas.miLista, 'peliculas-lista');
    
    // Inicializar interactividad
    initContactForm();
    initModal();
    initExamples();
    
    // Notificar carga completa (para depuración)
    console.log('StreamFlix inicializado correctamente');
});