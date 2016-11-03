import React, { PropTypes, Component } from 'react';

let id = null;

export default class DisqusComments extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    if (id) {
      this.setNewComment(props);
    } else {
      id = props.id;
    }
  }

  shouldComponentUpdate(props) {
    if (props.id !== id) this.setNewComment(props);

    return false;
  }

  setNewComment({ id: newId, url, title }) {
    if (typeof window === 'object' && window.DISQUS) {
      id = newId;
      window.DISQUS.reset({
        reload: true,
        config: function () {
          this.page.identifier = id;
          this.page.url = url;
          this.page.title = title;
        }
      });
    }
  }

  render() {
    const { id } = this.props;

    return (
      <div id={'disqus_thread'} />
    );
  }
}
