import React, { Component, PropTypes } from 'react'

// components declaration
import Header from '../../components/header'
import Footer from '../../components/footer'

export default class PageFrame extends Component {
  render () {
    const { children } = this.props

    return (
      <div className={'container-with-footer'}>
        <div className={'container-content'}>
          <Header />
          <div className={'container'}>
            {children}
          </div>
        </div>
        <div className={'footer'}>
          <Footer />
        </div>
      </div>
    )
  }
}

PageFrame.propTypes = {
  children: PropTypes.element
}
