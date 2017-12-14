//impliment the singleton pattern to ensure there is only one instance of the application running
window.addEventListener('load', function(){

    //this checks to see if there is an instance of the application if not it creates it
    let myApp = App.getInstance();
});

//create the singleton to do the check to make sure only one version of the application is running
class App {
    constructor(){
        let controller = new Controller();
        console.log('singleton created');
    }

    //static method to do the checking
    static getInstance(){

        if(!App._instance){
            App._instance = new App();

            return App._instance;
        }else{
            throw 'You can only create one instance of the application silly!!'
        }
    }
}

//create the controller class that tells the model and the view what to do
class Controller{
    constructor(){
        console.log('controller created');

        this.data = localStorage;
        //create an instance of the model object
        this.model = new Model();

        //create an instance of the view object
        this.view = new View();

        //this makes sure that the element is on the page before running the code.
        if(document.getElementById('input')){
            this.imageSearch();
        }
    }

    //this is the method to be called when the search button is clicked on the search page
    imageSearch(){

        //this sets a click event listening for the search button to be clicked and submits it to the API
        document.getElementById('srchBtn').addEventListener('click', (event)=>{
            event.preventDefault();
            console.log('searching begin');

            const searchInput = document.getElementById('input');

            const query = searchInput.value;

            console.log('User input = '+query);

            //these variables hold the keys to the API requests
            const pixaKey = '3943067-14f4901143756731e5b657329';
            const unsplashKey = '2685ef356706bf8a536aa7c97e824fb0fe5d52a679999a7faa776ddd36313ced';
            const flickrKey = 'e92cf700123a12455ef1236d586cbb68';

            //this is the method to do pixaBay image search
            this.model.pixaSearch(query, pixaKey);

            //this is to do the unsplash Search
            this.model.unsplashSearch(query, unsplashKey);

            //this is to do the flickr search
            this.model.flickrSearch(query, flickrKey);

            searchInput.value = '';

        });
    }
}

//create the model class that is used to gather data and process it
class Model{
    constructor(){
        console.log('model created');

    }

    pixaSearch(q, k){

        //clear localStorage
        //window.localStorage.clear();

        //this variable holds the XMLHttpRequest
        let request = new XMLHttpRequest();

        //this variable stores the API link
        let pixaAPI = 'https://pixabay.com/api/?key='+ k +'&q='+ q +'&image_type=photo&per_page=12';

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {

                //this variable captures the API response and stores it
                let data = JSON.parse(request.responseText);

                //this saves it to localStorage so it can be used later to print to the DOM
                localStorage.setItem('pixa', JSON.stringify(data.hits));

                console.log(JSON.parse(localStorage.pixa));

                //this creates a new event
                let pixaEvent = new Event('pixaLoaded');
                //this stores the information inside of the event
                pixaEvent.info = JSON.parse(localStorage.pixa);

                //this fires the event off for the listener to pick up
                document.dispatchEvent(pixaEvent);

            }else{
                console.log('response error');
            }

            request.onerror = function(){
                console.log('connection error');
            }
        };

        request.open('GET', pixaAPI, true);
        request.send();
    }

    unsplashSearch(q,k){

        let request = new XMLHttpRequest();

        let unsplashAPI = 'https://api.unsplash.com/search/photos?client_id='+ k +'&query='+ q +'&per_page=12';

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                //this variable captures the API response and stores it
                let data = JSON.parse(request.responseText);

                //this saves it to localStorage so it can be used later to print to the DOM
                localStorage.setItem('unsplash', JSON.stringify(data.results));

                console.log(JSON.parse(localStorage.unsplash));

                //this creates a new event
                let unsplashEvent = new Event('unsplashLoaded');
                //this stores the information inside of the event
                unsplashEvent.info = JSON.parse(localStorage.unsplash);

                //this fires the event off for the listener to pick up
                document.dispatchEvent(unsplashEvent);
            }else{
                console.log('response error');
            }

            request.onerror = function(){
                console.log('connection error');
            }
        };

        request.open('GET', unsplashAPI, true);
        request.send();
    }

    flickrSearch(q,k){

        let request = new XMLHttpRequest();

        let flickrAPI = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+ k +'&tags='+ q +'&per_page=12&format=json&nojsoncallback=1';

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                //this variable captures the API response and stores it
                let data = JSON.parse(request.responseText);

                //this saves it to localStorage so it can be used later to print to the DOM
                localStorage.setItem('flickr', JSON.stringify(data.photos.photo));

                console.log(JSON.parse(localStorage.flickr));

                //this creates a new event
                let flickrEvent = new Event('flickrLoaded');
                //this stores the information inside of the event
                flickrEvent.info = JSON.parse(localStorage.flickr);

                //this fires the event off for the listener to pick up
                document.dispatchEvent(flickrEvent);
            }else{
                console.log('response error');
            }

            request.onerror = function(){
                console.log('connection error');
            }
        };

        request.open('GET', flickrAPI, true);
        request.send();
    }
}



//create the view class that is responsible for showing the data on the screen
class View{
    constructor(){
        console.log('view created');

        //this listens for the custom event that is dispatched after the Pixabay search
        document.addEventListener('pixaLoaded', this.displayPixaInfo.bind(this));
        document.addEventListener('unsplashLoaded', this.displayUnsplashInfo.bind(this));
        document.addEventListener('flickrLoaded', this.displayFlickrInfo.bind(this));
    }

    displayPixaInfo(e){
        this.displayPixa(e.info);
    }

    displayUnsplashInfo(e){
        this.displayUnsplash(e.info);
    }

    displayFlickrInfo(e){
        this.displayFlickr(e.info);
    }

    displayPixa(arr){
        //console.log(arr);

        let pixaArr = arr;

        let image = document.querySelector('#pixaResults');

        //empty variable to add to the DOM with
        let display = '';

        //clears the innerHTML of the element each time a search is conducted
        image.innerHTML='';

        //make sure the element is there before running any code
        if(document.getElementById('pixaResults')){

            //checks to see if anything is stored in the array
            if(pixaArr.length > 0){

                //loops through the array and prints information accordingly
                for(let i=0;i<pixaArr.length;i++){
                    display += '<article id="pixaImage" class="searchImage">';
                    display += '<a href="'+ pixaArr[i].pageURL +'" target="_blank">';
                    display += '<img class="imgResult" src="'+ pixaArr[i].webformatURL +'" alt="Pixabay Image">';
                    display += '<div class="picInfo">';
                    display += '<h3><i class="fa fa-user" aria-hidden="true"></i> '+ pixaArr[i].user +'</h3>';
                    display += '<h3><i class="fa fa-heart" aria-hidden="true"></i> '+ pixaArr[i].likes +'</h3>';
                    display += '<h3>TAGS/DESCRIPTION: '+ pixaArr[i].tags +'</h3>';
                    display += '</div>';
                    display += '</a>';
                    display += '</article>';
                }
            }else{
                display += '<p>Opps looks like something went wrong!!</p>';
            }

            image.insertAdjacentHTML('afterbegin', display);
        }
    }

    displayUnsplash(arr){
        let unsplashArr = arr;

        let image = document.querySelector('#unsplashResults');

        let display = '';

        image.innerHTML = '';

        //makes sure the element is there before running any code
        if(document.getElementById('unsplashResults')){

            if(unsplashArr.length > 0){

                for(let i =0; i<unsplashArr.length;i++){
                    display += '<article>';
                    display += '<a href="'+ unsplashArr[i].links.html +'" target="_blank">';
                    display += '<img class="imgResult" src="'+ unsplashArr[i].urls.regular +'" alt="Unsplash Image">';
                    display += '<div class="picInfo">';
                    display += '<h3><i class="fa fa-user" aria-hidden="true"></i> '+ unsplashArr[i].user.name +'</h3>';
                    display += '<h3><i class="fa fa-heart" aria-hidden="true"></i> '+ unsplashArr[i].likes +'</h3>';
                    display += '<h3>TAGS/DESCRITPION: '+ unsplashArr[i].description +'</h3>';
                    display += '</div>';
                    display += '</a>';
                    display += '</article>';
                }
            }else{
                display += '<p>Opps looks like something went wrong!</p>'
            }

            image.insertAdjacentHTML('afterbegin', display);
        }
    }

    displayFlickr(arr){

        let flickrArr = arr;

        let image = document.querySelector('#flickrResults');

        let displayF = '';

        //makes sure the element is there before running any code
        if(document.getElementById('flickrResults')){

            image.innerHTML = '';

            for(let i=0;i<flickrArr.length;i++){
                //flickr API calls for you to do another API call to get details of the image from their server
                let request = new XMLHttpRequest();

                let flickrAPI = 'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=16ba76a5c786f17852944ad94929385a&photo_id='+ flickrArr[i].id +'&format=json&nojsoncallback=1';

                request.onload = function() {
                    if (request.status >= 200 && request.status < 400) {
                        //this variable captures the API response and stores it
                        let data = JSON.parse(request.responseText);

                        //console.log(data);

                        //this saves it to localStorage so it can be used later to print to the DOM
                        localStorage.setItem('imageData', JSON.stringify(data.photo));

                        //console.log(JSON.parse(localStorage.imageData));

                    }else{
                        console.log('response error');
                    }

                    request.onerror = function(){
                        console.log('connection error');
                    }
                };

                request.open('GET', flickrAPI, true);
                request.send();

                let imageInfo = JSON.parse(localStorage.imageData);

                displayF += '<article>';
                displayF += '<a href="https://www.flickr.com/photos/'+ flickrArr[i].owner +'/'+ flickrArr[i].id +'" target="_blank">';
                displayF += '<img class="imgResult" src="https://farm'+ flickrArr[i].farm +'.staticflickr.com/'+ flickrArr[i].server +'/'+ flickrArr[i].id +'_'+ flickrArr[i].secret +'_c.jpg" alt="Flickr Image">';
                displayF += '<div class="picInfo">';
                displayF += '<h3><i class="fa fa-user" aria-hidden="true"></i> '+ imageInfo.owner.username +'</h3>';
                displayF += '<h3><i class="fa fa-heart" aria-hidden="true"></i> '+ imageInfo.isfavorite +'</h3>';
                displayF += '<h3>TAGS/DESCRITPION: '+ flickrArr[i].title +'</h3>';
                displayF += '</div>';
                displayF += '</a>';
                displayF += '</article>';
            }
        }else{
            displayF += '<p>Oops looks like something went wrong!</p>';
        }

        image.insertAdjacentHTML('afterbegin', displayF);
    }
}