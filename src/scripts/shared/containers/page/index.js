import React, { Component, PropTypes } from 'react'

// components declaration
import DocumentMeta from 'react-document-meta'
import Header from '../../components/header'
import Footer from '../../components/footer'

export default class PageFrame extends Component {
  render () {
    const { children, meta } = this.props

    return (
      <div className={'container-with-footer'}>
        <DocumentMeta {...meta} />
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
  children: PropTypes.oneOf([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  meta: PropTypes.object
}
