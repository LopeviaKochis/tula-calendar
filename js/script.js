document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('cardContainer');
    const card = cardContainer.querySelector('.card');

    cardContainer.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});