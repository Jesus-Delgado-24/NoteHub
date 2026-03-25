import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = ({ cookies }) => {
    // Borra la cookie de sesión
    cookies.delete('session_id', { path: '/' });
    
    return json({ success: true });
};