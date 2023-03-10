export class ApiError extends Error {
    constructor(url: string, public status: number) {
        super(`'${url}' returned status ${status}`);
        if(Error.captureStackTrace){
            Error.captureStackTrace(this, ApiError);
        }
        this.name = 'ApiError';
        this.status = status;
    }
}

export const fetchJson = async (url: string, options?: RequestInit) => {
    const response = await fetch(url, options);
    if(!response.ok){
        throw new ApiError(url, response.status);
    }
    return await response.json();
}