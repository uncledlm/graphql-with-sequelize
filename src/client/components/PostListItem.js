import React from 'react';
import Relay from 'react-relay';

import { Link } from 'react-router';

class PostListItem extends React.Component {
  render() {
    const {
      post: {
        id,
        title,
        tags,
        person: {
          id: personId,
          firstName,
          lastName,
        }
      }
    } = this.props;

    const tagNames = tags.edges.map(({node}) => node.name).sort();

    return (
      <div>
        <h2><Link to={`/posts/${id}`}>{title}</Link></h2>
        <p><strong>Written by</strong> <Link to={`/people/${personId}`}>{firstName} {lastName}</Link></p>
        <p><strong>Tags:</strong> {tagNames.join(', ')}</p>
      </div>
    );
  }
}

export default Relay.createContainer(PostListItem, {
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        id
        title
        tags {
          edges {
            node {
              name
            }
          }
        }
        person {
          id
          firstName
          lastName
        }
      }
    `,
  },
});