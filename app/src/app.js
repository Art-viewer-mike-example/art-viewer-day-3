import { fetchAllArtByKeyword } from "./fetch-funcs";
import { handleSearchSubmit } from "./event-handlers";
import { mainSetup, renderPaintings } from "./render-funcs";

export default async function app(mainEl) {
  const { paintingsContainer, searchForm } = mainSetup(mainEl);

  const artworks = await fetchAllArtByKeyword()
  renderPaintings(paintingsContainer, artworks)

  searchForm.addEventListener('submit', handleSearchSubmit);
}
