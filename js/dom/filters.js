export function initFilters(getGames, renderCards) {
  const filterPlayers      = document.getElementById("filterPlayers");
  const filterMinAge       = document.getElementById("filterMinAge");
  const filterDurationMax  = document.getElementById("filterDurationMax");
  const filterCategory     = document.getElementById("filterCategory");
  const filterComplexityMax = document.getElementById("filterComplexityMax");
  const filterYearFrom     = document.getElementById("filterYearFrom");
  const filterYearTo       = document.getElementById("filterYearTo");
  const btnClearFilters    = document.getElementById("btnClearFilters");

  const allInputs = [filterPlayers, filterMinAge, filterDurationMax,
                     filterCategory, filterComplexityMax, filterYearFrom, filterYearTo];

  function applyFilters() {
    const players       = Number(filterPlayers.value) || null;
    const minAge        = Number(filterMinAge.value) || null;
    const durationMax   = Number(filterDurationMax.value) || null;
    const category      = filterCategory.value.trim().toLowerCase();
    const complexityMax = Number(filterComplexityMax.value) || null;
    const yearFrom      = Number(filterYearFrom.value) || null;
    const yearTo        = Number(filterYearTo.value) || null;

    const filtered = getGames().filter(game => {
      const matchPlayers  = !players || (game.minPlayers <= players && game.maxPlayers >= players);
      const matchAge      = !minAge || (game.minAge && game.minAge <= minAge);
      const matchDuration = !durationMax || (game.maxPlaytime && game.maxPlaytime <= durationMax);
      const matchCategory = !category || (game.categories ?? []).some(c => c.toLowerCase().includes(category));
      const matchWeight   = !complexityMax || (game.weight && parseFloat(game.weight) <= complexityMax);
      const year          = Number(game.year) || null;
      const matchYearFrom = !yearFrom || (year && year >= yearFrom);
      const matchYearTo   = !yearTo   || (year && year <= yearTo);

      return matchPlayers && matchAge && matchDuration
          && matchCategory && matchWeight && matchYearFrom && matchYearTo;
    });

    renderCards(filtered);
  }

  allInputs.forEach(input => input.addEventListener("input", applyFilters));

  btnClearFilters.addEventListener("click", () => {
    allInputs.forEach(input => input.value = "");
    applyFilters();
  });
}