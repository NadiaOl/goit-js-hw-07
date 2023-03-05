import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const pictureContainer = document.querySelector('.gallery');

// картинка маленькая 
const pictureMarkup = createColorCardsMarkup(galleryItems);

// заливаем разметку
pictureContainer.insertAdjacentHTML('beforeend', pictureMarkup);

// функция для разметки 
// div("gallery") => a("gallery__link") => img("gallery__image")

function createColorCardsMarkup(galleryItems) {
    return galleryItems
        .map(({ preview, original, description }) => {
            return `
            <div class="gallery__item">
                <a class="gallery__link" href="${original}">
                    <img class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                    />
                </a>
            </div>    
            `;
        })
        .join('');
}


// слушатель с делегированием
pictureContainer.addEventListener('click', handlerPictureContainerClick)


function handlerPictureContainerClick(event) {
    event.preventDefault();

    if (event.target.nodeName !== 'IMG') {
        return;
    }

    const originPicture = event.target.dataset.source;

    // модалка с большой картинкой
    const instance = basicLightbox.create(`
    <img src="${originPicture}" width="800" height="600">
`)
    instance.show();

    // Закртие по Esc
    window.addEventListener("keydown", handlerEscPrecc);

    function handlerEscPrecc(event) {
        if (event.key === "Escape") { instance.close() }
        window.removeEventListener("keydown", handlerEscPrecc);

    }
}