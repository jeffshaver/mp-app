import ImmutablePropTypes from 'react-immutable-proptypes'
import {List} from 'immutable'
import MaterialSelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import React, {PropTypes} from 'react'

const SelectField = ({
  data,
  keyKey,
  label,
  style,
  textKey,
  underlineStyle,
  value,
  valueKey,
  onItemTouchTap
}) => {
  if (typeof keyKey === 'string') {
    keyKey = [keyKey]
  }
  if (typeof textKey === 'string') {
    textKey = [textKey]
  }
  if (typeof valueKey === 'string') {
    valueKey = [valueKey]
  }

  return (
    <MaterialSelectField
      floatingLabelText={label}
      style={style}
      underlineStyle={underlineStyle}
      value={value}
    >
      {
        data.map((data) => {
          return (
            <MenuItem
              key={data.getIn(keyKey)}
              primaryText={data.getIn(textKey)}
              value={data.getIn(valueKey)}
              onTouchTap={() => onItemTouchTap(data)}
            />
          )
        })
      }
    </MaterialSelectField>
  )
}

SelectField.propTypes = {
  data: ImmutablePropTypes.list,
  keyKey: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string
  ]),
  label: PropTypes.string,
  style: PropTypes.object,
  textKey: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string
  ]),
  underlineStyle: PropTypes.object,
  value: PropTypes.string,
  valueKey: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string
  ]),
  onItemTouchTap: PropTypes.func
}

SelectField.defaultProps = {
  data: List(),
  keyKey: ['id'],
  valueKey: ['id'],
  onItemTouchTap: () => {}
}

export default SelectField