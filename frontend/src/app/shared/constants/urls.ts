import e from "express";

const BASE_URL = 'http://localhost:3000';       // change to GAE later

export const SEARCH_URL = BASE_URL + `/api`;
export const AUTOCOMPLETE_URL = SEARCH_URL + `/autocomplete/`;
export const PROFILE_URL = SEARCH_URL + `/profile/`;
export const QUOTE_URL = SEARCH_URL + `/quote/`;
export const PEERS_URL = SEARCH_URL + `/peers/`;
export const NEWS_URL = SEARCH_URL + `/news/`;
export const RECOMMENDATION_URL = SEARCH_URL + `/recommendation/`;
export const INSIDER_URL = SEARCH_URL + `/insider/`;
export const EARNING_URL = SEARCH_URL + `/earnings/`;

export const CHART_URL = BASE_URL + `/api/chart`;
export const LASTWORKING_URL = CHART_URL + `/lastworking/`;
export const HISTORY_URL = CHART_URL + `/history/`;

export const WATCHLIST_URL = BASE_URL + `/api/watchlist`;
export const WATCHLIST_UPDATE_URL = WATCHLIST_URL + `/update`;

export const PORTFOLIO_URL = BASE_URL + `/api/portfolio`;
export const PORTFOLIO_UPDATE_URL = PORTFOLIO_URL + `/update`;