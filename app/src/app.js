import { fetchAllArtByKeyword } from "./fetch-funcs";
import { handleSearchSubmit } from "./event-handlers";
import { mainSetup, renderPaintings } from "./render-funcs";

export default async function app(mainEl) {
  const { paintingsContainer, searchForm, selectedPaintingModal } = mainSetup(mainEl);

  const artworks = await fetchAllArtByKeyword()
  renderPaintings(paintingsContainer, artworks)

  searchForm.addEventListener('submit', handleSearchSubmit);

  paintingsContainer.addEventListener('click', async (e) => {
    if (!e.target.matches('button')) return;
    selectedPaintingModal.showModal();
  });

  selectedPaintingModal.addEventListener('click', (e) => {
    if (e.target.id === selectedPaintingModal.id) {
      const modalBox = e.target.getBoundingClientRect();
      const mousePosition = { x: e.clientX, y: e.clientY };

      const clickedInDialog = (
        modalBox.top <= mousePosition.y &&
        mousePosition.y <= modalBox.top + modalBox.height &&
        modalBox.left <= mousePosition.x &&
        mousePosition.x <= modalBox.left + modalBox.width
      );

      if (!clickedInDialog) selectedPaintingModal.close();
    };
  });
}
