new Vue({
    el: '#app',
    data: {
        results: [], // This will hold the API data
        isHovered : false,
        isRadio : false, 
        loading: true,
        imageSrc: '',
        error: null,
        pagenumber: 0,
    },
    created() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                number = this.pagenumber + 1  ;
                this.pagenumber = number ;
                console.log(number);
                const response = await fetch('https://wp.blackstarfest.org/wp-json/wp/v2/festival-film?per_page=9&page='+number+'&_year=2024&rich=1&not_hidden=1'); // Replace with your API URL
                
                const data = await response.json();
                this.results = data; // Assume the API returns an array of objects
            } catch (err) {
                this.error = 'Failed to load data';
            } finally {
                this.loading = false;
            }
        },
        getImageSrc(imageTag) {
            try {
                // Regular expression to match the src attribute
                const test = imageTag.replace("\\","");
                // document.getElementById('imageDiv').innerHTML = imageTag.replace("\\","");
                const srcMatch = test.match(/src="([^"]+)"/);
                // console.log(srcMatch);
                if (srcMatch) {
                  this.imageSrc = srcMatch[1];
                }
                return srcMatch[1];
            } catch (err) {
                this.error = 'Failed to load Image' + err;
            } 
        },
    },
});
