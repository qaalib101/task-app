export const fakeApiCall = <T>(data: T, delay = 500): Promise<T> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 90% chance of success
            if (Math.random() > 0.1) {
                resolve(data);
            } else {
                reject(new Error("Mock API error"));
            }
        }, delay);
    });
};