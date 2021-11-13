export const sendRequest = async (url, dataObj) => {
    try {
        const response = await fetch(url,
            {
                method: 'POST',
                body: JSON.stringify(dataObj),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        if (!response.ok) {
            let msg = response.json().then(d => {
                if (d.error && d.error.message) {
                    return d.error.message
                } else {
                    return 'Authentication Failed!'
                }
            });
            throw new Error(await msg);
        } else {
            return response.json();
        }
    } catch (e) {
        alert(e);
    }
}