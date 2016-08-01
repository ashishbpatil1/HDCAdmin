$('#contact-form').bootstrapValidator({
    //        live: 'disabled',
    message: 'This value is not valid',
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        FirstName: {
            validators: {
                notEmpty: {
                    message: 'The First Name is required and cannot be empty'
                }
            }
        },
        LastName: {
            validators: {
                notEmpty: {
                    message: 'The Last Name is required and cannot be empty'
                }
            }
        },
        PhoneNumber: {
            validators: {
                notEmpty: {
                    message: 'The Phone Number is required'
                }
            }
        },
        Message: {
            validators: {
                notEmpty: {
                    message: 'The Message is required and cannot be empty'
                }
            }
        }
    }
});