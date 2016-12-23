import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'

import { IconButton, Drawer, Avatar } from 'material-ui'
import { red500, green500, deepOrange500, amber500, blue500, indigo500, lime500 } from 'material-ui/styles/colors'
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import FileCloud from 'material-ui/svg-icons/file/cloud';
import SocialWhatshot from 'material-ui/svg-icons/social/whatshot';
import ActionHistory from 'material-ui/svg-icons/action/history';
import ContentArchive from 'material-ui/svg-icons/content/archive';
import ActionTranslate from 'material-ui/svg-icons/action/translate';

import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

import SelectableList from './SelectableList'
import ActivableListItem from './ActivableListItem'
import N18 from '../constants/strings'
import brandIcon from '../resources/images/icon.png'

const getStyles = (theme) => {
  const navHeight = theme.appBar.height + 2;
  const styles = {
    navigator: {
      height: navHeight,
      borderTop: '2px solid ' + theme.palette.accent1Color,
      backgroundColor: theme.palette.primary1Color,
      boxShadow: 'rgb(0, 0, 0) 0px 1px 6px, rgb(0, 0, 0) 0px 1px 4px'
    },

    rightBorder: {
      height: `calc(100% - ${navHeight}px)`,
      borderRight: '1px solid black'
    },

    drawer: {
      backgroundColor: '#222326',
      boxShadow: 'none'
    },

    infos: {
      height: 100,

      avatar: {
        margin: "15px 10px"
      },

      right: {
        position: 'absolute',
        marginTop: 15
      },

      name: {
        fontSize: 16,
        color: theme.palette.secondaryTextColor,
      },

      logout: {
        fontSize: 12,
        color: theme.palette.textColor
      }
    },

    item: {
      fontSize: 14,

      icon: {
        width: 20,
      },

      text: {
        marginLeft: -20,
        position: 'relative'
      }
    },

    brand: {
      marginTop: -15,
      marginLeft: 10
    }
  }
  return styles;
}


class Sidebar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    docked: PropTypes.bool.isRequired
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };

  handleSelect = (event, index) => {
    this.context.router.push(index);
  }

  back = () => {
    browserHistory.goBack();
  }

  forward = () => {
    browserHistory.goForward();
  }

  logout = () => {
    console.log('logout');
  }

  render() {
    const muiTheme = this.context.muiTheme;
    const styles = getStyles(muiTheme);
    const defaultValue = this.context.router.location.pathname;

    return (
      <Drawer
        containerStyle={styles.drawer}
        open={this.props.open}
        docked={this.props.docked}
        >

        <div style={styles.navigator}>
          {/* <img style={styles.brand} src={brandIcon} alt="Icon"/> */}
          <IconButton onTouchTap={this.back}>
            <NavigationChevronLeft color={muiTheme.svgIcon.color} hoverColor={muiTheme.svgIcon.hoverColor} />
          </IconButton>
          <IconButton onTouchTap={this.forward}>
            <NavigationChevronRight color={muiTheme.svgIcon.color} hoverColor={muiTheme.svgIcon.hoverColor} />
          </IconButton>
        </div>
        <div style={styles.rightBorder}>
          <div style={styles.infos}>
            <Link to='/dashbord'><Avatar src="http://lorempixel.com/50/50" style={styles.infos.avatar} /></Link>
            <span style={styles.infos.right}>
              <Link to='/dashbord'><span style={styles.infos.name}>doulmi</span></Link><br />
              <a style={styles.infos.logout} href="#" onClick={this.logout}>{N18.logout}</a>
            </span>
          </div>

          <SelectableList
            defaultValue={defaultValue}
            handleSelect={this.handleSelect}
            >

            <ActivableListItem style={styles.item} leftIcon={<SocialWhatshot hoverColor={deepOrange500} />}
              value='/populars'>
              <span >{N18.populars}</span>
            </ActivableListItem>

            <ActivableListItem style={styles.item} leftIcon={<FileCloud hoverColor={blue500} />} value='/recents'>
              <span>{N18.recents}</span>
            </ActivableListItem>

            <ActivableListItem style={styles.item} leftIcon={<ActionFavorite hoverColor={red500} />} value='/favorites'>
              <span>{N18.videoFavorited}</span>
            </ActivableListItem>

            <ActivableListItem style={styles.item} leftIcon={<ActionGrade hoverColor={amber500} />} value='/collects'>
              <span>{N18.videoCollected}</span>
            </ActivableListItem>

            <ActivableListItem style={styles.item} leftIcon={<ContentArchive hoverColor={green500} />} value='/notes'>
              <span>{N18.notes}</span>
            </ActivableListItem>

            <ActivableListItem style={styles.item} leftIcon={<ActionTranslate hoverColor={lime500} />} value='/words'>
              <span>{N18.words}</span>
            </ActivableListItem>

            <ActivableListItem style={styles.item} leftIcon={<ActionHistory />} value='/history'>
              <span>{N18.history}</span>
            </ActivableListItem>
          </SelectableList>
        </div>
      </Drawer>
    )
  }
}

export default Sidebar;