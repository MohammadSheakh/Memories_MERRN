export const CREATE = "CREATE";
export const UPDATE = "UPDATE";
export const DELETE = "DELETE";
export const FETCH_BY_SEARCH = "FETCH_BY_SEARCH";
export const FETCH_POST = "FETCH_POST";
export const FETCH_ALL = "FETCH_ALL";
export const LIKE = "LIKE";
/**
 * Now we can move to the loading states .. redux eta ke centrally manage kore are we loading ! are we not ?
 * we are going to use redux to accomplish the loading states .. so amra age duita aro constants create korbo
 * means action types
 * we are gonna use this action types so that our redux reducers know when to start and stop loading
 *  eta amra Posts.js Component e use korbo
 */
export const END_LOADING = "END_LOADING";
export const START_LOADING = "START_LOADING";

export const AUTH = "AUTH";
export const LOGOUT = "LOGOUT";

export const COMMENT = "COMMENT";

// action ar reducer er moddhe ei file ta import korte hobe .. spelling mistake ar error komanor jonno ..
