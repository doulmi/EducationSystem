import React, {Component, Children, PropTypes} from 'react';

import { List } from 'material-ui/List'
import {fade} from 'material-ui/utils/colorManipulator';

const makeSelectable = (MyComponent) => {
  return class extends Component {
    static propTypes = {
      children: PropTypes.node,
      onChange: PropTypes.func,
      selectedItemStyle: PropTypes.object,
      value: PropTypes.any,
    };

    static contextTypes = {
      muiTheme: PropTypes.object.isRequired,
    };

    extendChild(child, styles, selectedItemStyle) {
      if (child && child.type && child.type.muiName === 'ListItem') {
        const selected = this.isChildSelected(child, this.props);
        let selectedChildrenStyles;
        if (selected) {
          selectedChildrenStyles = Object.assign({}, styles, selectedItemStyle);
        }

        const mergedChildrenStyles = Object.assign({}, child.props.style, selectedChildrenStyles);

        this.keyIndex += 1;

        return React.cloneElement(child, {
          onTouchTap: (event) => {
            this.handleItemTouchTap(event, child);
            if (child.props.onTouchTap) {
              child.props.onTouchTap(event);
            }
          },
          key: this.keyIndex,
          style: mergedChildrenStyles,
          active: selected ? true : false,  //add active props to ListItem
          nestedItems: child.props.nestedItems.map((child) => this.extendChild(child, styles, selectedItemStyle)),
          initiallyOpen: this.isInitiallyOpen(child),
        });
      } else {
        return child;
      }
    }

    isInitiallyOpen(child) {
      if (child.props.initiallyOpen) {
        return child.props.initiallyOpen;
      }
      return this.hasSelectedDescendant(false, child);
    }

    hasSelectedDescendant = (previousValue, child) => {
      if (React.isValidElement(child) && child.props.nestedItems && child.props.nestedItems.length > 0) {
        return child.props.nestedItems.reduce(this.hasSelectedDescendant, previousValue);
      }
      return previousValue || this.isChildSelected(child, this.props);
    };

    isChildSelected(child, props) {
      return props.value === child.props.value;
    }

    handleItemTouchTap = (event, item) => {
      const itemValue = item.props.value;

      if (itemValue !== this.props.value) {
        this.props.onChange(event, itemValue);
      }
    };

    render() {
      const {
        children,
        selectedItemStyle,
        ...other
      } = this.props;

      this.keyIndex = 0;
      const styles = {};

      if (!selectedItemStyle) {
        const textColor = this.context.muiTheme.baseTheme.palette.textColor;
        styles.backgroundColor = fade(textColor, 0.2);
      }

      return (
        <MyComponent {...other} {...this.state}>
          {Children.map(children, (child) => (
            this.extendChild(child, styles, selectedItemStyle))
          )}
        </MyComponent>
      );
    }
  };
};

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    constructor(props) {
      super(props);

      this.state = {
        selectedIndex: props.defaultValue
      }

      this.handleRequestChange = this.handleRequestChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        selectedIndex: nextProps.defaultValue
      })
    }

    handleRequestChange(event, index) {
      this.setState({
        selectedIndex: index,
      });
      this.props.handleSelect(event, index);
    }

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange} >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList)

export default SelectableList;