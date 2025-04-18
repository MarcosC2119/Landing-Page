# DOM.md - Documentación del uso del DOM en StreamFlix

## ¿Qué es el DOM?
El DOM (Document Object Model) es la representación en memoria de todos los elementos HTML de una página web. Permite a JavaScript acceder y manipular dinámicamente el contenido, estructura y estilos, creando experiencias interactivas.

Este documento explica cómo el proyecto StreamFlix utiliza el DOM para crear una experiencia de usuario dinámica y accesible.

---

## Utilidades DOM implementadas

StreamFlix utiliza un objeto `DOM` con métodos reutilizables que facilitan la manipulación de elementos:

```javascript
const DOM = {
    get: id => document.getElementById(id),            // Obtener elemento por ID
    create: tag => document.createElement(tag),        // Crear elemento nuevo
    query: sel => document.querySelector(sel),         // Consulta por selector CSS
    queryAll: sel => document.querySelectorAll(sel),   // Consulta múltiple
    toggleDisplay: element => { /* ... */ },           // Alternar visibilidad
    addEvent: (id, event, callback) => { /* ... */ }   // Agregar evento simplificado
};
```

Esta abstracción simplifica el código y evita repeticiones.

---

## Funcionalidades DOM principales

### 1. Slider de Imágenes Dinámico
La sección de banner utiliza manipulación DOM para crear un slider automático que cambia las imágenes de fondo con transiciones suaves.

```javascript
const initSlider = () => {
    // Crear overlay y aplicar transiciones
    const overlay = DOM.create('div');
    // Actualizar fondo periódicamente
    setInterval(() => {
        // Efecto de transición
        overlay.style.opacity = 0;
        setTimeout(() => {
            // Actualizar imagen y restaurar opacidad
            current = (current + 1) % CONFIG.slider.images.length;
            setBannerBackground(current);
            overlay.style.opacity = 1;
        }, CONFIG.slider.transitionTime);
    }, CONFIG.slider.interval);
};
```

### 2. Renderizado de Películas con Lazy Loading
Las tarjetas de películas se generan dinámicamente e implementan carga diferida (lazy loading) para optimizar rendimiento:

```javascript
const renderPeliculas = (peliculas, containerId) => {
    // Generar tarjetas dinámicamente
    peliculas.forEach(({ titulo, genero, imagen }) => {
        const card = DOM.create('div');
        card.className = 'pelicula-card';
        card.setAttribute('role', 'listitem');
        card.setAttribute('tabindex', '0');
        // Contenido HTML...
    });
    
    // Implementar lazy loading con Intersection Observer
    const lazyImages = container.querySelectorAll('img[data-src]');
    lazyImages.forEach(target => {
        const io = new IntersectionObserver((entries, observer) => {
            // Cargar imagen cuando es visible
        });
        io.observe(target);
    });
};
```

### 3. Modal Accesible
El modal de contacto implementa buenas prácticas de accesibilidad:

```javascript
const initModal = () => {
    // Funciones de apertura y cierre
    const openModal = () => {
        // Guardar elemento con foco para restaurar después
        lastFocusedElement = document.activeElement;
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        // Evitar scroll en el fondo
        document.body.style.overflow = 'hidden';
        // Enfocar primer campo para accesibilidad
        DOM.get('contact-nombre').focus();
    };
    
    // Eventos para abrir/cerrar (clic, teclado)
    // Soporte para navegación por teclado con Escape
};
```

### 4. Validación de Formulario
El formulario de contacto usa DOM para validación en tiempo real:

```javascript
const initContactForm = () => {
    // Validación por campo con feedback visual y asistivo
    const validateField = (field, pattern, message) => {
        // Verificar patrón y mostrar/ocultar errores
        // Establecer atributos ARIA
    };
    
    // Validación completa al enviar
    form.addEventListener('submit', e => {
        // Limpiar mensajes previos
        // Validar todos los campos
        // Mostrar mensaje de éxito o errores
    });
};
```

### 5. Ejemplos Interactivos
La sección de ejemplos demuestra otras manipulaciones del DOM:

- **Mostrar/Ocultar Mensaje**: Alterna la visibilidad con estados ARIA
- **Saludo Personalizado**: Actualiza contenido en tiempo real según el input
- **Gestión de Lista**: Crear/eliminar dinámicamente elementos del DOM

```javascript
// Ejemplo: saludo en tiempo real
input.addEventListener('input', () => {
    saludo.textContent = input.value ? `Hola, ${input.value}!` : '';
});

// Ejemplo: crear película
const crearPelicula = () => {
    // Solicitar datos
    // Crear elemento
    // Aplicar lazy loading
    // Anunciar para lectores de pantalla
};
```

### 6. Navegación Responsive
Implementa un menú móvil accesible que se adapta a distintos tamaños de pantalla:

```javascript
const initMobileMenu = () => {
    // Toggle del menú
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        const newState = !isExpanded;
        // Actualizar estado y atributos ARIA
    });
    
    // Cierre con ESC y al hacer clic fuera
};
```

---

## Accesibilidad en manipulación DOM

El proyecto implementa estas prácticas de accesibilidad en su manejo del DOM:

1. **Atributos ARIA**: Se usan para mejorar accesibilidad (aria-expanded, aria-hidden, aria-live)
2. **Anuncios asistivos**: Cambios importantes se anuncian a lectores de pantalla
3. **Foco gestionado**: Se mantiene adecuadamente en modales y navegación
4. **Navegación por teclado**: Soporte completo para usuarios que no usan ratón
5. **Estados dinámicos**: Los cambios en la interfaz actualizan correctamente sus estados ARIA

---

## Mapa del DOM (estructura principal)

```
html
├── head: Metadatos, estilos, preloads...
└── body
    ├── #contact-modal: Modal accesible
    │   └── .modal-content: Formulario de contacto
    ├── header.header: Cabecera fija
    │   ├── .logo: Identidad de marca
    │   └── nav.nav: Navegación principal
    │       ├── .menu-toggle: Botón menú móvil
    │       └── .nav-list: Enlaces principales
    ├── main#main-content: Contenido principal
    │   ├── section.banner#inicio: Banner dinámico
    │   ├── section.carrusel#tendencias: Películas en tendencia
    │   │   └── #peliculas-tendencias: Contenedor dinámico
    │   ├── section.carrusel#mi-lista: Películas guardadas
    │   │   └── #peliculas-lista: Contenedor dinámico
    │   └── div.cosas: Sección interactiva
    │       └── .interactive-grid: Tarjetas interactivas
    │           ├── #ejemplo1: Mostrar/ocultar mensaje
    │           ├── #ejemplo2: Saludo personalizado
    │           └── #ejemplo3: Gestión de películas
    └── footer: Pie de página
```

---

## Eventos DOM utilizados

| Evento | Uso en StreamFlix |
|--------|-------------------|
| `DOMContentLoaded` | Inicialización de todos los componentes |
| `click` | Interacciones de botones, tarjetas, navegación |
| `scroll` | Efectos en header, navegación |
| `input` | Actualización tiempo real de campos, saludo |
| `submit` | Validación de formulario |
| `keydown` | Accesibilidad (Escape para cerrar, navegación) |
| `focus/blur` | Validación y mejoras de accesibilidad |
| `load` | Completado de carga de imágenes |
| `resize` | Ajustes responsive (implícito en CSS) |

---

## Optimizaciones de rendimiento

1. **Lazy loading**: Carga diferida de imágenes usando Intersection Observer
2. **Delegación de eventos**: Uso de eventos en contenedores para mayor eficiencia
3. **DocumentFragment**: Usado al renderizar colecciones de elementos
4. **Debouncing**: Aplicado en eventos frecuentes como scroll y resize
5. **Reutilización de funciones**: A través del objeto DOM y funciones auxiliares
