import React, { Component, PropTypes } from 'react';

// components declaration
import Button from '../button';

// style declaration
import './style.css';
import styles from './style.css.json';

// utils declaration
import { post } from '../../utils/fetch';

export default class FeedbackForm extends Component {
  static propTypes = {
    focus: PropTypes.bool
  };

  state = {
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    message: '',
    messageError: '',
    isSending: false,
    isSent: false
  }

  componentDidMount() {
    const { focus } = this.props;

    if (focus && this._input) {
      this._input.focus();
    }
  }

  verify() {
    const { name, email, message } = this.state;

    const nameError = name.length > 2 ? '' : 'Please enter at least 2 characters';
    const emailError = '';
    const messageError = message.length > 5 ? '' : 'Please enter at least 5 characters';

    const newState = { nameError, emailError, messageError };
    const result = !(nameError || emailError || messageError);

    return new Promise(res => this.setState(newState, () => res(result)));
  }

  onSubmit(e) {
    e.preventDefault();
    const { name, email, message } = this.state;

    this.verify().then(res => {
      if (res) {
        const feedback = { name, email, message };
        this.setState({ isSending: true }, () => {
          post('http://cms.jess.gallery/v1/api/feedback', { params: feedback })
            .then(() => this.setState({ isSent: true }));
        })

      }
    });
  }

  handleValue(key, e) {
    this.setState({ [key]: e.target.value, [`${key}Error`]: '' });
  }

  render() {
    const { isSending, isSent, name, nameError, email, emailError, message, messageError } = this.state;

    if (!isSent) {
      return (
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className={styles.inputContainer}>
            <input
              ref={node => this._input = node}
              placeholder={'Name'}
              className={`${styles.input} ${nameError ? styles.error : ''}`}
              type="text"
              value={name}
              onChange={this.handleValue.bind(this, 'name')} />
          </div>
          <div className={styles.inputContainer}>
            <input
              placeholder={'Email (optional)'}
              className={`${styles.input} ${emailError ? styles.error : ''}`}
              type="email"
              value={email}
              onChange={this.handleValue.bind(this, 'email')} />
          </div>
          <div className={styles.inputContainer}>
            <textarea
              placeholder={'Your message'}
              className={`${styles.input} ${styles.textarea} ${messageError ? styles.error : ''}`}
              value={message}
              rows={5} onChange={this.handleValue.bind(this, 'message')} />
          </div>
          <Button disabled={isSending} type={'submit'}>
            {isSending ? 'Sending...' : 'Send'}
          </Button>
        </form>
      );
    }

    return (
      <div className={styles.sent}>
        {'Thank you for your response! I appreciate it very much – and will write back as soon as possible!'}
      </div>
    );
  }
}
