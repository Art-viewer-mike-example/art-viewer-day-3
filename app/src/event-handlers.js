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