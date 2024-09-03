new Vue({
    el: '#app',
    data: {
        isHovered : false,
        isRadio : false, 
        loading: true,
        loading2 : false,
        imageSrc: '',
        error: null,
        pagenumber: 0,
        entries: [],
        perPage: 9,
        page: 1,
        allLoaded: false
    },
    created() {
        this.loadEntries();
    },
    methods: {
        async loadEntries() {
            try {
                const response = await fetch(`https://wp.blackstarfest.org/wp-json/wp/v2/festival-film?per_page=${this.perPage}&page=${this.page}&_year=2024&rich=1&not_hidden=1`);
                const data = await response.json();
                this.entries = [...this.entries, ...data];
                if (data.length < this.perPage) {
                    this.allLoaded = true;
                }
            } catch (err) {
                this.error = 'Failed to load data';
            } finally {
                this.loading = false;
                this.loading2 = false;
            }
        },
        loadMore() {
            this.loading2 = true ;
            this.page++;
            this.loadEntries();
        },
        getImageSrc(imageTag) {
            try {
                const test = imageTag.replace("\\","");
                const srcMatch = test.match(/src="([^"]+)"/);
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
