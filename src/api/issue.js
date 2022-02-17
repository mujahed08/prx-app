import fetch_helper from "./fetch-helper";
import { ISSUE_ENDPOINT } from './constants'

export function fetchIssue(id) {
    return fetch_helper.get(`${ISSUE_ENDPOINT}/issues/${id}`)
}

export function getIssueList(page_number, limit) {
    return fetch_helper.get(`${ISSUE_ENDPOINT}/issues?page_number=${page_number}&limit=${limit}`)
}

export function createIssue(payload) {
    return fetch_helper.post(`${ISSUE_ENDPOINT}/issues`, payload)
}

export function editIssue(id, payload) {
    return fetch_helper.put(`${ISSUE_ENDPOINT}/issues/${id}`, payload)
}

export function _deleteIssue(id) {
    return fetch_helper.delete(`${ISSUE_ENDPOINT}/issues/${id}`)
}