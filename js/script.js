document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. CONFIGURACIÓN INICIAL ---
    const frontFace = document.querySelector('.front');
    
    // Calcular el día del año (Número del 1 al 366)
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // --- 2. CARGAR IMAGEN (LoremFlickr) ---
    // Usamos el día del año como "lock" para que la imagen no cambie al refrescar
    const dailyImage = `https://loremflickr.com/500/800/nature,landscape,travel,beautiful?lock=${dayOfYear}`;
    
    frontFace.style.backgroundImage = `
        linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.8) 100%),
        url('${dailyImage}')
    `;

    // --- 3. CARGAR FRASE (Desde JSON local) ---
    // Esta función va a buscar el archivo, esperar a leerlo y luego pintar la frase
    async function loadQuote() {
        try {
            // Hacemos la petición a tu archivo local
            const response = await fetch('assets/frases.json');
            const quotes = await response.json();

            // Usamos matemáticas para elegir la frase según el día (ciclo infinito)
            const quoteIndex = dayOfYear % quotes.length;
            const todaysQuote = quotes[quoteIndex];

            // Creamos el HTML de la frase
            const quoteContainer = document.createElement('div');
            quoteContainer.className = 'daily-quote';
            quoteContainer.innerHTML = `
                <p class="quote-text">“${todaysQuote.text}”</p>
                <p class="quote-author">— ${todaysQuote.author}</p>
            `;
            
            // Lo insertamos en la tarjeta
            frontFace.insertBefore(quoteContainer, frontFace.firstChild);

        } catch (error) {
            console.error("Error cargando las frases:", error);
            
            // Si falla, mostramos el mensaje por defecto pero CON ESTILO
            const fallbackContainer = document.createElement('div');
            fallbackContainer.className = 'daily-quote'; // Usamos la misma clase CSS
            fallbackContainer.innerHTML = `
                <p class="quote-text">“Realzando tu belleza”</p>
                <p class="quote-author">— Estética Tula</p>
            `;
            // Limpiamos cualquier frase previa por si acaso y ponemos la nueva
            const existingQuote = frontFace.querySelector('.daily-quote');
            if (existingQuote) existingQuote.remove();
            
            frontFace.insertBefore(fallbackContainer, frontFace.firstChild);
        }
    }

    // Ejecutamos la función de carga
    loadQuote();


    // --- 4. GIRO DE TARJETA ---
    const cardContainer = document.getElementById('cardContainer');
    const card = cardContainer.querySelector('.card');

    cardContainer.addEventListener('click', (e) => {
        // Evitamos girar si tocan el botón de WhatsApp
        if (e.target.closest('a')) return;
        card.classList.toggle('flipped');
    });
});