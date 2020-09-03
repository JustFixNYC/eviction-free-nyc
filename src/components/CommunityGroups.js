import React from "react";
import { injectIntl, FormattedMessage as Trans } from "react-intl";
import { createFormattedTel } from "../utils/text";

import ContentfulClient from "./ContentfulClient";

import "../styles/CommunityGroups.scss";

class CommunityGroups extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userZip: "",
      contentfulResponse: false,
      groups: [],
    };
  }

  fetchGroupsContent = (zip) => {
    ContentfulClient.fetchCommunityGroups(zip, this.props.intl.locale)
      .then((response) => {
        const groups = response.items.map((r, _) => r.fields);
        this.setState({
          contentfulResponse: true,
          groups: groups,
        });
      })
      .catch(console.error);
  };

  handleOnChange = (event) => {
    this.setState({ userZip: event.target.value });
  };

  handleOnSubmit = () => {
    if (this.state.userZip) {
      this.fetchGroupsContent(this.state.userZip);
    }
  };

  componentDidMount() {
    if (this.props.zip && this.props.zip.length) {
      this.fetchGroupsContent(this.props.zip);
    }
  }

  render() {
    return (
      <div className="CommunityGroups">
        {this.state.groups.length ? (
          <div>
            {this.state.groups.map((group, idx) => (
              <div className="tile" key={idx}>
                <div className="tile-icon">
                  {group.logo && <img src={group.logo.fields.file.url} />}
                </div>
                <div className="tile-content">
                  <p className="tile-title">{group.title}</p>
                  {group.address && (
                    <p className="tile-subtitle text-gray">
                      <i className="icon icon-location mr-2"></i>
                      <a
                        href={`https://maps.google.com/maps/place/${group.address}`}
                        target="_blank"
                      >
                        {group.address}
                      </a>
                    </p>
                  )}
                  {group.intakeInstructions && (
                    <p className="title-subtitle text-gray">
                      <i className="icon icon-time mr-2"></i>
                      {group.intakeInstructions}
                    </p>
                  )}
                  <p className="tile-subtitle text-gray">{group.description}</p>
                  <p>
                    <a
                      href={`tel:${group.phoneNumber}`}
                      className="btn btn-success"
                    >
                      {createFormattedTel(group.phoneNumber)}
                    </a>
                    {group.website && (
                      <a
                        href={group.website}
                        target="_blank"
                        className="btn btn-default btn--website"
                      >
                        <i className="icon icon-share mr-2"></i>
                        <Trans id="website" />
                      </a>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : this.state.contentfulResponse ? (
          <div className="empty">
            <p className="empty-title h5">
              <Trans id="groupsEmpty" />
            </p>
          </div>
        ) : (
          <div className="empty">
            <p className="empty-title h5">
              <Trans id="groupsSearch" />
            </p>
            <div className="empty-action">
              <div className="input-group">
                <input
                  className="form-control"
                  value={this.state.userZip}
                  onChange={this.handleOnChange}
                  placeholder={this.props.intl.formatMessage({
                    id: "zipTitle",
                  })}
                />
                <button
                  className="btn btn-steps input-group-btn"
                  onClick={this.handleOnSubmit}
                >
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
export default injectIntl(CommunityGroups);
