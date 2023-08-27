export const mainSetup = (mainEl) => {
  mainEl.innerHTML = `
    <h1>ArtViewer App</h1>

    <form id="search-form" aria-labelledby="form-heading">
      <h2 id="form-heading">Search For Paintings By Keyword</h2>
      <label for="search-input">Keyword:</label>
      <input type="text" id="search-input" name="keyword" />
      <fieldset>
        <legend>Select the number of results you'd like</legend>
        <label for="option-25">
          <input type="radio" id="option-25" name="maxCount" value="25" aria-label="Return up to 25 artworks" checked>
          25
        </label>
        <label for="option-50">
          <input type="radio" id="option-50" name="maxCount" value="50" aria-label="Return up to 50 artworks">
          50
        </label>
        <label for="option-100">
          <input type="radio" id="option-100" name="maxCount" value="100" aria-label="Return up to 100 artworks">
          100
        </label>

      </fieldset>
      <button type="submit">Search!</button>
    </form>

    <dialog id="selected-painting-modal">
      <form id="close-modal" aria-label="Close modal" method="dialog"><button>X</button></form>
      <div id="painting-preload-info"></div>
      <div id="painting-info"></div>
    </dialog>

    <div id="paintings">
      <h2>Paintings</h2>
      <div id="paintings-container"></div>
    </div>
  `;

  const paintingsContainer = document.getElementById('paintings-container');
  const searchForm = document.getElementById('search-form');
  const selectedPaintingModal = document.getElementById('selected-painting-modal');

  return { searchForm, paintingsContainer, selectedPaintingModal };
}

export const renderPaintings = (parentEl, artworks, artworkSize = 400) => {
  const existingTitles = new Set();
  parentEl.innerHTML = '';

  artworks.forEach(({ id, title, image_id, artwork_type_title}) => {
    if (artwork_type_title !== 'Painting' || existingTitles.has(title.toLowerCase())) return;
    existingTitles.add(title.toLowerCase());

    const cardEl = document.createElement('div');
    cardEl.classList.add('painting-card');

    const h3 = document.createElement('h3');
    h3.textContent = title;

    const img = document.createElement('img');
    img.src = `https://www.artic.edu/iiif/2/${image_id}/full/${artworkSize},/0/default.jpg`;
    img.onerror = () => cardEl.remove();
    img.alt = title;

    const button = document.createElement('button');
    button.textContent = 'More Info';
    button.setAttribute('aria-label', `Open modal with info on "${title}"`)
    button.dataset.imageId = image_id;
    button.dataset.title = title;
    button.dataset.artworkId = id;

    cardEl.append(h3, img, button);
    parentEl.append(cardEl);
  });
};
