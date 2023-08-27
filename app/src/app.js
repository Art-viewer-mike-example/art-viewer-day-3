import {
  fetchAllArtByKeyword,
  fetchArtworkById
} from "./fetch-funcs";
import {
  mainSetup,
  renderPaintings,
} from "./render-funcs";

export default async function app(mainEl) {
  const { paintingsContainer } = mainSetup(mainEl);

  // TODO: remove this code when we fetch for real
  const artworks = await fetchAllArtByKeyword()
  console.log('Fetch #1, list')
  console.table(artworks)

  const artwork = await fetchArtworkById(artworks[0].id)
  console.log('Fetch #2, single')
  console.log(artwork)

  renderPaintings(paintingsContainer, artworks)
}