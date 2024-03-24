import e from "express";

const BASE_URL = 'http://localhost:3000';       // change to GAE later

export const SEARCH_URL = BASE_URL + `/api/search/`;
export const AUTOCOMPLETE_URL = SEARCH_URL + `/autocomplete/`;
export const PROFILE_URL = SEARCH_URL + `/profile/`;
export const QUOTE_URL = SEARCH_URL + `/quote/`;
export const PEERS_URL = SEARCH_URL + `/peers/`;
export const NEWS_URL = SEARCH_URL + `/news/`;
export const CHART_URL = SEARCH_URL + `/chart/`;

export const WATCHLIST_URL = BASE_URL + `/api/watchlist`;
export const PORTFOLIO_URL = BASE_URL + `/api/portfolio`;