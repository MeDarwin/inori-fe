import { recordApi } from "../reducer/services/visitApi";
import { store } from "../store";

export function recordVisit(view_url,view_type) {
    store.dispatch(recordApi.endpoints.visit.initiate({ view_type, view_url }));
}