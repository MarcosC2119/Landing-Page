# StreamFlix - Landing Page

Una landing page moderna, accesible y responsiva para un servicio de streaming ficticio. Desarrollada con HTML, CSS y JavaScript.

![Licencia MIT](https://img.shields.io/badge/Licencia-MIT-green.svg)
![Versión](https://img.shields.io/badge/Versión-1.2.0-blue.svg)

## 🚀 Características

- **Diseño Responsivo**: Se adapta perfectamente a dispositivos móviles, tablets y escritorio
- **Accesibilidad (WCAG)**: Implementación de ARIA, navegación por teclado y alto contraste
- **Rendimiento Optimizado**: Lazy loading, CSS/JS optimizados y prácticas modernas
- **Interactividad Rica**: Slider dinámico, carruseles, modales, y formularios interactivos
- **Buenas Prácticas**: Código modular, semántico y bien documentado

## 📋 Estructura del Proyecto

```
streamflix-landing/
├── index.html           # Estructura HTML principal con semántica y accesibilidad
├── assets/
│   ├── css/
│   │   └── styles.css   # Estilos modulares con variables CSS
│   ├── js/
│   │   └── main.js      # JavaScript modular con patrones modernos
├── LICENSE              # Licencia MIT
├── README.md            # Esta documentación
└── DOM.md               # Documentación detallada del uso del DOM
```

## 🔧 Implementaciones técnicas destacadas

### HTML
- Estructura semántica con etiquetas HTML5 (`header`, `nav`, `main`, `section`, `footer`)
- Atributos ARIA para mejorar accesibilidad
- Metadatos y preloading para mejor rendimiento
- Formularios con validación y feedback adecuado

### CSS
- Variables CSS para consistencia visual
- Diseño responsivo con media queries
- Animaciones y transiciones optimizadas
- Preferencias de usuario (modo reducido de movimiento, contraste, etc.)
- Layouts modernos con Flexbox y Grid

### JavaScript
- Patrón modular para organización de código
- Manipulación eficiente del DOM con utilidades reutilizables
- Lazy loading con Intersection Observer
- Validación de formularios en tiempo real
- Manipulación dinámica de contenido

## 💡 Funcionalidades principales

1. **Slider de Banner**: Transiciones suaves automáticas entre imágenes
2. **Carruseles de Películas**: Visualización horizontal con lazy loading
3. **Modal de Contacto**: Formulario con validación y accesibilidad
4. **Menú Responsive**: Adaptado a dispositivos móviles con animaciones
5. **Ejemplos Interactivos**: Demostración de manipulación DOM
   - Mostrar/ocultar elementos
   - Actualización en tiempo real
   - CRUD básico (crear/eliminar películas)

## 🔍 Accesibilidad

- **Teclado**: Navegación completa sin ratón
- **Lectores de pantalla**: Textos alternativos, landmarks y ARIA
- **Contraste**: Cumple WCAG AA en texto e interfaces
- **Reducción de movimiento**: Respeta preferencias del usuario
- **Foco visual**: Indicadores claros de foco para navegación

## 📱 Responsive Design

El sitio se adapta a:
- **Móviles**: ≤ 480px
- **Tablets**: ≤ 768px
- **Desktops**: ≤ 1200px
- **Pantallas grandes**: > 1200px

## 📘 Documentación adicional

Para entender mejor cómo se usa el DOM en este proyecto, consulta [DOM.md](DOM.md).

## 🚀 Cómo usar

1. Clona el repositorio:
```bash
git clone https://github.com/usuario/streamflix-landing.git
```

2. Abre `index.html` en tu navegador o utiliza un servidor local:
```bash
# Con Python
python -m http.server
# Con Node.js
npx serve
```

3. Explora las diferentes secciones y experimenta con las funcionalidades.

## 👥 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Primero discute los cambios que deseas hacer en Issues
2. Haz fork del proyecto
3. Crea una rama para tus cambios (`git checkout -b feature/amazing-feature`)
4. Haz commit de tus cambios (`git commit -m 'Add amazing feature'`)
5. Haz push a la rama (`git push origin feature/amazing-feature`)
6. Abre un Pull Request

## 📜 Licencia

Este proyecto está bajo la [Licencia MIT](LICENSE).

## 📞 Contacto

¿Preguntas o sugerencias? Abre un issue en este repositorio. 