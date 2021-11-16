export const BASE_URL = "https://api.twelvedata.com";

export const symbolSearchAPI = (symbol) =>
  `${BASE_URL}/symbol_search?symbol=${symbol}`;
