import {Control, ControlGroup} from 'angular2/common';

export class UserValidators {

    static shouldMatchC(c: Control) {
        if (c.value != '12345')
            return { shouldMatch: true };
    }

    static shouldHaveValidEmail(c: Control) {

        var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                var valid = regEx.test(c.value);
                return valid ? null : { shouldHaveValidEmail: true };


        //if (!c.value.match("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"))
        //    return { shouldHaveValidEmail: true };
    }

    static shouldMatch(group: ControlGroup) {
        var newPassword = group.find('newPassword').value;
        var confirmPassword = group.find('confirmPassword').value;

        // If either of these fields is empty, the validation 
        // will be bypassed. We expect the required validator to be 
        // applied first. 
        if (newPassword == '' || confirmPassword == '')
            return null;

        if (newPassword != confirmPassword) {
            console.log(group);
            return { shouldMatch: true };
        }

        return null;
    }
}