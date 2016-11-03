import React, { PropTypes, Component } from 'react';

export default class DisqusComments extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  };

  shouldComponentUpdate(props) {
    return props.id !== this.props.id;
  }

  render() {
    const { id } = this.props;
    const html = `
    <div id="disqus_thread"></div>
    <script>

    /**
    *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
    *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
    var disqus_config = function () {
      this.page.url = 'http://jess.gallery';  // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = '${id}'; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
    (function() { // DON'T EDIT BELOW THIS LINE
      var d = document, s = d.createElement('script');
      s.src = '//jesszaikova.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    })();
    </script>
    <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
    `;

    return (
      <div dangerouslySetInnerHTML={{ __html: html }} />
    );
  }
}
