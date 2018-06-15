import React from 'react';
import { FormattedMessage as Trans } from 'react-intl';
import { createFormattedTel } from '../utils/text';

import ContentfulClient from "./ContentfulClient";

import '../styles/CommunityGroups.scss';

export default class CommunityGroups extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contentfulResponse: false,
      groups: []
    }
  }

  fetchGroupsContent = (zip) => {
    ContentfulClient.fetchCommunityGroups(zip, this.props.intl.locale)
      .then(response => {
        const groups = response.items.map((r,_) => r.fields);
        this.setState({
          contentfulResponse: true,
          groups: groups
        });
      })
      .catch(console.error);
  }

  componentDidMount() {

    if(this.props.zip && this.props.zip.length) {
      this.fetchGroupsContent(this.props.zip);
    }

  }



  render() {

    return (
      <div className="CommunityGroups">
        {this.state.groups.length ? (
          this.state.groups.map((group, idx) =>
            <div className="tile" key={idx}>
              <div className="tile-icon">
                {group.logo && (
                  <img src={group.logo.fields.file.url} />
                )}
              </div>
              <div className="tile-content">
                <p className="tile-title">{group.title}</p>
                <p className="tile-subtitle text-gray">{group.description}</p>
                <p>
                  <a href={`tel:${group.phoneNumber}`}
                    className="btn btn-success">
                     {createFormattedTel(group.phoneNumber)}
                  </a>
                  <a href={group.website}
                    className="btn btn-default">
                     <Trans id="website" />
                  </a>
                </p>
              </div>
            </div>
          )
        ) : this.state.contentfulResponse ? (
          <div className="empty">
            <p className="empty-title h5"><Trans id="groupsEmpty" /></p>
            <p className="empty-subtitle"><Trans id="groupsEmptySubtitle" /></p>
            <div className="empty-action">
              <a className="btn btn-steps" href="http://findhelp.justfix.nyc/" target="_blank"><Trans id="website" /></a>
            </div>
          </div>
        ) : (
          <div className="empty">
            <p className="empty-title h5"><Trans id="groupsSearch" /></p>
            <div className="empty-action">
                <div className="input-group">
                  <input className="form-control" placeholder={this.props.intl.formatMessage({ id: "zipTitle" })} />
                  <button className="btn btn-steps input-group-btn">
                    <Trans id="submit" />
                  </button>
                </div>
            </div>
          </div>
        )}

      </div>

    );
  }
}
