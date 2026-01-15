Aquí tienes el contenido completo listo para copiar y pegar en tu archivo README.md. He estructurado todo para que resalte tu capacidad técnica y organizativa.

Markdown

# 🤖 AI Assistant Manager - Technical Challenge

Este proyecto es una plataforma de gestión de asistentes de IA desarrollada con **Next.js 15**, enfocada en la eficiencia operativa, la gestión de estado avanzada y una experiencia de usuario fluida. Permite crear, configurar y probar agentes virtuales en un entorno simulado de alto rendimiento.

---

## 🚀 Stack Tecnológico

* **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
* **Estado Global:** [Zustand](https://zustand-demo.pmnd.rs/) - Elegido por su ligereza y facilidad para manejar estados complejos como el historial de chat sin re-renderizados innecesarios.
* **Gestión de Datos (Server State):** [React Query (TanStack)](https://tanstack.com/query/latest) - Utilizado para gestionar la asincronía, estados de carga y simulación de API.
* **Formularios:** [React Hook Form](https://react-hook-form.com/) - Implementado para manejar validaciones complejas de forma eficiente.
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/) - Framework de utilidades para un diseño responsivo y moderno.
* **Iconografía:** [Lucide React](https://lucide.dev/)
* **Gestión de Temas:** [Next Themes](https://github.com/pacocoursey/next-themes) - Soporte nativo para Modo Claro y Oscuro.

---

## 🛠️ Decisiones Arquitectónicas

### 1. Gestión de Estado Híbrida
Se ha implementado una arquitectura de estado en dos capas:
* **Zustand:** Actúa como nuestra "Single Source of Truth" para el estado de la UI, el historial de mensajes del chat y la persistencia de datos local durante la sesión.
* **React Query:** Aunque no hay un backend real, se integró para simular el ciclo de vida de peticiones externas. Esto permite evaluar el manejo de estados `isLoading`, `isError` y el uso de mutaciones asíncronas, preparando la app para una integración real.

### 2. Sistema de Diseño Atómico
Se desarrolló un sistema de componentes de UI reutilizables en `src/components/ui`:
* **Botones Dinámicos:** Con soporte para variantes (primary, secondary, danger) y estados de carga integrados.
* **Inputs y Selects:** Estilizados consistentemente con manejo de errores de validación.
* **Feedback Visual:** Implementación de `Skeletons` para mejorar el LCP (Largest Contentful Paint) y la percepción de velocidad.

### 3. Lógica de Validación de Negocio
El flujo de creación de asistentes incluye una validación matemática estricta:
* **Validación del 100%:** En el segundo paso del modal, el sistema verifica que la suma de las longitudes de respuesta (Corta, Media, Larga) sea exactamente 100 antes de permitir el guardado.

---

## 📋 Funcionalidades Implementadas

* ✅ **Dashboard Principal:** Visualización de asistentes en tarjetas con acciones rápidas.
* ✅ **Modal de Pasos (Step-by-step):** Formulario dividido para mejorar la carga cognitiva del usuario.
* ✅ **Entrenamiento Dinámico:** Área para definir reglas de comportamiento (prompts) por asistente.
* ✅ **Chat en Tiempo Real Simulado:** Interfaz de chat con latencia artificial (1-2s) e indicador de "escribiendo" para emular la respuesta de una IA real.
* ✅ **Dark Mode:** Adaptación completa de colores para trabajo en entornos de baja luz.

---

## 📈 Futuras Mejoras (Roadmap de Escalabilidad)

Para llevar este proyecto a un nivel de producción masivo, se proponen las siguientes mejoras:

1.  **Persistencia con Middleware:** Implementar `persist` de Zustand para sincronizar el estado con `LocalStorage`.
2.  **Testing Suite:** Añadir tests unitarios con **Vitest** para la lógica de validación y tests E2E con **Playwright** para el flujo del modal.
3.  **Optimistic Updates:** Implementar actualizaciones optimistas en React Query para que las ediciones y eliminaciones se reflejen instantáneamente.
4.  **Internacionalización (i18n):** Soporte multi-idioma para la interfaz de usuario.
5.  **Seguridad:** Sanitización de prompts de usuario para evitar inyecciones de código.

---

## ⚙️ Instalación y Uso

1.  Clonar el repositorio.
2.  Instalar dependencias:
    ```bash
    npm install
    ```
3.  Ejecutar en entorno de desarrollo:
    ```bash
    npm run dev
    ```
4.  Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

---
Desarrollado como parte de una evaluación técnica para el rol de Frontend Developer.
