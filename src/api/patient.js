import fetch_helper from "./fetch-helper";
import { API_ENDPOINT } from './constants'

export function getPatientList(page_number, limit) {
    return fetch_helper.get(`${API_ENDPOINT}/patients?page_number=${page_number}&limit=${limit}`)
}

export function createPatient(payload) {
    return fetch_helper.post(`${API_ENDPOINT}/patients`, payload)
}