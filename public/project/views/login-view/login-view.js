import View from '../view/view.js';
import FormBlock from '../../common.blocks/form/form.js';
import FormMessageBlock from '../../common.blocks/form/__message/form__message.js';
import UsersModel from '../../models/users-model.js';

export default class LoginView extends View {

  constructor() {
    super('loginViewTmplTemplate');
    this.attrs = {
      form: {
        fields: [
          {
            inputType: 'email',
            inputName: 'email',
            inputPlaceholder: 'Your email'
          },
          {
            inputType: 'password',
            inputName: 'password',
            inputPlaceholder: 'Your password'
          }
        ],
        submitText: 'Log in',
        additional_links: [
          {
            title: 'Sign up',
            href: '/signup'
          }
        ]
      }
    };

    this.eventBus.on('login-error', this.onerror.bind(this));
  }

  allowed() {
    return !UsersModel.isAuthorized();
  }

  async create() {
    super.create();

    this.formRoot = this.el.querySelector('.js-login-form');
    this.FormBlock = new FormBlock(this.formRoot, this.attrs.form, this.onSubmit.bind(this));
    this.FormBlock.init();

    this.profileFormMessageRoot = this.el.querySelector('.js-form-message');
    this.formMessageBlock = new FormMessageBlock(this.profileFormMessageRoot);
    this.formMessageBlock.init();

    this.eventBus.on('login-error', this.onerror.bind(this));

    return this;
  }

  onerror(err) {
    if (this.active) {
      this.formMessageBlock.setTextContent(err);
      this.formMessageBlock.show();
    }
  }

  onSubmit(formdata) {
    this.eventBus.emit('login', formdata);
  }

}