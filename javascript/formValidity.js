//this listens to make sure the page has loaded
window.addEventListener('load', function(){

    //this stores the input types that will be watched by the code
    const formSubmit = document.getElementById('contactSubmit');
    const formName = document.getElementById('name');
    const formEmail = document.getElementById('email');

    //this is a class to check the forms validity to make sure nothing is left empty
    class Validity{
        constructor(input, type){
            this.input = input;
            this.type = type;
            this.errors = [];
        }

        //this adds the error messages to the array to be displayed on the form for feedback
        addError(message){
            this.errors.push(message);
        }

        //this listens for the errors of blank fields on the form and if they don't enter a email and displays the correct error message
        getErrMessage(){
            const status = this.input.validity;

            if(status.typeMismatch){
                this.addError("Entry doesn't match the field type");
            }

            if(status.valueMissing){
                this.addError('Must not be left blank');
            }
        }

        getNameMessage(){
            const status = this.input.validity;

            if(status.valueMissing){
                this.addError('Must not be left blank');
            }

            return this.errors;
        }

        getEmailMessage(){
            const status = this.input.validity;

            if(status.valueMissing){
                this.addError('Must not be left blank');
            }

            if(status.typeMismatch){
                this.addError('Please enter a valid email address');
            }

            return this.errors;
        }
    }

    //set up a listener for when the submit button is clicked and run the code
    formSubmit.addEventListener('click', (e) => {
        e.preventDefault();

        let valName = new Validity(formName);
        let valEmail = new Validity(formEmail);

        let errName = valName.getNameMessage();
        let errEmail = valEmail.getEmailMessage();

        //check to see if there are error messages displayed and clear them
        if(document.querySelector('.error')){
            document.querySelector('.error').innerHTML = '';
        }

        //now check for errors and display the correct message
        if(errName.length > 0){
            errName.forEach((err) => {
               formName.insertAdjacentHTML('afterend', '<p class="error">'+ err +'</p>');
            });
        }else if(errEmail.length > 0){
            errEmail.forEach((err) => {
               formEmail.insertAdjacentHTML('afterend', '<p class="error">'+ err +'</p>');
            });
        }else{
            document.getElementById('alert').classList.toggle('show');
        }
    })

});