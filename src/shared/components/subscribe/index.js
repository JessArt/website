import React, { Component } from 'react'

// components declaration
import Button from '../button'
import Input from '../input'

// utils declaration
import { autobind } from 'core-decorators'
import { post } from '../../utils/fetch'

// styles declaration

import styles from './style.sass'

export default class Subscribe extends Component {

  state = {
    email: '',
    emailError: '',
    pending: false,
    sent: false
  }

  @autobind
  onSubmit(e) {
    e.preventDefault()
    const { email } = this.state

    if (this.validate()) {
      this.setState({ pending: true }, () => {
        post('/v1/api/subscribe', { params: { email } }).then(() => {
          this.setState({ pending: false, sent: true })
        })
      })
    }

    return false
  }

  validate() {
    const { email } = this.state

    const emailError = /@/.test(email) ? '' : 'Incorrect email'

    this.setState({ emailError })

    return !emailError
  }

  @autobind
  onChange(e) {
    this.setState({ email: e.target.value })
  }

  render() {
    const { email, pending, emailError, sent } = this.state

    const content = sent ? (
      <div className={styles.sent}>
        {'Thank you very much! No spam, only my updates with love!'}
      </div>
    ) : (
      <form onSubmit={this.onSubmit} className={styles.form}>
        <div className={styles.row}>
          <Input
            error={emailError}
            onChange={this.onChange}
            placeholder={'Email'}
            value={email} />
        </div>
        <div className={styles.row}>
          <Button className={styles.button} type={'submit'} disabled={pending}>
            {pending ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </div>
      </form>
    )

    return (
      <div className={`${styles.container} ${this.props.className}`}>
        <h3 className={styles.title}>
          {'Subscribe and get all my new updates!'}
        </h3>
        {content}
      </div>
    )
  }
}
