define('SignupView', function (require) {
  const View = require('View');
  const FormBlock = require('FormBlock');
  const FormMessageBlock = require('FormMessageBlock');
  const UsersModel = require('UsersModel');

  return class SignupView extends View {
    constructor() {
      super('signupViewTmplTemplate');
      this.attrs = {
        form: {
          fields: [
            {
              inputType: 'text',
              inputName: 'username',
              inputPlaceholder: 'Your username'
            },
            {
              inputType: 'email',
              inputName: 'email',
              inputPlaceholder: 'Your email'
            },
            {
              inputType: 'password',
              inputName: 'password',
              inputPlaceholder: 'Your password'
            },
            {
              inputType: 'password',
              inputName: 'password_repeat',
              inputPlaceholder: 'Repeat your password'
            },
            {
              inputType: 'file',
              inputName: 'avatar',
              inputPlaceholder: 'Path to your avatar'
            }
          ],
          submitText: 'Sign up',
          additional_links: [
            {
              title: 'I already have an account',
              href: '/login'
            }
          ]
        }
      };
    }

    allowed() {
      return !UsersModel.isAuthorized();
    }

    create() {
      super.create();

      this.formRoot = this.el.querySelector('.js-signup-form');
      this.formBlock = new FormBlock(this.formRoot, this.attrs.form, this.onSubmit.bind(this));
      this.formBlock.init();

      this.profileFormMessageRoot = this.el.querySelector('.js-form-message');
      this.formMessageBlock = new FormMessageBlock(this.profileFormMessageRoot);
      this.formMessageBlock.init();

      this.bus.on('signup-error', this.onerror.bind(this));

      return this;
    }

    onerror(err) {
      if (this.active) {
        this.formMessageBlock.setTextContent(err);
        this.formMessageBlock.show();
      }
    }

    onSubmit(formdata) {
      this.bus.emit('signup', formdata);
    }
  };
});
