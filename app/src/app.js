import {
  fetchAllArtByKeyword,
} from "./fetch-funcs";
import {
  mainSetup,
  renderPaintings,
} from "./render-funcs";

export default async function app(mainEl) {
  const { paintingsContainer } = mainSetup(mainEl);

  const artworks = await fetchAllArtByKeyword()
  renderPaintings(paintingsContainer, artworks)
}