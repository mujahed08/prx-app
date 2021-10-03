import fetch_helper from "./fetch-helper";
import { API_ENDPOINT } from './constants'

export function fetchPatient(id) {
    return fetch_helper.get(`${API_ENDPOINT}/patients/${id}`)
}

export function getPatientList(page_number, limit) {
    return fetch_helper.get(`${API_ENDPOINT}/patients?page_number=${page_number}&limit=${limit}`)
}

export function createPatient(payload) {
    return fetch_helper.post(`${API_ENDPOINT}/patients`, payload)
}

export function editPatient(id, payload) {
    return fetch_helper.put(`${API_ENDPOINT}/patients/${id}`, payload)
}

export function _deletePatient(id) {
    return fetch_helper.delete(`${API_ENDPOINT}/patients/${id}`)
}