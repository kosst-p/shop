class FetchApi {
    constructor(props) {
        this.url = props.url;
    }

    async fetchData() {
        let response = await fetch(this.url, {
            method: "GET",
            mode: "no-cors"
        });

        try {
            if (response.ok) {
                console.log(response);
                let data = await response.json();
                return data;
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export default FetchApi;
