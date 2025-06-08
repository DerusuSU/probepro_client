import http from '../http';
import {API_BASE_URL} from "@/config.js";

export async function fetchProjectDetailPage(slug) {
    const { data } = await http.get(`${API_BASE_URL}/api/projects/${slug}`);
    return data;
}