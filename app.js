new Vue({
    el: '#app',
    data: {
        isHovered : false,
        isRadio : false, 
        loading: true,
        loading2 : false,
        imageSrc: '',
        error: null,
        entries: [],
        selectedFilters: [],
        id : 0,
        tags:[],
        filter: false,
        firstLoad : false, 
        page: 1,
        perPage: 9,
        noResult:false,
        allLoaded: false,
    },
    created() {
        this.loadEntries();
        this.loadTags();
    },
    methods: {
        async loadTags() {
            try {
                const response = await fetch(`https://wp.blackstarfest.org/wp-json/wp/v2/eventive-tag?per_page=99&_year=2024`);
                const data = await response.json();
                this.tags = data; 
            } catch (err) {
                this.error = 'Failed to load data';
            }
        },
        async loadEntries(id) {
            try {
                this.noResult = false;
                this.allLoaded = false;
                const filterIds = this.selectedFilters.join(',');
                var response =''; 
                if(this.filter){
                    this.id = id ;
                    if(this.firstLoad){
                        this.entries =[];
                        this.page = 1;
                    }
                    response = await fetch(`https://wp.blackstarfest.org/wp-json/wp/v2/festival-film?per_page=9&page=${this.page}&_year=2024&rich=1&not_hidden=1&eventive-tag=${filterIds}`, {
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                            'Accept': 'application/json',
                        }
                    });
                }
                else{
                    response = await fetch(`https://wp.blackstarfest.org/wp-json/wp/v2/festival-film?per_page=9&page=${this.page}&_year=2024&rich=1&not_hidden=1`, {
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                            'Accept': 'application/json',
                        }
                    });
                }
                const data = await response.json();
                this.entries = [...this.entries, ...data];
                if(this.entries.length == 0)
                    {
                        this.noResult = true;
                    }
                if (data.length < this.perPage) {
                    this.allLoaded = true;
                    this.firstLoad = false;
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
            this.firstLoad = false;
            this.loadEntries(this.id);
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
        getAccessibilityImageSrc(name) {
            switch(name)
            {
                case "Audio Description": return "./dist/svgs/logo1.png";
                case "Open Captions": return "./dist/svgs/logo2.png";
                case "Closed Captioning": return "./dist/svgs/logo3.png";
                default: return "./dist/svgs/logo1.png"; 
            }
        },
        displayTrailerButton(trailer) {
            if(!trailer)
                return false;
            else
                return true;
        },
        showTrailerModal(trailerHtml) {
            document.getElementById('trailerHtml').innerHTML=trailerHtml;
            document.getElementById('trailerModal').style.display='flex';
            const iframe = document.querySelector('#trailerHtml iframe');
            iframe.style.width = '100%';  // Set your desired width
            iframe.style.height = '450px';
        },
        closeTrailerModal() {
            document.getElementById('trailerHtml').innerHTML='';
            document.getElementById('trailerModal').style.display='none';
        },
        decodeHtmlEntities(str) {
            const txt = document.createElement('textarea');
            txt.innerHTML = str;
            return txt.value;
        },
        toggleFilter(id) {
            this.filter = this.selectedFilters.length > 0;
            this.firstLoad = true;
            this.loadEntries();
        }
    },
});



