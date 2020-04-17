export async function handleRawResponse(response) {
    return response;
}

export async function handleResponse(response) {
    return response.data;
    //throw new Error("Network response was not ok.");
}

// TODO log error with logging service.
export function handleError(error) {
    // eslint-disable-next-line no-console
    console.log("API call failed. " + error);
    throw error;
}
