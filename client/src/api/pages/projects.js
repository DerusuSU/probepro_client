import http from '../http';
import {API_BASE_URL} from "@/config.js";

export async function fetchProjectsPage() {
    const { data } = await http.get(`${API_BASE_URL}/api/projects`);
    return data;
}