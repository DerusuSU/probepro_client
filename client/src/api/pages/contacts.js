import http from '../http'
import {API_BASE_URL} from "@/config.js";

export async function fetchContactsPage() {
    const { data } = await http.get(`${API_BASE_URL}/api/contacts`)
    return data
}