import React, { Component, PropTypes } from 'react'

// components declaration
import DocumentMeta from 'react-document-meta'
import Header from '../../components/header'
import Footer from '../../components/footer'

export default class PageFrame extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node)
    ]),
    meta: PropTypes.object,
    small: PropTypes.bool,
    wide: PropTypes.bool
  }

  render () {
    const { children, meta, small, wide } = this.props

    const content = wide ? children : (
      <div className={'container container__rel'}>
        {children}
      </div>
    )

    return (
      <div className={'container-with-footer'}>
        <DocumentMeta {...meta} />
        <div className={'container-content'}>
          <Header small={small} />
          {content}
        </div>
        <div className={'footer'}>
          <Footer />
        </div>
      </div>
    )
  }
}
