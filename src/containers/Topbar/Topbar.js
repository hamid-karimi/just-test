import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import appActions from "layouts/actions";
import TopbarNotification from "./topbarNotification";
import TopbarMessage from "./topbarMessage";
import TopbarSearch from "./topbarSearch";
import TopbarUser from "./topbarUser";
import TopbarWrapper from "./topbar.style";
import {bindActionCreators} from 'redux';
import {toJS} from 'utils/higherOrderComponents/toJsHoc';

const { Header } = Layout;
const { toggleCollapsed } = appActions;

class Topbar extends Component {
  render() {
    const { toggleCollapsed, url, customizedTheme, locale } = this.props;
    const collapsed = this.props.collapsed && !this.props.openDrawer;
    const styling = {
      background: customizedTheme.backgroundColor,
      position: "fixed",
      width: "100%",
      height: 70
    };
    return (
      <TopbarWrapper>
        <Header
          style={styling}
          className={
            collapsed ? "ovmorphicTopbar collapsed" : "ovmorphicTopbar"
          }
        >
          <div className="ovLeft">
            <button
              className={
                collapsed ? "triggerBtn menuCollapsed" : "triggerBtn menuOpen"
              }
              style={{ color: customizedTheme.textColor }}
              onClick={toggleCollapsed}
            />
          </div>

          <ul className="ovRight">
            <li className="ovSearch">
              <TopbarSearch locale={locale} />
            </li>

            <li
              onClick={() => this.setState({ selectedItem: "notification" })}
              className="ovNotify"
            >
              <TopbarNotification locale={locale} />
            </li>

            <li
              onClick={() => this.setState({ selectedItem: "message" })}
              className="ovMsg"
            >
              <TopbarMessage locale={locale} />
            </li>
            <li
              onClick={() => this.setState({ selectedItem: "user" })}
              className="ovUser"
            >
              <TopbarUser locale={locale} />
            </li>
          </ul>
        </Header>
      </TopbarWrapper>
    );
  }
}
const mapStateToProps = state => ({
    locale: state.getIn(["LanguageSwitcher","language","locale"]),
    customizedTheme: state.getIn(["ThemeSwitcher","topbarTheme"]),
    App: state.getIn(["App"])
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            toggleCollapsed
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Topbar));
