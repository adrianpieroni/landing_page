// Captura de los elementos clave de la interfaz del modal
const previewModal = document.getElementById('preview-modal');
const previewIframe = document.getElementById('preview-iframe');
const iframeWrapper = document.getElementById('iframe-wrapper');

/**
 * Abre el visor interactivo cargando la maqueta correspondiente
 * @param {string} url - Ruta relativa o absoluta del archivo HTML a ejecutar
 */
function openModal(url) {
    if (!previewModal || !previewIframe) return;
    
    previewIframe.src = url;
    previewModal.style.display = 'flex';
    changeView('desktop'); // Inicializa siempre en tamaño completo (PC)
}

/**
 * Cierra el visor y limpia el iframe para liberar memoria del navegador
 */
function closeModal() {
    if (!previewModal || !previewIframe) return;
    
    previewModal.style.display = 'none';
    previewIframe.src = ''; // Corta la ejecución del código interno de la maqueta
}

/**
 * Alterna dinámicamente las dimensiones del contenedor de la maqueta
 * @param {string} device - Tipo de dispositivo deseado ('desktop', 'tablet', 'mobile')
 */
function changeView(device) {
    if (!iframeWrapper) return;

    // Removemos estados anteriores
    iframeWrapper.classList.remove('desktop-view', 'tablet-view', 'mobile-view');
    
    // Aplicamos las dimensiones seleccionadas
    iframeWrapper.classList.add(`${device}-view`);
    
    // Alternamos el estado activo en la botonera superior
    document.querySelectorAll('.btn-view').forEach(btn => btn.classList.remove('active'));
    
    // Mapeo dinámico para activar el botón correspondiente
    const activeBtn = Array.from(document.querySelectorAll('.btn-view'))
                           .find(btn => btn.textContent.toLowerCase().includes(device));
    if (activeBtn) activeBtn.classList.add('active');
}

// Escuchador de eventos global para cerrar el visor si hacen clic fuera de la pantalla del demo
window.addEventListener('click', (event) => {
    if (event.target === previewModal) {
        closeModal();
    }
});

/**
 * Cambia el tamaño del simulador de la tarjeta actual
 * @param {HTMLElement} button - Botón presionado
 * @param {string} mode - Modo de pantalla ('desktop', 'tablet', 'mobile')
 */
function changeCardView(button, mode) {
    // Buscamos la tarjeta contenedora de este botón específico
    const card = button.closest('.live-card');
    const wrapper = card.querySelector('.live-iframe-wrapper');
    
    if (!wrapper) return;

    // Removemos las clases de tamaño anteriores de esta tarjeta
    wrapper.classList.remove('desktop-mode', 'tablet-mode', 'mobile-mode');
    
    // Aplicamos el nuevo modo
    wrapper.classList.add(`${mode}-mode`);
    
    // Cambiamos el estado activo únicamente en la botonera de esta tarjeta
    card.querySelectorAll('.btn-device').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}