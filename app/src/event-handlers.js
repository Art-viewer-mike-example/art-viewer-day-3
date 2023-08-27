import { fetchAllArtByKeyword } from "./fetch-funcs";
import { renderPaintings } from "./render-funcs";

export const handleSearchSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formDataObj = Object.fromEntries(formData.entries());

  const artworks = await fetchAllArtByKeyword(formDataObj);
  renderPaintings(document.querySelector('#paintings-container'), artworks);

  e.target.reset();
};

export const handleOpenPaintingModalFromArtworks = (e) => {
  if (!e.target.matches('button')) return;
  const selectedPaintingModal = document.querySelector('#selected-painting-modal')
  const paintingInfo = document.querySelector('#painting-info');
  const { imageId, artworkId, title } = e.target.dataset;
  paintingInfo.innerHTML = `
    <h2>${title}</h2>
    <img src="https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg" alt=${title} />
  `;
  selectedPaintingModal.showModal();
}

export const handleModalBackdropClickToClose = (e) => {
  const selectedPaintingModal = document.querySelector('#selected-painting-modal');
  if (!e.target.id === selectedPaintingModal.id) return;

  const modalBox = e.target.getBoundingClientRect();
  const mousePosition = { x: e.clientX, y: e.clientY };

  const clickedOutsideOfModal = (
    modalBox.top >= mousePosition.y ||
    mousePosition.y >= modalBox.top + modalBox.height ||
    modalBox.left >= mousePosition.x ||
    mousePosition.x >= modalBox.left + modalBox.width
  );

  if (clickedOutsideOfModal) selectedPaintingModal.close();
}