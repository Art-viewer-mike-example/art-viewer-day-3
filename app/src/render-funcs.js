export const mainSetup = (mainEl) => {
  mainEl.innerHTML = `
    <h1>ArtViewer App</h1>
    <div id="paintings">
      <h2>Paintings</h2>
      <div id="paintings-container"></div>
    </div>
  `;

  const paintingsContainer = document.getElementById('paintings-container');

  return { paintingsContainer };
}

export const renderPaintings = (parentEl, artworks, artworkSize = 400) => {
  const existingTitles = new Set();

  artworks.forEach(({ title, image_id, artwork_type_title}) => {
    if (artwork_type_title !== 'Painting' || existingTitles.has(title.toLowerCase())) return;
    existingTitles.add(title.toLowerCase());

    const cardEl = document.createElement('div');
    cardEl.classList.add('painting-card');

    const h3 = document.createElement('h3');
    h3.textContent = title;

    const img = document.createElement('img');
    img.src = `https://www.artic.edu/iiif/2/${image_id}/full/${artworkSize},/0/default.jpg`;
    img.addEventListener('error', () => cardEl.remove());

    cardEl.append(h3, img);
    parentEl.append(cardEl);
  });
};
