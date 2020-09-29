class FetchApi {
    constructor(props) {
        this.url = props.url;
    }

    async fetchData() {
        let response = await fetch(this.url);
        try {
            if (response.ok) {
                let data = await response.json();
                return data;
            }
        } catch (error) {
            console.log(error);
        }
    }
}
