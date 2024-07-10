function formatText(response: string) {
    return response.replace(/\. /g, '.\n');
}

export { formatText };
