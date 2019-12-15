let accessToken = "";

export const setAccessToken = (ATString: string) => {
    accessToken = ATString;
};

export const getAccessToken = () => {
    return accessToken;
};


