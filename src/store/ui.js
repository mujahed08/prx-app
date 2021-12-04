import router from "../router";
import { NAVIGATE_PUSH } from "./actions-type";

export const lmt = {limit : 20}
export const actions = {
    async [NAVIGATE_PUSH](context, path) {
      router.push(path)
    }
}

export default {
    actions,
    lmt
}