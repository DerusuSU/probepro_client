import http from '../http';
import {API_BASE_URL} from "@/config.js";

export async function fetchServiceDetailPage(slug) {
    const { data } = await http.get(`${API_BASE_URL}/api/services/${slug}`);
    return data;
}