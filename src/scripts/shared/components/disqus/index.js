import React, { PropTypes, Component } from 'react';

let id = null;

export default class DisqusComments extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    if (id) {
      this.setNewComment(id);
    } else {
      id = props.id;
    }
  }

  shouldComponentUpdate(props) {
    if (props.id !== id) this.setNewComment(props.id);

    return false;
  }

  setNewComment(id) {
    if (typeof window === 'object' && window.DISQUS) {
      id = props.id;
      window.DISQUS.reset({
        reload: true,
        config: function () {
          this.page.identifier = id;
          this.page.url = `http://jess.gallery/${props.id}`;
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
