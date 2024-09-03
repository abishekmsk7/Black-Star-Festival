    //    async filterByTags(id){
    //         try {
    //             const response = await  fetch(`https://wp.blackstarfest.org/wp-json/wp/v2/festival-film?per_page=9&page=1&_year=2024&rich=1&not_hidden=1&eventive-tag=${id}`);
    //             const data = await  response.json();
    //             console.log(data);
    //             this.entries = data;
    //         } catch (err) {
    //             this.error = 'Failed to load data' + err;
    //         } finally {
    //             this.loading = false;
    //             this.loading2 = false;
    //         }            
    //     },