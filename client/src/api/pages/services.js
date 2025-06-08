import http from '../http'
import {API_BASE_URL} from "@/config.js";

export async function fetchServicesPage() {
    const { data } = await http.get(`${API_BASE_URL}/api/services`)
    return data
}