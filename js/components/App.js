import React from 'react';
import Relay from 'react-relay';

const App = (props) => (
  <div>
    <h1>Widget list</h1>
    <ul>
      {props.viewer.widgets.edges.map(edge =>
        <li key={edge.node.id}>{edge.node.name} (ID: {edge.node.id})</li>
      )}
    </ul>
  </div>
);

App.propTypes = { viewer: React.PropTypes.object };

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        widgets(first: 10) {
          edges {
            node {
              id,
              name,
            },
          },
        },
      }
    `,
  },
});
