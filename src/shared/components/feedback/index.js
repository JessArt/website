import React, { Component } from 'react'
import PropTypes from 'prop-types'

// components declaration
import Button from '../button'
import Input from '../input'

// style declaration
import styles from './style.sass'

// utils declaration
import { autobind } from 'core-decorators'
import { post } from '../../utils/fetch'

export default class FeedbackForm extends Component {
  static propTypes = {
    focus: PropTypes.bool
  }

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
    const { focus } = this.props

    if (focus && this._input) {
      this._input.focus()
    }
  }

  verify() {
    const { name, message } = this.state

    const MIN_NAME_LENGTH = 2
    const MIN_MESSAGE_LENGTH = 5
    const nameError = name.length > MIN_NAME_LENGTH ? '' : 'Please enter at least 2 characters'
    const emailError = ''
    const messageError = message.length > MIN_MESSAGE_LENGTH ? '' : 'Please enter at least 5 characters'

    const newState = { nameError, emailError, messageError }
    const result = !(nameError || emailError || messageError)

    return new Promise(res => this.setState(newState, () => res(result)))
  }

  @autobind
  onSubmit(e) {
    e.preventDefault()
    const { name, email, message } = this.state

    this.verify().then(res => {
      if (res) {
        const feedback = { name, email, message }
        this.setState({ isSending: true }, () => {
          post('/v1/api/feedback', { params: feedback })
            .then(() => this.setState({ isSent: true }))
        })

      }
    })
  }

  @autobind
  refInput(node) {
    this._input = node
  }

  handleValue(key, e) {
    this.setState({ [key]: e.target.value, [`${key}Error`]: '' })
  }

  render() {
    const {
      isSending,
      isSent,
      name,
      nameError,
      email,
      emailError,
      message,
      messageError
    } = this.state

    if (!isSent) {
      return (
        <form onSubmit={this.onSubmit}>
          <div className={styles.inputContainer}>
            <Input
              ref={this.refInput}
              placeholder={'Name'}
              error={nameError}
              dark
              type="text"
              value={name}
              onChange={this.handleValue.bind(this, 'name')} />
          </div>
          <div className={styles.inputContainer}>
            <Input
              placeholder={'Email (optional)'}
              error={emailError}
              type="email"
              dark
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
      )
    }

    return (
      <div className={styles.sent}>
        {'Thank you for your response! I appreciate it very much – and will write back as soon as possible!'}
      </div>
    )
  }
}
