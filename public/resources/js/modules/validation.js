/**
 * Created by Himanshu wolf on 06/11/15.
 */

/**
 * Created with IntelliJ IDEA.
 * User: Himanshu Jain
 * Date: 2/13/15
 * Time: 3:05 AM
 * To change this template use File | Settings | File Templates.
 */

(function () {
  /*---------------------REAL TIME FORM VALIDATION---------------------*/

  /*
   * Conventions
   *
   * a) form must contain a class "js-validate-form" so as to get validated
   *
   * b) for fields to be validated inside this form should contain attribute "data-validate"
   * with params as which validations are to be done
   * eg. data-validate="empty,specialChar,email,phone,number"
   *
   * note : the order of these params will define the order of execution for validating the respective field.
   *
   * c) each field to be validated should contain attribute "data-fieldType" which defines the field
   * type for showing concerned error message.
   *
   * d) submit button inside the form should contain class "js-validate-submit" which will validate all the
   * fields (that are to be validated) inside the form before actually submitting the data.
   *
   *
   * */


  /*primary object defining all the elements within the plugin*/
  var validator = {

    ele: {
      "form": "form.js-validate-form",
      "validateAttr": "data-validate",
      "fieldType": "data-fieldType",
      "submitButton": ".js-validate-submit"
    },
    errCls : {
      border : 'err-border'
    },

    type: {
      "empty": "empty",
      "invalid": "invalid",
      "specialChar": "specialChar"
    },

    regex: {
      "email": TDG.regex.EMAIL,
      "phone": TDG.regex.PHONE,
      "number": TDG.regex.NUMBER,
      "specialChar": TDG.regex.SPECIAL_CHAR
    }
  };


  /*******Event bindings starts***************/
  $(validator.ele.form).on("blur", "[" + validator.ele.validateAttr + "]", function () {

    var $this = $(this);
    var validationParams = $this.attr(validator.ele.validateAttr).split(",");

    for (var i = 0; i < validationParams.length; i++) {
      if (!validate($this, validationParams[i])) {
        break;
      }
    }

  });

  $(validator.ele.form).on("focus", "[" + validator.ele.validateAttr + "]", function () {
    displayErrorMessage(false, $(this));
  });

  $(validator.ele.form).on("click", validator.ele.submitButton, function (event) {

    var dosubmit = true;
    var $this = $(this);
    var parentForm = $this.closest(validator.ele.form);
    parentForm.find("[" + validator.ele.validateAttr + "]").each(function () {

      var ele = $(this);
      var validationParams = ele.attr(validator.ele.validateAttr).split(",");

      for (var i = 0; i < validationParams.length; i++) {
        if (!validate(ele, validationParams[i])) {
          dosubmit = false;
          break;
        }
      }
    });

    if (!dosubmit) {
      event.preventDefault();
    }
  });

  /*******Event bindings ends***************/


  /*main validation function which will return true or false as result
   *
   * note : only basic entities for validation are mentioned, and can be extended according to requirement
   *       i.e. more cases can be added as pr requirement.
   *
   * */
  function validate(context, param) {

    var returnValue = true,
        isNull = $.trim(context.val()).length <= 0,
        eleValue = $.trim(context.val());


    switch (param) {
      case "empty":
        if (isNull) {
          returnValue = false;
          displayErrorMessage(true, context, validator.type.empty);
        } else {
          displayErrorMessage(false, context);
        }
        break;

      case "number":
        if (!isNull) {
          if (!validator.regex.number.test(eleValue)) {
            returnValue = false;
            displayErrorMessage(true, context);
          } else {
            displayErrorMessage(false, context);
          }
        }
        break;

      case "email":
        if (!isNull) {
          if (!validator.regex.email.test(eleValue)) {
            returnValue = false;
            displayErrorMessage(true, context);
          } else {
            displayErrorMessage(false, context);
          }
        }
        break;

      case "phone":
        if (!isNull) {
          if (!validator.regex.phone.test(eleValue)) {
            returnValue = false;
            displayErrorMessage(true, context);
          } else {
            displayErrorMessage(false, context);
          }
        }
        break;

      case "pincode":
        if (!isNull) {
          if (!validator.regex.pincode.test(eleValue)) {
            returnValue = false;
            displayErrorMessage(true, context);
          } else {
            displayErrorMessage(false, context);
          }
        }
        break;

      case "specialChar":
        if (!isNull) {
          if (validator.regex.specialChar.test(eleValue)) {
            returnValue = false;
            displayErrorMessage(true, context, validator.type.specialChar);
          } else {
            displayErrorMessage(false, context);
          }
        }
        break;
    }

    return returnValue;
  }


  function displayErrorMessage(showErr, context, validationType) {

    var fieldType = context.attr(validator.ele.fieldType),
        errMsg,
        msgKey,
        errTxtMsg,
        hideMessage = function (ele) {
          $(ele).removeClass(validator.errCls.border);
          //$(ele).next('.err-txt').remove();
          //$(ele).next('.icn-warning-small').remove();
        },
        showMessage = function (ele, msg) {
          if (!$(ele).hasClass(validator.errCls.border)) {
            $(ele).addClass(validator.errCls.border);
            //$(ele).after(msg);
          }
        }

    if (showErr) {

      //if (undefined === validationType) {
      //  validationType = validator.type.invalid;
      //}

      //msgKey = validationType + "_" + fieldType;
      //if (validationType === validator.type.specialChar) {
      //  errMsg = validator.errorMessage.specialChar;
      //} else {
      //  errMsg = validator.errorMessage[msgKey];
      //}

      //errTxtMsg = $("<p class='err-txt'>" + errMsg + "</p>");
      //hideMessage(context);
      showMessage(context);
    } else {
      hideMessage(context);
    }

  }


  /*---------------------REAL TIME FORM VALIDATION ENDS---------------------*/
}());

