//impliment the singleton pattern to ensure there is only one instance of the application running
window.addEventListener('load', function(){

    //this checks to see if there is an instance of the application if not it creates it
    let myApp = App.getInstance();
});

//create the singleton to do the check to make sure only one version of the application is running
class App {
    constructor(){
        let controller = new Controller();
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

        //create an instance of the model object
        this.model = new Model();

        //create an instance of the view object
        this.view = new View();
    }
}

//create the model class that is used to gather data and process it
class Model{
    constructor(){

    }
}

//create the view class that is responsible for showing the data on the screen
class View{
    constructor(){

    }
}